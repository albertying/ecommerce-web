import cors from "cors";
import express from "express";

import authenticationRoutes from "./routes/authenticationRoutes.js";

const app = express();

// middleware
app.use(cors());
app.use(express.json());

//routes
app.use("/auth", authenticationRoutes);

app.listen(5000, () => {
  console.log(`Server is running on port 5000.`);
});
