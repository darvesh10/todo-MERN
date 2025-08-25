const User = require('../models/User');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken');

// Register User
const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      const token = generateToken(user._id);

      //  Send token as HTTP-only cookie
      res.cookie("jwt", token, {
        httpOnly: true,
        secure: false, // ya secure: process.env.NODE_ENV === "production"

        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
      });
    }
  } catch (error) {
    next(error);
  }
};

// Login User
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = generateToken(user._id);

      //  Send token as HTTP-only cookie
      res.cookie("jwt", token, {
        httpOnly: true,
        secure: false, // ya secure: process.env.NODE_ENV === "production"

        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    next(error);
  }
};

// Logout User (clear cookie)
const logoutUser = async (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: false, // ya secure: process.env.NODE_ENV === "production"

    sameSite: "strict",
  });
  res.json({ message: "Logged out successfully" });
};

module.exports = { registerUser, loginUser, logoutUser };
