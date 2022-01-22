import { Request } from "express";
import { IMessageDocument } from "../models/message.model";
import { IThreadDocument } from "../models/thread.model";

interface UserMiddlewareObj {
  _id: string;
  name?: string;
  email?: string;
  created?: Date;
}

/**
 * Extending Request to contain middleware
 */
export default interface RequestMiddleware extends Request {
  message?: IMessageDocument;
  thread?: IThreadDocument;
  auth?: UserMiddlewareObj;
  profile?: UserMiddlewareObj;
}
