// src/modules/home/home.interface.ts


// ========================= 1. create home data =============================
export interface ImageDTO {
  public_id?: string;
  url?: string;
}

export interface PricingDTO {
  title: string;
  price?: string;
  description?: string;
  features: string[];
}

export interface CreateHomeDTO {
  headerSliderTexts: string[];

  pricingSection: {
    basic: PricingDTO;
    standard: PricingDTO;
    premium: PricingDTO;
  };
}

export interface UploadedFiles {
  heroImages?: Express.Multer.File[];
  basicImage?: Express.Multer.File[];
  standardImage?: Express.Multer.File[];
  premiumImage?: Express.Multer.File[];
}

