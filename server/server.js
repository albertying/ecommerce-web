import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";

import authenticationRoutes from "./routes/authenticationRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();
const app = express();

// middleware
app.use(cors());
app.use(express.json());

//routes
app.use("/api/v1/auth", authenticationRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/orders", orderRoutes);

app.listen(5000, () => {
  console.log(`Server is running on port 5000.`);
});
