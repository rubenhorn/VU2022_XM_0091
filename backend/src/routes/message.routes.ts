import express from "express";
import * as messageCtrl from "../controllers/message.controller";
import * as threadCtrl from "../controllers/thread.controller";
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
  .route(`${prefix}/by/:id`)
  .get(messageCtrl.listByThread)
  .delete(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    messageCtrl.deleteByThread
  );

/**
 * @method GET - Message By ID
 * @method PUT - Update a message by ID
 * @method DELETE - Delete a message by ID
 */
router
  .route(`${prefix}/:messageId`)
  .get(messageCtrl.show)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, messageCtrl.update)
  .delete(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    messageCtrl.remove
  );

router.param("messageId", messageCtrl.messageByID);
router.param("id", threadCtrl.threadByID);

export default router;
