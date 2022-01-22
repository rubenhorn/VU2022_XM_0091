import { Request } from "express";

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
  auth?: UserMiddlewareObj;
  profile: UserMiddlewareObj;
}
