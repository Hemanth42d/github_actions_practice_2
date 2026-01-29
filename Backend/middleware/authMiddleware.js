const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        error: true,
        message: "Access denied. No token provided.",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN || "fallback_secret_key",
    );

    // Verify user still exists in database
    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        error: true,
        message: "User not found. Please login again.",
      });
    }

    // Add user info to request object
    req.user = {
      id: decoded.id,
      email: decoded.email,
      name: user.name,
    };

    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        error: true,
        message: "Invalid token.",
      });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        error: true,
        message: "Token expired. Please login again.",
      });
    }
    return res.status(500).json({
      error: true,
      message: "Server error during authentication.",
    });
  }
};

module.exports = authMiddleware;
