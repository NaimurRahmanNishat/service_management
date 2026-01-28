// src/app.ts

import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import config from "./config";
import bodyParser from "body-parser";


// Routes
import { globalErrorHandler } from "./utils/errorHandler";
import router from "./routes";

const app: express.Application = express();

// ======================= GLOBAL MIDDLEWARE =======================

app.use(express.json());

app.use(
  cors({
    origin: [config.client_url], 
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "token",         
      "x-csrf-token",   
    ],
  })
);

app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded())
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// ======================= ROUTES =======================

app.use("/api/v1", router); 

app.get("/", (_req: Request, res: Response) => {
  res.send("ZenMo Server is Running...");
});

// ======================= ERROR HANDLER =======================

app.use(globalErrorHandler);

export default app;
