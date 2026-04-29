import { Router } from "express";
import { getDb } from "../db/database.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const db = await getDb();
    const sessions = await db.all("SELECT * FROM learning_sessions ORDER BY type ASC, starts_at ASC");
    res.json({ sessions });
  } catch (error) {
    next(error);
  }
});

export default router;
