import { Router } from "express";
import { z } from "zod";
import { getDb } from "../db/database.js";
import { requireAuth } from "../middleware/auth.js";
import { parseProject } from "../utils/rows.js";

const router = Router();

const projectSchema = z.object({
  title: z.string().min(3).max(180),
  description: z.string().min(20),
  tech_stack: z.array(z.string().min(1)).min(1),
  demo_link: z.string().url()
});

router.get("/", async (req, res, next) => {
  try {
    const db = await getDb();
    const rows = await db.all("SELECT * FROM projects ORDER BY created_at DESC");
    res.json({ projects: rows.map(parseProject) });
  } catch (error) {
    next(error);
  }
});

router.post("/", requireAuth, async (req, res, next) => {
  try {
    const body = projectSchema.parse(req.body);
    const db = await getDb();
    const result = await db.run(
      "INSERT INTO projects (title, description, tech_stack, demo_link) VALUES (?, ?, ?, ?)",
      body.title,
      body.description,
      JSON.stringify(body.tech_stack),
      body.demo_link
    );
    const row = await db.get("SELECT * FROM projects WHERE id = ?", result.lastID);
    res.status(201).json({ project: parseProject(row) });
  } catch (error) {
    if (error instanceof z.ZodError) return res.status(400).json({ message: "Invalid project", issues: error.issues });
    next(error);
  }
});

router.put("/:id", requireAuth, async (req, res, next) => {
  try {
    const body = projectSchema.parse(req.body);
    const db = await getDb();
    await db.run(
      "UPDATE projects SET title = ?, description = ?, tech_stack = ?, demo_link = ? WHERE id = ?",
      body.title,
      body.description,
      JSON.stringify(body.tech_stack),
      body.demo_link,
      req.params.id
    );
    const row = await db.get("SELECT * FROM projects WHERE id = ?", req.params.id);
    if (!row) return res.status(404).json({ message: "Project not found" });
    res.json({ project: parseProject(row) });
  } catch (error) {
    if (error instanceof z.ZodError) return res.status(400).json({ message: "Invalid project", issues: error.issues });
    next(error);
  }
});

router.delete("/:id", requireAuth, async (req, res, next) => {
  try {
    const db = await getDb();
    const result = await db.run("DELETE FROM projects WHERE id = ?", req.params.id);
    if (!result.changes) return res.status(404).json({ message: "Project not found" });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;
