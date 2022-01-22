import mongoose, { Schema, Document, Model } from "mongoose";
import crypto from "crypto";

/**
 * Type declaration for User Schema Fields
 */
export interface IUserDocument extends Document {
  _id: string;
  name?: string;
  created?: Date;
  updated?: Date;
  email?: string;
  hashed_password?: string;
  salt?: string;
}

/**
 * User Schema Methods
 */
export interface IUser extends IUserDocument {
  authenticate(plainText: string): boolean;
  encryptPassword(password: string): string;
  makeSalt(): string;
}

/**
 * Schema for a user
 */
const UserSchema: Schema<IUser> = new Schema({
  name: {
    type: String,
    required: "Username is required",
    unique: "Username already exists",
  },
  created: { type: Date, default: Date.now },
  updated: { type: Date },
  email: {
    type: String,
    unique: "Email already exists",
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
    required: "Email is required",
  },
  hashed_password: {
    type: String,
    required: "Password is required",
  },
  salt: String,
});

/**
 * Encrypt the password
 * And make the salt
 */
UserSchema.virtual("password")
  .set(function (password: string) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

/**
 * Validate the submitted password by the user
 */
UserSchema.path("hashed_password").validate(function () {
  if (this._password && this._password.length < 6) {
    this.invalidate("password", "Password must be at least 6 characters.");
  }
  if (this.isNew && !this._password) {
    this.invalidate("password", "Password is required");
  }
}, null);

/**
 * Declaring methods for the User Schema
 */
UserSchema.methods = {
  authenticate(plainText: string) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  encryptPassword(password: string) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
  makeSalt() {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  },
};

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
