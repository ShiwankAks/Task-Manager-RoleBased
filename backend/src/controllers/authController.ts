import { type Request, type Response } from "express";
import { User } from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid Email" });
    }
    if (password.length < 6) {
      return res
        .status(422)
        .json({ message: "Minimum 6 characters are required in password" });
    }

    const exist = await User.findOne({ email: email });
    if (exist) {
      return res
        .status(409)
        .json({ message: "User already exist with this email" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: "employee",
    });
    await newUser.save();
    return res.status(201).json({ success: true, message: `User created` });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: `User creation failed: ${error}` });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid Email" });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "Incorrect Email or Password" });
    }
    const passCheck = await bcrypt.compare(password, user.password);
    if (!passCheck) {
      return res.status(400).json({ message: "Incorrect Email or Password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "10d" },
    );

    return res
      .status(200)
      .json({ success: true, token, message: "Login Successful" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: `User login failed: ${error}` });
  }
};

export { register, login };
