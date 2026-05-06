import { Router } from "express";
import { z } from "zod";
import { getDb } from "../db/database.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";
import { parseCourse } from "../utils/rows.js";

const router = Router();

const courseSchema = z.object({
  slug: z.string().min(3).max(120).regex(/^[a-z0-9-]+$/),
  title: z.string().min(3).max(160),
  category: z.string().min(2).max(100),
  difficulty: z.string().min(2).max(100),
  price: z.number().int().min(0),
  original_price: z.number().int().min(0).optional(),
  image: z.string().url().optional().or(z.literal("")),
  video_url: z.string().optional().or(z.literal("")),
  duration: z.string().min(2).max(80),
  description: z.string().min(10),
  syllabus: z.array(z.string()).optional().default([]),
  instructor_name: z.string().min(2).max(120),
  instructor_bio: z.string().optional().default(""),
  rating: z.number().min(0).max(5).optional().default(4.5),
  reviews: z.number().int().min(0).optional().default(0),
  badges: z.array(z.string()).optional().default([]),
  outcomes: z.array(z.string()).optional().default([]),
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

// Enrolled courses for current user
router.get("/user/enrolled", requireAuth, async (req, res, next) => {
  try {
    const db = await getDb();
    const rows = await db.all(
      `SELECT c.* FROM courses c
       JOIN enrollments e ON c.id = e.course_id
       WHERE e.user_id = ?
       ORDER BY e.enrolled_at DESC`,
      req.user.id
    );
    res.json({ courses: rows.map(parseCourse) });
  } catch (error) {
    next(error);
  }
});

// Enroll in a course
router.post("/:id/enroll", requireAuth, async (req, res, next) => {
  try {
    const db = await getDb();
    await db.run(
      "INSERT OR IGNORE INTO enrollments (user_id, course_id) VALUES (?, ?)",
      req.user.id,
      req.params.id
    );
    res.status(201).json({ message: "Enrolled successfully" });
  } catch (error) {
    next(error);
  }
});

router.post("/", requireAdmin, async (req, res, next) => {
  try {
    const body = courseSchema.parse(req.body);
    const db = await getDb();
    const result = await db.run(
      `INSERT INTO courses
      (slug, title, category, difficulty, price, original_price, image, video_url, duration, description, syllabus, instructor_name, instructor_bio, rating, reviews, badges, outcomes, featured)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      body.slug,
      body.title,
      body.category,
      body.difficulty,
      body.price,
      body.original_price || null,
      body.image || null,
      body.video_url || null,
      body.duration,
      body.description,
      JSON.stringify(body.syllabus),
      body.instructor_name,
      body.instructor_bio,
      body.rating,
      body.reviews,
      JSON.stringify(body.badges),
      JSON.stringify(body.outcomes),
      body.featured ? 1 : 0
    );
    const row = await db.get("SELECT * FROM courses WHERE id = ?", result.lastID);
    res.status(201).json({ course: parseCourse(row) });
  } catch (error) {
    if (error instanceof z.ZodError) return res.status(400).json({ message: "Invalid course", issues: error.issues });
    next(error);
  }
});

router.put("/:id", requireAdmin, async (req, res, next) => {
  try {
    const body = courseSchema.parse(req.body);
    const db = await getDb();
    await db.run(
      `UPDATE courses SET slug = ?, title = ?, category = ?, difficulty = ?, price = ?, original_price = ?, image = ?, video_url = ?, duration = ?,
      description = ?, syllabus = ?, instructor_name = ?, instructor_bio = ?, rating = ?, reviews = ?, badges = ?, outcomes = ?, featured = ? WHERE id = ?`,
      body.slug,
      body.title,
      body.category,
      body.difficulty,
      body.price,
      body.original_price || null,
      body.image || null,
      body.video_url || null,
      body.duration,
      body.description,
      JSON.stringify(body.syllabus),
      body.instructor_name,
      body.instructor_bio,
      body.rating,
      body.reviews,
      JSON.stringify(body.badges),
      JSON.stringify(body.outcomes),
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

router.delete("/:id", requireAdmin, async (req, res, next) => {
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
