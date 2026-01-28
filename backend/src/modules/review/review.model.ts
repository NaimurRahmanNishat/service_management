// src/modules/review/review.model.ts
import mongoose, { Document, Schema } from "mongoose";
import Service from "../service/service.model";
import Product from "../product/product.model";

export interface IReview extends Document {
  service: mongoose.Types.ObjectId;
  vendor: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;

  rating: number;
  comment?: string;

  createdAt?: Date;
  updatedAt?: Date;
}

const reviewSchema = new Schema<IReview>(
  {
    service: {
      type: Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    vendor: {
      type: Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    comment: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

reviewSchema.index({ service: 1, user: 1 }, { unique: true });
reviewSchema.index({ vendor: 1 });
reviewSchema.index({ rating: -1 });
reviewSchema.index({ createdAt: -1 });



/* ================ Recalculate product rating ================ */
async function updateProductRating(serviceId: mongoose.Types.ObjectId) {
  const service = await Service.findById(serviceId);
  if (!service) return;

  const product = await Product.findById(service.product);
  if (!product) return;

  const stats = await mongoose.model("Review").aggregate([
    {
      $lookup: {
        from: "services",
        localField: "service",
        foreignField: "_id",
        as: "serviceDoc",
      },
    },
    { $unwind: "$serviceDoc" },
    {
      $match: {
        "serviceDoc.product": product._id,
      },
    },
    {
      $group: {
        _id: null,
        avgRating: { $avg: "$rating" },
        count: { $sum: 1 },
      },
    },
  ]);

  if (stats.length) {
    product.rating = {
      average: Number(stats[0].avgRating.toFixed(1)),
      count: stats[0].count,
    };
  } else {
    product.rating = { average: 0, count: 0 };
  }

  await product.save();
}

reviewSchema.post("save", function () {
  updateProductRating(this.service);
});

reviewSchema.post("findOneAndUpdate", function (doc) {
  if (doc) updateProductRating(doc.service);
});

reviewSchema.post("findOneAndDelete", function (doc) {
  if (doc) updateProductRating(doc.service);
});

const Review = mongoose.model<IReview>("Review", reviewSchema);
export default Review;
