import mongoose, { Schema, Document } from "mongoose";

/**
 * Type declaration for Thread Schema Fields
 */
export interface IThreadDocument extends Document {
  _id: string;
  title: string;
  created: Date;
  updated: Date;
  posted_by: mongoose.Types.ObjectId;
}

/**
 * Schema for a Thread
 */
const ThreadSchema: Schema = new Schema({
  title: { type: String, required: "Title is required" },
  created: { type: Date, default: Date.now },
  updated: { type: Date },
  posted_by: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: "User is required",
  },
});

const Thread = mongoose.model<IThreadDocument>("Thread", ThreadSchema);

export default Thread;
