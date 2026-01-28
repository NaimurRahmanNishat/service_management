// src/types/homeType.ts

/* ---------- Image Interface ---------- */
export interface IImage {
  public_id: string;
  url: string;
}

/* ---------- Pricing Interface ---------- */
export interface IPricing {
  title: string;
  price?: string;
  description?: string;
  features: string[];
  images: IImage[];
}

/* ---------- Home Interface (Database model data) ---------- */
export interface IHome {
  _id: string;
  headerSliderTexts: string[];
  
  heroSection: {
    images: IImage[];
  };
  
  pricingSection: {
    basic: IPricing;
    standard: IPricing;
    premium: IPricing;
  };
  
  createdAt?: string;
  updatedAt?: string;
}



// ========================= 1. create home data =============================
export interface IHomeResponse {
  success: boolean;
  message: string;
  data: IHome;
}

export interface ICreateHomeInput {
  headerSliderTexts: string[];
  
  pricingSection: {
    basic: {
      title: string;
      price?: string;
      description?: string;
      features: string[];
    };
    standard: {
      title: string;
      price?: string;
      description?: string;
      features: string[];
    };
    premium: {
      title: string;
      price?: string;
      description?: string;
      features: string[];
    };
  };
}


// ========================= 2. Get all home data =============================
export interface IGetAllHomeData {
  data: IHome[];
  meta: {
    limit: number;
    hasMore: boolean;
    nextCursor: Date | string | null;
    sortBy: string;
    sortOrder: "asc" | "desc";
    totalFetched?: number;
  };
}

export interface IGetAllHomeResponse {
  success: boolean;
  message: string;
  data: IGetAllHomeData;
}

export interface IGetAllHomeParams {
  limit?: number;
  cursor?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  search?: string;
  searchFields?: string[];
}


// ========================= 3. update home data =============================
export interface IUpdateHomeResponse {
  success: boolean;
  message: string;
  data: IHome;
}



// ========================= 4. delete home data =============================
export interface IDeleteHomeResponse {
  success: boolean;
  message: string;
}


