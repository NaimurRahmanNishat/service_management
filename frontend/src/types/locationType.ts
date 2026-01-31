// src/types/locationType.ts

export type Division =
  | "Dhaka"
  | "Chattogram"
  | "Rajshahi"
  | "Khulna"
  | "Barisal"
  | "Sylhet"
  | "Rangpur"
  | "Mymensingh";

export interface ILocation {
  _id: string;
  division: Division;
  district: string;
  area: string;
  subArea?: string;
  postalCode?: string;
  isActive: boolean;
  createdBy: string;
  createdAt: string; 
  updatedAt: string; 
}
