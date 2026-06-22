import express from "express";
import { updateUserAvatar } from "../controllers/userController.js";
import { upload } from "../middleware/multer.js";
import authMiddleware from "../middleware/authenticate.js";

const router = express.Router();

router.patch(
  "/me/avatar",
  authMiddleware,
  upload.single("avatar"),
  updateUserAvatar
);

export default router;
