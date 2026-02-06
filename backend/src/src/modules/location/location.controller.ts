// src/modules/location/location.controller.ts
import { Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware";
import { catchAsync } from "../../middleware/catchAsync";
import * as locationService from "./location.service";
import { sendError, sendSuccess } from "../../utils/response";
import { IUser } from "../users/user.model";

/* ================= CREATE LOCATION ================= */
export const createLocation = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const user = req.user as IUser;

    if (!user) {
      return sendError(res, "Unauthorized", 401);
    }

    // Only admin & super_admin can create location
    if (!["admin", "super_admin"].includes(user.role)) {
      return sendError(res, "Access denied", 403);
    }

    const location = await locationService.createLocations(
      req.body,
      user,
    );

    return sendSuccess(
      res,
      "Location created successfully",
      location,
      201,
    );
  },
);


// export const getAllLocations = async (req: Request, res: Response) => {
//   const result = await locationService.getAllLocations(req.query, req?.user!);
//   res.status(200).json({ success: true, ...result });
// };

// export const getLocation = async (req: Request, res: Response) => {
//   const data = await locationService.getLocationById(req.params.id!, req?.user!);
//   res.status(200).json({ success: true, data });
// };

// export const updateLocation = async (req: Request, res: Response) => {
//   const data = await locationService.updateLocation(
//     req.params.id!,
//     req.body,
//     req.user!
//   );
//   res.status(200).json({ success: true, data });
// };

// export const deleteLocation = async (req: Request, res: Response) => {
//   await locationService.deleteLocation(req.params.id!, req?.user!);
//   res.status(200).json({ success: true });
// };
