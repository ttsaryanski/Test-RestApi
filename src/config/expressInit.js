import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { authMiddleware } from "../middlewares/authMiddleware.js";

export default function expressInit(app) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(
    cors({
      origin: "http://localhost:4200",
      credentials: true,
    })
  );
  // app.use(authMiddleware);
}
