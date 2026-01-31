// src/modules/location/location.validation.ts

import {z} from "zod";

/* ================= CREATE LOCATION ================= */
export const createLocationSchema = z.object({
    body: z.object({
        division: z.enum([
            "Dhaka","Chattogram","Rajshahi","Khulna",
            "Barisal","Sylhet","Rangpur","Mymensingh"
        ]),
        district: z.string().min(1, "District is required"),
        area: z.string().min(1, "Area is required"),
        subArea: z.string().min(1, "Sub-area is required"),
        postalCode: z.string().min(1, "Postal code is required"),
    }),
})