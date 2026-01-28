// src/modules/location/location.interface.ts
export interface ILocationTypes {
  _id: string;
  division: string;
  district: string;
  area: string;
  subArea: string;
  postalCode: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}