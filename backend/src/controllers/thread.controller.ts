/**
 * Primary dependencies
 */
import { Request, Response, NextFunction } from "express";

/**
 * Model Schema
 */
import Thread from "../models/thread.model";

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
    const threads = await Thread.find({});

    return res.status(200).json(handleSuccess(threads));
  } catch (err) {
    return res.status(400).json(handleError(err));
  }
};

/**
 * Retreive a thread by ID from the database
 *
 * @param req
 * @param res
 */
export const show = async (req: RequestMiddleware, res: Response) => {
  try {
    const { id } = req.params;
    const thread = await await Thread.findById(id).select("_id title created");

    return res.status(200).json(handleSuccess(thread));
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
    const thread = await Thread.deleteOne({ _id: id });

    return res.status(200).json(handleSuccess(thread));
  } catch (err) {
    return res.status(400).json(handleError(err));
  }
};
