import express from "express";
import {
  createProduct,
  getProduct,
  getProducts,
} from "../controllers/productControllers.js";

const router = express.Router();

router.route("/create").post(createProduct);
router.route("/get").get(getProducts);
router.route("/get/:id").get(getProduct);

export default router;
