// src/modules/home/home.model.ts
import mongoose, { Document, Schema } from "mongoose";

/* ================= COMMON IMAGE SCHEMA ================= */
const imageSchema = new Schema(
  {
    public_id: { type: String, required: true },
    url: { type: String, required: true },
  },
  { _id: false }
);

/* ================= PRICING SCHEMA ================= */
const pricingSchema = new Schema(
  {
    title: { type: String, required: true }, // Basic / Standard / Premium
    price: { type: String },
    description: { type: String },
    features: [{ type: String }],
    images: [imageSchema],
  },
  { _id: false }
);

/* ================= HOME INTERFACE ================= */
export interface IHome extends Document {
  headerSliderTexts: string[];

  heroSection: {
    images: {
      public_id: string;
      url: string;
    }[];
  };

  pricingSection: {
    basic: {
      title: string;
      price?: string;
      description?: string;
      features: string[];
      image: {
        public_id: string;
        url: string;
      }[];
    };
    standard: {
      title: string;
      price?: string;
      description?: string;
      features: string[];
      image: {
        public_id: string;
        url: string;
      }[];
    };
    premium: {
      title: string;
      price?: string;
      description?: string;
      features: string[];
      image: {
        public_id: string;
        url: string;
      }[];
    };
  };

  createdAt?: Date;
  updatedAt?: Date;
}

/* ================= HOME SCHEMA ================= */
const homeSchema = new Schema<IHome>(
  {
    /* Header Slider */
    headerSliderTexts: {
      type: [String],
      default: [],
    },

    /* Hero Section */
    heroSection: {
      images: {
        type: [imageSchema],
        default: [],
      },
    },

    /* Pricing Section */
    pricingSection: {
      basic: pricingSchema,
      standard: pricingSchema,
      premium: pricingSchema,
    },
  },
  {
    timestamps: true,
  }
);

const Home = mongoose.model<IHome>("Home", homeSchema);
export default Home;
