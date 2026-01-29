const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    { email: user.email, id: user._id },
    process.env.ACCESS_TOKEN || "fallback_secret_key",
    { expiresIn: "7d" },
  );
};

module.exports = generateToken;
