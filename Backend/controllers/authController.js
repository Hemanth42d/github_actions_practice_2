const userModel = require("../models/user.js");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken.js");

const registerUser = async (req, res) => {
  try {
    let { name, email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (user)
      return res.json({
        error: true,
        message: "User Already exists, please login to use your account",
      });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err)
          return res.json({
            error: true,
            message: "Something went wrong check your details",
          });

        const newUser = await userModel.create({
          name,
          email,
          password: hash,
        });

        let token = generateToken(newUser);
        res.cookie("token", token);
        return res.json({
          success: true,
          message: "user registered successfully",
        });
      });
    });
  } catch (error) {
    res.json(error.message);
  }
};

const loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) return res.json({ error: true, message: "user not found" });

    bcrypt.compare(password, user.password, (err, result) => {
      if (err)
        return res.status(401).json({
          error: true,
          message: "something went wrong try again carefully",
        });

      if (result) {
        let token = generateToken(user);
        res.cookie("token", token);

        return res
          .status(200)
          .json({ success: true, message: "User logged in successfully" });
      } else {
        return res.status(401).json({
          error: true,
          message: "something went wrong try again carefully",
        });
      }
    });
  } catch (error) {
    res.json({ error: true, message: "Something went wrong" });
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie("token", { httpOnly: true, secure: true });
    res.json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    res.json({ error: true, message: "Something went wrong" });
  }
};

module.exports = { registerUser, loginUser, logout };
