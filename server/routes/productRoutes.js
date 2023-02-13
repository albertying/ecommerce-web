import express from "express";
import { createProduct } from "../controllers/productControllers.js";

const router = express.Router();

router.route("/create").post(createProduct);

export default router;
