import { Router } from "express";
import { z } from "zod";
import { getDb } from "../db/database.js";
import { requireAuth } from "../middleware/auth.js";
import { parseCourse } from "../utils/rows.js";

const router = Router();

const courseSchema = z.object({
  slug: z.string().min(3).max(120).regex(/^[a-z0-9-]+$/),
  title: z.string().min(3).max(160),
  category: z.enum(["AI", "Cybersecurity"]),
  difficulty: z.enum(["Beginner", "Intermediate", "Advanced"]),
  price: z.number().int().min(0).max(10000),
  duration: z.string().min(2).max(80),
  description: z.string().min(20),
  syllabus: z.array(z.string().min(3)).min(3),
  instructor_name: z.string().min(2).max(120),
  instructor_bio: z.string().min(10),
  featured: z.boolean().optional().default(false)
});

router.get("/", async (req, res, next) => {
  try {
    const { category, difficulty } = req.query;
    const clauses = [];
    const params = [];

    if (category && category !== "All") {
      clauses.push("category = ?");
      params.push(category);
    }
    if (difficulty && difficulty !== "All") {
      clauses.push("difficulty = ?");
      params.push(difficulty);
    }

    const db = await getDb();
    const rows = await db.all(
      `SELECT * FROM courses ${clauses.length ? `WHERE ${clauses.join(" AND ")}` : ""} ORDER BY featured DESC, created_at DESC`,
      params
    );

    res.json({ courses: rows.map(parseCourse) });
  } catch (error) {
    next(error);
  }
});

router.get("/:slug", async (req, res, next) => {
  try {
    const db = await getDb();
    const row = await db.get("SELECT * FROM courses WHERE slug = ?", req.params.slug);
    if (!row) return res.status(404).json({ message: "Course not found" });
    return res.json({ course: parseCourse(row) });
  } catch (error) {
    next(error);
  }
});

router.post("/", requireAuth, async (req, res, next) => {
  try {
    const body = courseSchema.parse(req.body);
    const db = await getDb();
    const result = await db.run(
      `INSERT INTO courses
      (slug, title, category, difficulty, price, duration, description, syllabus, instructor_name, instructor_bio, featured)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      body.slug,
      body.title,
      body.category,
      body.difficulty,
      body.price,
      body.duration,
      body.description,
      JSON.stringify(body.syllabus),
      body.instructor_name,
      body.instructor_bio,
      body.featured ? 1 : 0
    );
    const row = await db.get("SELECT * FROM courses WHERE id = ?", result.lastID);
    res.status(201).json({ course: parseCourse(row) });
  } catch (error) {
    if (error instanceof z.ZodError) return res.status(400).json({ message: "Invalid course", issues: error.issues });
    next(error);
  }
});

router.put("/:id", requireAuth, async (req, res, next) => {
  try {
    const body = courseSchema.parse(req.body);
    const db = await getDb();
    await db.run(
      `UPDATE courses SET slug = ?, title = ?, category = ?, difficulty = ?, price = ?, duration = ?,
      description = ?, syllabus = ?, instructor_name = ?, instructor_bio = ?, featured = ? WHERE id = ?`,
      body.slug,
      body.title,
      body.category,
      body.difficulty,
      body.price,
      body.duration,
      body.description,
      JSON.stringify(body.syllabus),
      body.instructor_name,
      body.instructor_bio,
      body.featured ? 1 : 0,
      req.params.id
    );
    const row = await db.get("SELECT * FROM courses WHERE id = ?", req.params.id);
    if (!row) return res.status(404).json({ message: "Course not found" });
    res.json({ course: parseCourse(row) });
  } catch (error) {
    if (error instanceof z.ZodError) return res.status(400).json({ message: "Invalid course", issues: error.issues });
    next(error);
  }
});

router.delete("/:id", requireAuth, async (req, res, next) => {
  try {
    const db = await getDb();
    const result = await db.run("DELETE FROM courses WHERE id = ?", req.params.id);
    if (!result.changes) return res.status(404).json({ message: "Course not found" });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;
