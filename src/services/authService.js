import bcrypt from "bcrypt";

import File from "../models/File.js";

import jwt from "../lib/jwt.js";
import User from "../models/User.js";
import InvalidToken from "../models/InvalidToken.js";
import { JWT_SECRET } from "../config/constans.js";

const register = async (username, email, password, profilePicture) => {
  const user = await User.findOne({ $or: [{ username }, { email }] });

  if (user) {
    throw new Error("This username or email already registered!");
  }

  const createdUser = await User.create({
    username,
    email,
    password,
    profilePicture: profilePicture || null,
  });

  return createAccessToken(createdUser);
};

const login = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User does not exist!");
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    throw new Error("Password does not match!");
  }

  return createAccessToken(user);
};

const logout = (token) => InvalidToken.create({ token });

const getUserById = (id) => User.findById(id);

const saveUserFile = (fileName, fileUrl) => File.create({ fileName, fileUrl });

async function createAccessToken(user) {
  const payload = {
    _id: user._id,
    username: user.username,
    email: user.email,
  };

  const token = await jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });

  return {
    user,
    accessToken: token,
  };
}

export default {
  register,
  login,
  logout,
  getUserById,
  saveUserFile,
};
