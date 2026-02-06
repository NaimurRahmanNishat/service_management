// src/utils/email.ts
import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";
import fs from "fs";
import config from "../config";


/* ================= EMAIL CONFIG INTERFACE ================= */
interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
  from: string;
};


/* ================= EMAIL RETRY INTERFACE ================= */
interface RetryConfig {
  maxRetries: number;
  retryDelay: number;
  backofMultiplier: number;
};


/* ================= EMAIL OPTIONS INTERFACE ================= */
interface EmailOptions {
  retries?: number;
  priority?: "high" | "normal" | "low";
  tags?: string[];
};


/* ================= BULK EMAIL OPTIONS INTERFACE ================= */
interface BulkEmailOptions {
  batchSize?: number;
  delayBetweenBatches?: number;
  priority?: "high" | "normal" | "low";
};


/* ================= EMAIL RESULT INTERFACE ================= */
interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
};


/* ================= BULK EMAIL RESULT INTERFACE ================= */
interface BulkEmailResult {
  success: boolean;
  failed: number;
  results: Array<{ to: string; success: boolean; error?: string }>;
};


/* ================= EMAIL DATA INTERFACE ================= */
interface EmailData {
  to: string;
  subject: string;
  templateName: string;
  data: object;
};


/* ================= GET EMAIL CONFIG ================= */
const getEmailConfig = (): EmailConfig => {
  const port = Number(config.smtp_port) || 587;
  const secureEnv = config.smtp_secure;
  const secure =
    typeof secureEnv === "string"
      ? secureEnv === "true" || secureEnv === "1"
      : port === 465;

  return {
    host: config.smtp_host || "smtp.gmail.com",
    port,
    secure,
    auth: {
      user: config.smtp_user,
      pass: config.smtp_pass,
    },
    from: config.smtp_from || "noreply@codetutorbd.com",
  };
};


/* ================= GET RETRY CONFIG ================= */
const getRetryConfig = (): RetryConfig => ({
  maxRetries: 3,
  retryDelay: 1000,
  backofMultiplier: 2,
});


/* ================= CREATE TRANSPORTER ================= */
const createTransporter = () => {
  const config = getEmailConfig();
  return nodemailer.createTransport(config);
};


/* ================= VERIFY EMAIL CONNECTION ================= */
export const verifyEmailConnection = async (): Promise<boolean> => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log("Email service connection verified");
    return true;
  } catch (error) {
    console.error(`Email servic connection failed: `, error);
    return false;
  }
};


/* ================= RESOLVE TEMPLATE PATH ================= */
const resolveTemplatePath = (templateName: string): string => {
  const candidates = [
    path.join(__dirname, `../templates/${templateName}.ejs`), // ts-node
    path.resolve(__dirname, `../../src/templates/${templateName}.ejs`), // dist
    path.join(process.cwd(), `src/templates/${templateName}.ejs`), // dev
    path.join(process.cwd(), `dist/templates/${templateName}.ejs`), // prod
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) return candidate;
  }

  const defaultPath = path.join(__dirname, `../templates/${templateName}.ejs`);
  return candidates[0] || defaultPath;
};


/* ================= CHECK TEMPLATE EXISTS ================= */
const checkTemplateExists = (templateName: string): boolean => {
  const templatePath = resolveTemplatePath(templateName);
  return fs.existsSync(templatePath);
};


/* ================= RENDER TEMPLATE ================= */
const renderTemplate = async (
  templateName: string,
  data: object
): Promise<string> => {
  const templatePath = resolveTemplatePath(templateName);
  return await ejs.renderFile(templatePath, data);
};


/* ================= PREPARE EMAIL OPTIONS ================= */
const perpareEmailOptions = (
  to: string,
  subject: string,
  html: string,
  templateName: string,
  priority: "high" | "normal" | "low",
  tags: string[]
) => {
  const config = getEmailConfig();
  return {
    from: config.from,
    to,
    subject,
    html,
    priority,
    headers: {
      "X-Priority": priority === "high" ? "1" : priority === "low" ? "5" : "3",
      "X-Mailer": "Service-Management",
      "X-Template": templateName,
      ...(tags.length > 0 && { "X-Tags": tags.join(",") }),
    },
  };
};


/* ================= CALCULATE RETRY DELAY ================= */
const calculateRetryDelay = (attempt: number): number => {
  const retryConfig = getRetryConfig();
  return (
    retryConfig.retryDelay * Math.pow(retryConfig.backofMultiplier, attempt - 1)
  );
};


/* ================= SEND EMAIL WITH RETRY ================= */
const sendEmailWithRetry = async ( to: string, subject: string, templateName: string, data: object, options: EmailOptions = {} ): Promise<EmailResult> => {
  const retryConfig = getRetryConfig();
  const { retries = retryConfig.maxRetries, priority = "normal", tags = [], } = options;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      // check if template exists
      if (!checkTemplateExists(templateName)) {
        throw new Error(`Email template not found: ${templateName}.ejs`);
      }

      // render the ejs template
      const html = await renderTemplate(templateName, data);

      // prepare mail options
      const mailOptions = perpareEmailOptions( to, subject, html, templateName, priority, tags );

      const transporter = createTransporter();
      const result = await transporter.sendMail(mailOptions);

      console.log(
        `✅ Email sent successfully to ${to} (attempt ${attempt}/${retries})`
      );
      console.log(`📧 Subject: ${subject}`);
      console.log(`📧 Message ID: ${result.messageId}`);

      return {
        success: true,
        messageId: result.messageId,
      };
    } catch (error: any) {
      console.error(
        `❌ Email send attempt ${attempt}/${retries} failed: `,
        error.message
      );

      if (attempt === retries) {
        console.error(`🔥 All email attempts failed for ${to}`);
        return {
          success: false,
          error: error.message,
        };
      }

      // wait before retry
      const delay = calculateRetryDelay(attempt);
      console.log(`⏳ Retrying in ${delay}ms...`);
    }
  }
  return {
    success: false,
    error: "Max retries exceeded",
  };
};

// send bulk emails with rate limiting

/* ================= SEND EMAIL ================= */
export const sendEmail = async ( to: string, subject: string, templateName: string, data: object ) => {
  const result = await sendEmailWithRetry(to, subject, templateName, data);

  if (!result.success) {
    throw new Error(`Failed to send email: ${result.error}`);
  }
};
