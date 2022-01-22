import mongoose, { Schema, Document } from "mongoose";

/**
 * Type declaration for Message Schema Fields
 */
export interface IMessageDocument extends Document {
  _id: string;
  body: string;
  created: Date;
  updated: Date;
  thread: mongoose.Types.ObjectId;
  posted_by: mongoose.Types.ObjectId;
}

/**
 * Schema for a Message
 */
const MessageSchema: Schema = new Schema({
  body: { type: String, required: "Body is required" },
  created: { type: Date, default: Date.now },
  updated: { type: Date },
  thread: {
    type: Schema.Types.ObjectId,
    ref: "Thread",
    required: "Thread is required",
  },
  posted_by: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: "User is requied",
  },
});

const Message = mongoose.model<IMessageDocument>("Message", MessageSchema);

export default Message;
