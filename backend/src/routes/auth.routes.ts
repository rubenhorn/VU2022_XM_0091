import express from "express";
import * as authCtrl from "../controllers/auth.controller";

const router = express.Router();
const prefix = "/api/auth";

/**
 * @method POST - Signs in a user
 */
router.route(`${prefix}/signin`).post(authCtrl.signin);

/**
 * @method GET - Get a user by their token
 */
router.route(`${prefix}/user`).get(authCtrl.requireSignin, authCtrl.getUser);

export default router;
