import { Router } from "express";
import authController from "./controllers/authController.js";
import itemControler from "./controllers/itemController.js";

const routes = Router();

routes.use("/auth", authController);
routes.use("/item", itemControler);

export default routes;
