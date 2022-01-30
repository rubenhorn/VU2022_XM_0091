/**
 * Primary dependencies
 */
import { Request, Response, NextFunction } from "express";

/**
 * Model Schema
 */
import Thread from "../models/thread.model";
import Message from "../models/message.model";

/**
 * Helpers for sucess and error responses
 */
import { handleSuccess, handleError } from "../helpers/responseHandler";
import RequestMiddleware from "../interfaces/express";

/**
 * Create a thread in the database
 *
 * @param req
 * @param res
 */
export const create = async (req: Request, res: Response) => {
  try {
    const thread = new Thread(req.body);

    const response = await thread.save();

    return res.status(200).json(handleSuccess(response));
  } catch (err) {
    return res.status(400).json(handleError(err));
  }
};

/**
 * Retreive all threads from the database
 *
 * @param req
 * @param res
 */
export const list = async (req: Request, res: Response) => {
  try {
    const threads = await Thread.find({}).populate("posted_by", "name");

    return res.status(200).json(handleSuccess(threads));
  } catch (err) {
    return res.status(400).json(handleError(err));
  }
};

/**
 * Returns the thread object within the express middleware
 *
 * @param req
 * @param res
 */
export const show = async (req: RequestMiddleware, res: Response) => {
  return res.status(200).json(handleSuccess(req.thread));
};

/**
 * Retreive a thread by ID from the database
 * and append to the req.profile
 *
 * @param req
 * @param res
 */
export const threadByID = async (
  req: RequestMiddleware,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const thread = await Thread.findById(id)
      .select("_id title created posted_by")
      .populate("posted_by", "name");
    req.thread = thread;
    // @ts-ignore
    req.profile = { _id: thread.posted_by._id.toString() };
    next();
  } catch (err) {
    return res.status(400).json(handleError(err));
  }
};

/**
 * Update a thread by ID
 *
 * @param req
 * @param res
 */
export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const thread = await Thread.findByIdAndUpdate(id, req.body, { new: true });

    return res.status(200).json(handleSuccess(thread));
  } catch (err) {
    return res.status(400).json(handleError(err));
  }
};

/**
 * Delete a thread by ID
 *
 * @param req
 * @param res
 */
export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const message = await Message.deleteMany({ thread: id });
    const thread = await Thread.deleteOne({ _id: id });

    return res.status(200).json(handleSuccess({ thread, message }));
  } catch (err) {
    return res.status(400).json(handleError(err));
  }
};
