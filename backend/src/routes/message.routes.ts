import express from "express";
import * as messageCtrl from "../controllers/message.controller";
import * as authCtrl from "../controllers/auth.controller";

const router = express.Router();
const prefix = "/api/message";

/**
 * @method POST - Create a new message
 * @method GET - List all messages
 */
router
  .route(prefix)
  .post(messageCtrl.create)
  .get(authCtrl.requireSignin, messageCtrl.list);

/**
 * @method GET - Message By ID
 * @method PUT - Update a message by ID
 * @method DELETE - Delete a message by ID
 */
router
  .route(`${prefix}/:id`)
  .get(messageCtrl.show)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, messageCtrl.update)
  .delete(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    messageCtrl.remove
  );

export default router;
