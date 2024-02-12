require("dotenv").config();
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const accessToken = req.headers["Authorization"];
  const refreshToken = req.cookies["refreshToken"];
  if (!accessToken && !refreshToken) {
    return res.status(401).send("Access Denied. No token provided.");
  }
  try {
    const decoded = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET_KEY
    );
    req.user = decoded.user;
    console.log(decoded, 1);
    next();
  } catch (error) {
    if (!refreshToken) {
      return res.status(401).send("Access Denied. No refresh token provided.");
    }
    try {
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET_KEY
      );
      const accessToken = jwt.sign(
        { user: decoded.user },
        process.env.ACCESS_TOKEN_SECRET_KEY,
        { expiresIn: "5m" }
      );
      req.user = decoded.user;
      console.log(decoded);

      res
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          sameSite: "strict",
        })
        .header("Authorization", accessToken);

      next();
    } catch (error) {
      return res.status(400).send("Invalid Token.");
    }
  }
};
module.exports = auth;
