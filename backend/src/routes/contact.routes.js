import { Router } from "express";
import { z } from "zod";
import { getDb } from "../db/database.js";

const router = Router();

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(160),
  message: z.string().min(10).max(2000)
});

router.post("/", async (req, res, next) => {
  try {
    const body = contactSchema.parse(req.body);
    const db = await getDb();
    const result = await db.run(
      "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)",
      body.name,
      body.email.toLowerCase(),
      body.message
    );
    res.status(201).json({ message: "Message received", id: result.lastID });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Please check the contact form", issues: error.issues });
    }
    next(error);
  }
});

export default router;
