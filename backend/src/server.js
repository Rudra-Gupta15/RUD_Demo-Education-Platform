import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { config } from "./config.js";
import { initializeDatabase } from "./db/database.js";
import authRoutes from "./routes/auth.routes.js";
import coursesRoutes from "./routes/courses.routes.js";
import blogsRoutes from "./routes/blogs.routes.js";
import projectsRoutes from "./routes/projects.routes.js";
import learningRoutes from "./routes/learning.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: config.clientOrigin,
    credentials: true
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(morgan(config.nodeEnv === "production" ? "combined" : "dev"));
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 300,
    standardHeaders: "draft-7",
    legacyHeaders: false
  })
);

app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "quorion-api" });
});

app.use("/api/auth", authRoutes);
app.use("/api/courses", coursesRoutes);
app.use("/api/blogs", blogsRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/learning", learningRoutes);
app.use("/api/contact", contactRoutes);
app.use(notFound);
app.use(errorHandler);

initializeDatabase()
  .then(() => {
    app.listen(config.port, () => {
      console.log(`Quorion API running on http://localhost:${config.port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to initialize database", error);
    process.exit(1);
  });
