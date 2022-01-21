import express from "express";
import * as userCtrl from "../controllers/user.controller";
import * as authCtrl from "../controllers/auth.controller";

const router = express.Router();
const prefix = "/api/user";

/**
 * @method POST - Create a new user
 * @method GET - List all users
 */
router
  .route(`${prefix}`)
  .post(userCtrl.create)
  .get(authCtrl.requireSignin, userCtrl.list);

/**
 * @method GET - User By ID
 * @method PUT - Update a user by ID
 * @method DELETE - Delete a user by ID
 */
router
  .route(`${prefix}/:id`)
  .get(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.show)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove);

router.param("id", userCtrl.userByID);

export default router;
