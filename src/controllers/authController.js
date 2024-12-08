import { Router } from "express";

import authService from "../services/authService.js";
import { createErrorMsg } from "../utils/errorUtil.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/register", async (req, res) => {
  const { username, email, password, rePassword } = req.body;

  try {
    const accessToken = await authService.register(username, email, password);

    res
      .status(200)
      .cookie("auth", accessToken, { httpOnly: true })
      .send(accessToken.user)
      .end();
  } catch (error) {
    if (error.message === "This username or email already registered!") {
      res
        .status(409)
        .json({ message: createErrorMsg(error) })
        .end();
    } else if (error.message.includes("validation")) {
      res
        .status(400)
        .json({ message: createErrorMsg(error) })
        .end();
    } else {
      res
        .status(500)
        .json({ message: createErrorMsg(error) })
        .end();
    }
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const accessToken = await authService.login(email, password);

    res
      .status(200)
      .cookie("auth", accessToken, { httpOnly: true })
      .send(accessToken.user)
      .end();
  } catch (error) {
    if (error.message === "User does not exist!") {
      res
        .status(404)
        .json({ message: createErrorMsg(error) })
        .end();
    } else if (error.message === "Password does not match!") {
      res
        .status(401)
        .json({ message: createErrorMsg(error) })
        .end();
    } else if (error.message.includes("validation")) {
      res
        .status(400)
        .json({ message: createErrorMsg(error) })
        .end();
    } else {
      res
        .status(500)
        .json({ message: createErrorMsg(error) })
        .end();
    }
  }
});

router.post("/logout", async (req, res) => {
  const token = req.cookies["auth"]?.accessToken;

  try {
    await authService.logout(token);
    res.status(204).clearCookie("auth").end();
  } catch (error) {
    res
      .status(500)
      .json({ message: createErrorMsg(error) })
      .end();
  }
});

router.get("/profile", authMiddleware, async (req, res) => {
  const { _id: userId } = req.user;

  try {
    const user = await authService.getUserById(userId);

    res.status(200).json(user).end();
  } catch (error) {
    res
      .status(500)
      .json({ message: createErrorMsg(error) })
      .end();
  }
});

export default router;
