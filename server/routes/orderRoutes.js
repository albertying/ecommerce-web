import express from "express";
import { createOrder, getOrders } from "../controllers/orderControllers.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.route("/create").post(verifyToken, createOrder);
router.route("/get").get(verifyToken, getOrders);

export default router;
