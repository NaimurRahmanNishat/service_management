// src/modules/home/home.service.ts

import { Request } from "express";
import Home from "./home.model";
import { CreateHomeDTO, UploadedFiles } from "./home.interface";
import { deleteFromCloudinary, deleteImagesFromCloudinary, uploadToCloudinary } from "../../helper/uploadToCloudinary";
import { calculateCursorPagination, createCursorPaginationMeta } from "../../helper/cursorPagination";
import { getCache, invalidateAllCache, invalidateCache, setCache } from "../../utils/cache";



// ========================= 1. create home data =============================
export const createHomeData = async ( data: CreateHomeDTO, files: UploadedFiles ) => {
  try {
    if (!data?.headerSliderTexts?.length) {
      return { success: false, message: "Header slider texts are required" };
    }

    /* ---------- Hero Images Upload ---------- */
    const heroImages = [];
    if (files.heroImages) {
      for (const file of files.heroImages) {
        const uploaded = await uploadToCloudinary(file.buffer, "home/hero");
        heroImages.push({
          public_id: uploaded.public_id,
          url: uploaded.secure_url,
        });
      }
    }

    /* ---------- Pricing Images Upload (Multiple) ---------- */
    const uploadMultipleImages = async (
      fileArray: Express.Multer.File[] | undefined,
      folder: string
    ) => {
      if (!fileArray || fileArray.length === 0) return [];

      const uploadedImages = [];
      for (const file of fileArray) {
        const uploaded = await uploadToCloudinary(file.buffer, folder);
        uploadedImages.push({
          public_id: uploaded.public_id,
          url: uploaded.secure_url,
        });
      }
      return uploadedImages;
    };

    const basicImages = await uploadMultipleImages(
      files.basicImage,
      "home/basic"
    );
    const standardImages = await uploadMultipleImages(
      files.standardImage,
      "home/standard"
    );
    const premiumImages = await uploadMultipleImages(
      files.premiumImage,
      "home/premium"
    );

    /* ---------- Create Home Document ---------- */
    const home = await Home.create({
      headerSliderTexts: data.headerSliderTexts,

      heroSection: {
        images: heroImages,
      },

      pricingSection: {
        basic: { ...data.pricingSection.basic, images: basicImages },
        standard: { ...data.pricingSection.standard, images: standardImages },
        premium: { ...data.pricingSection.premium, images: premiumImages },
      },
    });

    // Invalidate all list caches after creating new home
    await invalidateCache("homes:list:*");

    return {
      success: true,
      message: "Home page created successfully",
      data: home,
    };
  } catch (error) {
    return { success: false, message: "Failed to create home page" };
  }
};


// ========================= 2. Get All Homes =============================
export const getAllHomes = async (req: Request) => {
  try {
    const options = {
      limit: parseInt(req?.query.limit as string) || 10,
      cursor: req.query.cursor as string,
      sortBy: (req.query.sortBy as string) || "createdAt",
      sortOrder: (req.query.sortOrder as "asc" | "desc") || "desc",
      search: req.query.search as string,
      searchFields: req.query.searchFields
        ? (req.query.searchFields as string).split(",")
        : [
            "title",
            "price",
            "description",
            "features",
            "standard",
            "premium",
            "basic",
          ],
    };

    // Generate unique cache key based on all query parameters
    const cacheKey = `homes:list:${options.cursor || 'first'}:${options.limit}:${options.sortBy}:${options.sortOrder}:${options.search || 'all'}:${options.searchFields.join('-')}`;

    // Try to get from cache first
    await getCache(cacheKey);

    const { limit, sortBy, sortOrder, filter } = calculateCursorPagination(options);
    const posts = await Home.find(filter)
      .sort({ [sortBy]: sortOrder === "desc" ? -1 : 1 })
      .limit(limit + 1)
      .lean();

    const result = createCursorPaginationMeta( posts, limit, sortBy, sortOrder, options.search );

    // Cache the result for 10 minutes
    await setCache(cacheKey, result, 600);

    return result;
    
  } catch (error: any) {
        return {
      success: false,
      message: "Failed to retrieve homes",
      errors: [error.message],
    };
  }
};


// ========================= 3. Update Home (Main Logic) =============================
export const updateHomeData = async ( id: string, data: any, files: UploadedFiles ) => {
  try {
    const home = await Home.findById(id);
    if (!home) {
      return { success: false, message: "Home not found" };
    }

    const updatedFields: string[] = [];

    // Update Header Slider Texts 
    if (data.headerSliderTexts) {
      const texts = typeof data.headerSliderTexts === "string" ? JSON.parse(data.headerSliderTexts) : data.headerSliderTexts;
      home.headerSliderTexts = texts;
      updatedFields.push("Header Slider Texts");
    }

    // Update Hero Images (if provided)
    if (files.heroImages && files.heroImages.length > 0) {
      if (home.heroSection.images.length > 0) {
        for (const img of home.heroSection.images) {
          await deleteFromCloudinary(img.public_id);
        }
      }
      // Upload new hero images
      const newHeroImages = [];
      for (const file of files.heroImages) {
        const uploaded = await uploadToCloudinary(file.buffer, "home/hero");
        newHeroImages.push({
          public_id: uploaded.public_id,
          url: uploaded.secure_url,
        });
      }
      home.heroSection.images = newHeroImages;
      updatedFields.push("Hero Images");
    }

    // Update Basic Pricing (if provided)
    if ( data.basicTitle || data.basicPrice || data.basicDescription || data.basicFeatures ) {
      if (data.basicTitle) {
        home.pricingSection.basic.title = data.basicTitle;
      }
      if (data.basicPrice !== undefined) {
        home.pricingSection.basic.price = data.basicPrice;
      }
      if (data.basicDescription !== undefined) {
        home.pricingSection.basic.description = data.basicDescription;
      }
      if (data.basicFeatures) {
        const features =
          typeof data.basicFeatures === "string"
            ? JSON.parse(data.basicFeatures)
            : data.basicFeatures;
        home.pricingSection.basic.features = features;
      }
      updatedFields.push("Basic Pricing Data");
    }

    // Update Basic Images (if provided)
    if (files.basicImage && files.basicImage.length > 0) {
      // Delete old basic images
      if (home.pricingSection.basic.image.length > 0) {
        for (const img of home.pricingSection.basic.image) {
          await deleteFromCloudinary(img.public_id);
        }
      }

      // Upload new basic images
      const newBasicImages = [];
      for (const file of files.basicImage) {
        const uploaded = await uploadToCloudinary(file.buffer, "home/basic");
        newBasicImages.push({
          public_id: uploaded.public_id,
          url: uploaded.secure_url,
        });
      }
      home.pricingSection.basic.image = newBasicImages;
      updatedFields.push("Basic Pricing Images");
    }

    // Update Standard Pricing 
    if ( data.standardTitle || data.standardPrice || data.standardDescription || data.standardFeatures ) {
      if (data.standardTitle) {
        home.pricingSection.standard.title = data.standardTitle;
      }
      if (data.standardPrice !== undefined) {
        home.pricingSection.standard.price = data.standardPrice;
      }
      if (data.standardDescription !== undefined) {
        home.pricingSection.standard.description = data.standardDescription;
      }
      if (data.standardFeatures) {
        const features =
          typeof data.standardFeatures === "string"
            ? JSON.parse(data.standardFeatures)
            : data.standardFeatures;
        home.pricingSection.standard.features = features;
      }
      updatedFields.push("Standard Pricing Data");
    }

    // Update Standard Images (if provided)
    if (files.standardImage && files.standardImage.length > 0) {
      // Delete old standard images
      if (home.pricingSection.standard.image.length > 0) {
        for (const img of home.pricingSection.standard.image) {
          await deleteFromCloudinary(img.public_id);
        }
      }

      // Upload new standard images
      const newStandardImages = [];
      for (const file of files.standardImage) {
        const uploaded = await uploadToCloudinary(file.buffer, "home/standard");
        newStandardImages.push({
          public_id: uploaded.public_id,
          url: uploaded.secure_url,
        });
      }
      home.pricingSection.standard.image = newStandardImages;
      updatedFields.push("Standard Pricing Images");
    }

    // Update Premium Pricing 
    if ( data.premiumTitle || data.premiumPrice || data.premiumDescription || data.premiumFeatures ) {
      if (data.premiumTitle) {
        home.pricingSection.premium.title = data.premiumTitle;
      }
      if (data.premiumPrice !== undefined) {
        home.pricingSection.premium.price = data.premiumPrice;
      }
      if (data.premiumDescription !== undefined) {
        home.pricingSection.premium.description = data.premiumDescription;
      }
      if (data.premiumFeatures) {
        const features =
          typeof data.premiumFeatures === "string"
            ? JSON.parse(data.premiumFeatures)
            : data.premiumFeatures;
        home.pricingSection.premium.features = features;
      }
      updatedFields.push("Premium Pricing Data");
    }

    // Update Premium Images (if provided)
    if (files.premiumImage && files.premiumImage.length > 0) {
      // Delete old premium images
      if (home.pricingSection.premium.image.length > 0) {
        for (const img of home.pricingSection.premium.image) {
          await deleteFromCloudinary(img.public_id);
        }
      }

      // Upload new premium images
      const newPremiumImages = [];
      for (const file of files.premiumImage) {
        const uploaded = await uploadToCloudinary(file.buffer, "home/premium");
        newPremiumImages.push({
          public_id: uploaded.public_id,
          url: uploaded.secure_url,
        });
      }
      home.pricingSection.premium.image = newPremiumImages;
      updatedFields.push("Premium Pricing Images");
    }

    // Save Updated Document
    if (updatedFields.length === 0) {
      return {
        success: false,
        message: "No fields provided to update",
      };
    }

    // Invalidate specific home cache
    await invalidateCache(`homes:single:${id}`);
      
    // Invalidate all list caches 
    await invalidateCache("homes:list:*");
    await home.save();

    return {
      success: true,
      message: `Successfully updated ${updatedFields.join(", ")}`,
      data: home,
    };
  } catch (error: any) {
    return {
      success: false,
      message: "Failed to update home",
      errors: [error.message],
    };
  }
};


// ========================= 4. Delete Home =============================
export const deleteHome = async (id: string) => {
  try {
    const home = await Home.findById(id).lean();

    if (!home) {
      return { 
        success: false, 
        message: "Home not found" 
      };
    }
    let totalImagesDeleted = 0;
    let totalImagesFailed = 0;
    const allErrors: string[] = [];

    // Delete Hero Section Images
    console.log("📍 Section 1: Hero Section Images");
    if (home.heroSection?.images && Array.isArray(home.heroSection.images)) {
      const result = await deleteImagesFromCloudinary(home.heroSection.images);
      totalImagesDeleted += result.success;
      totalImagesFailed += result.failed;
      allErrors.push(...result.errors);
    } else {
      console.log("   No hero images found");
    }

    // Delete Pricing Section - Basic Tier
    console.log("\n📍 Section 2: Basic Tier Images");
    if (home.pricingSection?.basic?.image && Array.isArray(home.pricingSection.basic.image)) {
      const result = await deleteImagesFromCloudinary(home.pricingSection.basic.image);
      totalImagesDeleted += result.success;
      totalImagesFailed += result.failed;
      allErrors.push(...result.errors);
    } else {
      console.log("   No basic tier images found");
    }

    // Delete Pricing Section - Standard Tier
    console.log("\n📍 Section 3: Standard Tier Images");
    if (home.pricingSection?.standard?.image && Array.isArray(home.pricingSection.standard.image)) {
      const result = await deleteImagesFromCloudinary(home.pricingSection.standard.image);
      totalImagesDeleted += result.success;
      totalImagesFailed += result.failed;
      allErrors.push(...result.errors);
    } else {
      console.log("   No standard tier images found");
    }

    // Delete Pricing Section - Premium Tier
    console.log("\n📍 Section 4: Premium Tier Images");
    if (home.pricingSection?.premium?.image && Array.isArray(home.pricingSection.premium.image)) {
      const result = await deleteImagesFromCloudinary(home.pricingSection.premium.image);
      totalImagesDeleted += result.success;
      totalImagesFailed += result.failed;
      allErrors.push(...result.errors);
    } else {
      console.log("   No premium tier images found");
    }

    // Print summary before database deletion
    if (allErrors.length > 0) {
      allErrors.forEach((err, idx) => {
        console.log(`   ${idx + 1}. ${err}`);
      });
    }

    // Delete home from database
    await Home.findByIdAndDelete(id);

    // Invalidate caches
    const cacheResult = await invalidateAllCache([
      "homes:list:*",     
      `homes:single:${id}` 
    ]);
    return {
      success: true,
      message: "Home deleted successfully",
      data: {
        statistics: {
          totalImagesDeleted,
          totalImagesFailed,
          cachesInvalidated: cacheResult,
        },
        errors: allErrors.length > 0 ? allErrors : undefined,
      },
    };
  } catch (error: any) {
    return {
      success: false,
      message: "Failed to delete home",
      errors: [error.message || "Unknown error occurred"],
    };
  }
};
