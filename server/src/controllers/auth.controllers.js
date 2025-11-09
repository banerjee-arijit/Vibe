import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const SignIn = async (req, res) => {
  const { email, password } = req.body;
  try {
  } catch (error) {
    console.log("Error in SignIn Controller", error.message);
    return res.status(500).json({ message: error.message });
  }
};
export const SignUp = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const findExistingEmail = await userModel.findOne({ email });
    const findExistingUsername = await userModel.findOne({ username });

    if (findExistingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }
    if (findExistingUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }
    if (!username || !email || !password) {
      return res.status(404).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
    return res
      .status(201)
      .json({ message: "User created successfully", user: newUser });

    //todo: send mail via mailtrap
  } catch (error) {
    console.log("Error in SignUp Controller", error.message);
    return res.status(500).json({ message: error.message });
  }
};
export const Logout = async (req, res) => {};
