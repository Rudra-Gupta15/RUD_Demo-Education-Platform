import { Router } from "express";
import { z } from "zod";
import { getDb } from "../db/database.js";

const router = Router();

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(160),
  subject: z.string().optional(),
  organization: z.string().optional(),
  sector: z.string().optional(),
  company: z.string().optional(), // Mapping from BusinessContact
  industry: z.string().optional(), // Mapping from BusinessContact
  message: z.string().min(5).max(2000)
});

router.post("/", async (req, res, next) => {
  try {
    const body = contactSchema.parse(req.body);
    const db = await getDb();
    const result = await db.run(
      "INSERT INTO contacts (name, email, subject, organization, sector, message) VALUES (?, ?, ?, ?, ?, ?)",
      body.name,
      body.email.toLowerCase(),
      body.subject || "General Inquiry",
      body.organization || body.company || null,
      body.sector || body.industry || null,
      body.message
    );
    res.status(201).json({ message: "Message received", id: result.lastID });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const details = error.issues.map(i => `${i.path.join("/")}: ${i.message}`).join(", ");
      return res.status(400).json({ message: `Validation failed: ${details}` });
    }
    next(error);
  }
});

export default router;
