/**
 * Primary dependencies
 */
import { Request, Response, NextFunction } from "express";

/**
 * Model Schema
 */
import Message from "../models/message.model";

/**
 * Helpers for sucess and error responses
 */
import { handleSuccess, handleError } from "../helpers/responseHandler";
import RequestMiddleware from "../interfaces/express";

/**
 * Create a message in the database
 *
 * @param req
 * @param res
 */
export const create = async (req: Request, res: Response) => {
  try {
    const message = new Message(req.body);

    const response = await message.save();

    return res.status(200).json(handleSuccess(response));
  } catch (err) {
    return res.status(400).json(handleError(err));
  }
};

/**
 * Retreive all messages from the database
 *
 * @param req
 * @param res
 */
export const list = async (req: Request, res: Response) => {
  try {
    const messages = await Message.find({});

    return res.status(200).json(handleSuccess(messages));
  } catch (err) {
    return res.status(400).json(handleError(err));
  }
};

/**
 * Retreive a message by ID from the database
 *
 * @param req
 * @param res
 */
export const show = async (req: RequestMiddleware, res: Response) => {
  try {
    const { id } = req.params;
    const message = await await Message.findById(id).select("_id body created");

    return res.status(200).json(handleSuccess(message));
  } catch (err) {
    return res.status(400).json(handleError(err));
  }
};

/**
 * Update a message by ID
 *
 * @param req
 * @param res
 */
export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const message = await Message.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    return res.status(200).json(handleSuccess(message));
  } catch (err) {
    return res.status(400).json(handleError(err));
  }
};

/**
 * Delete a message by ID
 *
 * @param req
 * @param res
 */
export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const message = await Message.deleteOne({ _id: id });

    return res.status(200).json(handleSuccess(message));
  } catch (err) {
    return res.status(400).json(handleError(err));
  }
};
