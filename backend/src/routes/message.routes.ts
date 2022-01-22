import express from "express";
import * as messageCtrl from "../controllers/message.controller";
import * as authCtrl from "../controllers/auth.controller";

const router = express.Router();
const prefix = "/api/message";

/**
 * @method POST - Create a new message
 */
router.route(prefix).post(authCtrl.requireSignin, messageCtrl.create);

/**
 * @method GET - List all messages within a thread
 * @method DELETE - Delete all messages within a thread
 */
router
  .route(`${prefix}/:threadId`)
  .get(messageCtrl.listByThread)
  .delete(messageCtrl.deleteByThread);

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

router.param("id", messageCtrl.messageByID);

export default router;
