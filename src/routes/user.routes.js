import express from "express";
import {
  createUser,
  getAllUsers,
  getIDByUser,
  signin,
} from "../controller/users.controller.js";
import payloadValidator from "../middleware/payloadValidator.middleware.js";
import { createUserSchema, signinSchema } from "../validator/user.validator.js";
import authGuard from "../middleware/authGuard.middleware.js";

const router = express.Router();

router.post("/signup", payloadValidator(createUserSchema), createUser);
router.post("/signin", payloadValidator(signinSchema), signin);
router.get("/:id", authGuard, getIDByUser);
router.get("/", getAllUsers);

export default router;
