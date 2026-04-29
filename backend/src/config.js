import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: Number(process.env.PORT || 5000),
  databaseUrl: process.env.DATABASE_URL || "./data/quorion.sqlite",
  jwtSecret: process.env.JWT_SECRET || "dev-only-change-me",
  clientOrigin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
  nodeEnv: process.env.NODE_ENV || "development"
};
