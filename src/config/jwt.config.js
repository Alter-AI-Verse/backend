import dotenv from "dotenv";
dotenv.config();

export default {
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRY,
};
