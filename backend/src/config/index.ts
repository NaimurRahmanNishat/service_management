// src/config/index.ts
import dotenv from "dotenv";
dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  client_url: string;
  database_url: string;
  redis_url: string;
  jwt_access_secret: string;
  access_token_expires: string;
  refresh_token_secret: string;
  refresh_token_expires: string;
  cloudinary_cloud_name: string;
  cloudinary_api_key: string;
  cloudinary_api_secret: string;
  smtp_host: string;
  smtp_port: number;
  smtp_user: string;
  smtp_pass: string;
  smtp_from: string;
  smtp_secure: string;
  google_client_id: string;
  google_client_secret: string;
}

const config: Config = {
  port: Number(process.env.PORT) || 5100,
  nodeEnv: process.env.NODE_ENV || "development",
  client_url: process.env.CLIENT_URL || "",
  database_url: process.env.MONGODB_URL || "",
  redis_url: process.env.REDIS_URL || "",
  jwt_access_secret: process.env.JWT_ACCESS_SECRET!,
  access_token_expires: process.env.ACCESS_TOKEN_EXPIRES!,
  refresh_token_secret: process.env.REFRESH_TOKEN_SECRET!,
  refresh_token_expires: process.env.REFRESH_TOKEN_EXPIRES!,
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "",
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY || "",
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET || "",
  smtp_host: process.env.SMTP_HOST || "",
  smtp_port: Number(process.env.SMTP_PORT) || 587,
  smtp_user: process.env.SMTP_USER || "",
  smtp_pass: process.env.SMTP_PASS || "",
  smtp_from: process.env.SMTP_FROM || "",
  smtp_secure: process.env.SMTP_SECURE || "",
  google_client_id: process.env.GOOGLE_CLIENT_ID || "",
  google_client_secret: process.env.GOOGLE_CLIENT_SECRET || "",
};

export default config;
