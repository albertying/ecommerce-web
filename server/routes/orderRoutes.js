import express from "express";
import { createOrder } from "../controllers/orderControllers.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.route("/create").post(verifyToken, createOrder);

export default router;
