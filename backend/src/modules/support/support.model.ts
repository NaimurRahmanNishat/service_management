import mongoose, { Document, Schema } from "mongoose";

export type TicketStatus = "open" | "answered" | "closed";
export type TicketPriority = "low" | "medium" | "high";

export interface ISupportMessage {
  sender: mongoose.Types.ObjectId;
  text: string;
  createdAt?: Date;
}

export interface ISupportTicket extends Document {
  user: mongoose.Types.ObjectId;
  subject: string;
  message: string;

  status: TicketStatus;
  priority: TicketPriority;

  assignedTo?: mongoose.Types.ObjectId | null;
  messages: ISupportMessage[];

  createdAt?: Date;
  updatedAt?: Date;
}

const messageSubSchema = new Schema<ISupportMessage>(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const supportTicketSchema = new Schema<ISupportTicket>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["open", "answered", "closed"],
      default: "open",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    messages: [messageSubSchema],
  },
  { timestamps: true }
);

supportTicketSchema.index({ user: 1, status: 1 });
supportTicketSchema.index({ assignedTo: 1, status: 1 });
supportTicketSchema.index({ createdAt: -1 });

const SupportTicket = mongoose.model<ISupportTicket>(
  "SupportTicket",
  supportTicketSchema
);
export default SupportTicket;
