import express from "express";
import cokieParser from "cookie-parser";

import authRoute from "./routes/auth.route.js";

const app = express();

app.use(express.json());
app.use(cokieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoute);

export default app;
