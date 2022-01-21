import mongoose, { Schema, Document } from "mongoose";

/**
 * Type declaration for Message Schema Fields
 */
export interface IMessageDocument extends Document {
  _id: string;
  body: string;
  created: Date;
  updated: Date;
  message: mongoose.Types.ObjectId;
}

/**
 * Schema for a Message
 */
const MessageSchema: Schema = new Schema({
  body: { type: String, required: true },
  created: { type: Date, default: Date.now },
  updated: { type: Date },
  message: { type: Schema.Types.ObjectId, ref: "User" },
});

const Message = mongoose.model<IMessageDocument>("Message", MessageSchema);

export default Message;
