import express from "express";
import { updateUser } from "../controllers/user.clerk.controller.ts";

const router = express.Router();

router.put("/:userId", updateUser);

export default router;
