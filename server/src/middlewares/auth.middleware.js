import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  const token = req.cookies.token;
  try {
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const findUser = await userModel
      .findById(decodedToken.id)
      .select("-password");
    if (!findUser) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = findUser;
    next();
  } catch (error) {
    console.log("Error in protectRoute", error.message);
    return res.status(500).json({ message: error.message });
  }
};
