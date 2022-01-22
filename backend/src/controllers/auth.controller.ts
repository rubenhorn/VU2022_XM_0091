/**
 * Primary dependencies
 */
import { Request, Response, NextFunction } from "express";
import RequestMiddleware from "../interfaces/express";

/**
 * Model Schema
 */
import User, { IUser } from "../models/user.model";

/**
 * JSON Web token imports
 */
import jwt from "jsonwebtoken";
import expressJwt from "express-jwt";

/**
 * Importing environment variables
 */
import config from "./../../config/config";

/**
 * Helpers for success / error responses
 */
import { handleError, handleSuccess } from "../helpers/responseHandler";

/**
 * Handle a user signin
 *
 * @param req
 * @param res
 */
export const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    /**
     * Find a user with this email
     */
    const user: any = await User.findOne({ email });

    /**
     * If no user is found, or if the password
     * doesn't match, drrthrow an error
     */
    if (!user) throw new Error(`No user exists with the email ${email}`);

    if (!user.authenticate(password))
      throw new Error("Email and Password don't match");

    /**
     * Sign the user's unique ID into a
     * JSON Web Token string payload
     */
    const token = jwt.sign(
      {
        _id: user._id,
      },
      config.jwtSecret
    );

    /**
     * Set the token as a cookie in the response
     */
    res.cookie("t", token, {
      expires: new Date(Date.now() + parseInt(config.SESSION_TTL, 10)),
      httpOnly: false,
    });

    /**
     * Return a 200 response with the token and user
     */
    return res.status(200).json(
      handleSuccess({
        token,
        user: { name: user.name, email: user.email, _id: user._id },
      })
    );
  } catch (err) {
    return res.status(401).json(handleError(err));
  }
};

/**
 * Ensure a user is signed in before continuing
 */
export const requireSignin = expressJwt({
  secret: config.jwtSecret,
  userProperty: "auth",
  algorithms: ["HS256"],
});

/**
 * Ensure a user has authorization, and is the logged in user before continuing
 * If not, respond with a 403 response
 */
export const hasAuthorization = (
  req: RequestMiddleware,
  res: Response,
  next: NextFunction
) => {
  const authorized =
    req.profile && req.auth && req.profile._id.toString() === req.auth._id;

  if (!authorized) {
    return res
      .status(403)
      .json(handleError("You are not authorized to access this information"));
  }

  next();
};

/**
 * Get a user by their access token
 *
 * @param {Request} req
 * @param {Response} res
 */
export const getUser = async (req: RequestMiddleware, res: Response) => {
  try {
    /**
     * Find a user with this email
     */
    const user: IUser = await User.findById(req.auth._id);

    /**
     * Return a 200 response with the token and user
     */
    return res.status(200).json(
      handleSuccess({
        token: req.params.token,
        user: { name: user.name, email: user.email, _id: user._id },
      })
    );
  } catch (err) {
    return res.status(403).json(handleError(err));
  }
};
