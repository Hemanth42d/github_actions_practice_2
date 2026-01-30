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
          token: token,
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

        return res.status(200).json({
          success: true,
          message: "User logged in successfully",
          token: token,
        });
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

const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        error: true,
        message: "Current password and new password are required",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        error: true,
        message: "New password must be at least 6 characters long",
      });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        error: true,
        message: "User not found",
      });
    }

    // Verify current password
    const isCurrentPasswordValid = await new Promise((resolve) => {
      bcrypt.compare(currentPassword, user.password, (err, result) => {
        resolve(result);
      });
    });

    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        error: true,
        message: "Current password is incorrect",
      });
    }

    // Hash new password
    const saltRounds = 10;
    const hashedNewPassword = await new Promise((resolve, reject) => {
      bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) reject(err);
        bcrypt.hash(newPassword, salt, (err, hash) => {
          if (err) reject(err);
          resolve(hash);
        });
      });
    });

    // Update password in database
    await userModel.findByIdAndUpdate(userId, {
      password: hashedNewPassword,
    });

    res.json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Something went wrong",
    });
  }
};

module.exports = { registerUser, loginUser, logout, updatePassword };
