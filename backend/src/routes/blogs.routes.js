import { Router } from "express";
import { z } from "zod";
import { getDb } from "../db/database.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

const blogSchema = z.object({
  slug: z.string().min(3).max(140).regex(/^[a-z0-9-]+$/),
  title: z.string().min(3).max(180),
  category: z.enum(["AI", "Cybersecurity", "Tech"]),
  excerpt: z.string().min(10).max(240),
  content: z.string().min(40),
  author: z.string().min(2).max(120),
  read_time: z.string().min(3).max(30)
});

router.get("/", async (req, res, next) => {
  try {
    const { category } = req.query;
    const db = await getDb();
    const blogs =
      category && category !== "All"
        ? await db.all("SELECT * FROM blogs WHERE category = ? ORDER BY created_at DESC", category)
        : await db.all("SELECT * FROM blogs ORDER BY created_at DESC");
    res.json({ blogs });
  } catch (error) {
    next(error);
  }
});

router.get("/:slug", async (req, res, next) => {
  try {
    const db = await getDb();
    const blog = await db.get("SELECT * FROM blogs WHERE slug = ?", req.params.slug);
    if (!blog) return res.status(404).json({ message: "Article not found" });
    return res.json({ blog });
  } catch (error) {
    next(error);
  }
});

router.post("/", requireAuth, async (req, res, next) => {
  try {
    const body = blogSchema.parse(req.body);
    const db = await getDb();
    const result = await db.run(
      `INSERT INTO blogs (slug, title, category, excerpt, content, author, read_time)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      body.slug,
      body.title,
      body.category,
      body.excerpt,
      body.content,
      body.author,
      body.read_time
    );
    const blog = await db.get("SELECT * FROM blogs WHERE id = ?", result.lastID);
    res.status(201).json({ blog });
  } catch (error) {
    if (error instanceof z.ZodError) return res.status(400).json({ message: "Invalid article", issues: error.issues });
    next(error);
  }
});

router.put("/:id", requireAuth, async (req, res, next) => {
  try {
    const body = blogSchema.parse(req.body);
    const db = await getDb();
    await db.run(
      `UPDATE blogs SET slug = ?, title = ?, category = ?, excerpt = ?, content = ?, author = ?, read_time = ?
      WHERE id = ?`,
      body.slug,
      body.title,
      body.category,
      body.excerpt,
      body.content,
      body.author,
      body.read_time,
      req.params.id
    );
    const blog = await db.get("SELECT * FROM blogs WHERE id = ?", req.params.id);
    if (!blog) return res.status(404).json({ message: "Article not found" });
    res.json({ blog });
  } catch (error) {
    if (error instanceof z.ZodError) return res.status(400).json({ message: "Invalid article", issues: error.issues });
    next(error);
  }
});

router.delete("/:id", requireAuth, async (req, res, next) => {
  try {
    const db = await getDb();
    const result = await db.run("DELETE FROM blogs WHERE id = ?", req.params.id);
    if (!result.changes) return res.status(404).json({ message: "Article not found" });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;
