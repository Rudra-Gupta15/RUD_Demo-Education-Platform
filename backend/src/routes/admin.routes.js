import { Router } from "express";
import { getDb } from "../db/database.js";
import { requireAdmin } from "../middleware/auth.js";
import { getAllUsers, deleteUser } from "../utils/jsonDb.js";
import { upload } from "../utils/upload.js";

const router = Router();

// In a real app, you'd check if user.role === 'admin'
// For this demo, we'll allow authenticated users to see the dev dashboard stats
router.get("/stats", requireAdmin, async (req, res, next) => {
  try {
    const db = await getDb();

    const users = await getAllUsers();
    const userCount = users.length;
    const courseCount = await db.get("SELECT COUNT(*) as count FROM courses");
    const blogCount = await db.get("SELECT COUNT(*) as count FROM blogs");
    const contactCount = await db.get("SELECT COUNT(*) as count FROM contacts");

    const recentContacts = await db.all("SELECT * FROM contacts ORDER BY created_at DESC LIMIT 5");
    const recentUsers = [...users].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 5);

    res.json({
      stats: {
        users: userCount,
        courses: courseCount.count,
        blogs: blogCount.count,
        contacts: contactCount.count,
      },
      recentContacts,
      recentUsers
    });
  } catch (error) {
    next(error);
  }
});

// User Management
router.get("/users", requireAdmin, async (req, res, next) => {
  try {
    const users = await getAllUsers();
    const sorted = [...users].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    res.json({ users: sorted.map(u => ({ id: u.id, name: u.name, email: u.email, role: u.role, created_at: u.created_at })) });
  } catch (error) {
    next(error);
  }
});

router.delete("/users/:id", requireAdmin, async (req, res, next) => {
  try {
    await deleteUser(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

// Contact Management
router.get("/contacts", requireAdmin, async (req, res, next) => {
  try {
    const db = await getDb();
    const rows = await db.all("SELECT * FROM contacts ORDER BY created_at DESC");
    res.json({ contacts: rows });
  } catch (error) {
    next(error);
  }
});

router.delete("/contacts/:id", requireAdmin, async (req, res, next) => {
  try {
    const db = await getDb();
    await db.run("DELETE FROM contacts WHERE id = ?", req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

// Developer Access Management
router.get("/developers", requireAdmin, async (req, res, next) => {
  try {
    const db = await getDb();
    const rows = await db.all("SELECT * FROM developers ORDER BY created_at DESC");
    res.json({ developers: rows });
  } catch (error) {
    next(error);
  }
});

router.post("/developers", requireAdmin, async (req, res, next) => {
  try {
    const { name, email, pin } = req.body;
    const db = await getDb();
    const result = await db.run(
      "INSERT INTO developers (name, email, pin) VALUES (?, ?, ?)",
      name, email, pin
    );
    const row = await db.get("SELECT * FROM developers WHERE id = ?", result.lastID);
    res.status(201).json({ developer: row });
  } catch (error) {
    next(error);
  }
});

router.delete("/developers/:id", requireAdmin, async (req, res, next) => {
  try {
    const db = await getDb();
    await db.run("DELETE FROM developers WHERE id = ?", req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

router.put("/developers/:id", requireAdmin, async (req, res, next) => {
  try {
    const { name, email, pin } = req.body;
    const db = await getDb();
    await db.run(
      "UPDATE developers SET name = ?, email = ?, pin = ? WHERE id = ?",
      name, email, pin, req.params.id
    );
    const row = await db.get("SELECT * FROM developers WHERE id = ?", req.params.id);
    res.json({ developer: row });
  } catch (error) {
    next(error);
  }
});

router.post("/bulk-courses", requireAdmin, async (req, res, next) => {
  try {
    const { courses } = req.body;
    const db = await getDb();
    
    for (const c of courses) {
      // Check if exists
      const existing = await db.get("SELECT id FROM courses WHERE slug = ?", c.slug);
      if (existing) continue;

      await db.run(
        `INSERT INTO courses
        (slug, title, category, difficulty, price, original_price, image, duration, description, syllabus, instructor_name, instructor_bio, rating, reviews, badges, outcomes, featured)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        c.slug,
        c.title,
        c.topic || "AI",
        c.difficulty || "Beginner",
        parseInt(String(c.price).replace(/[^0-9]/g, "")) || 0,
        parseInt(String(c.originalPrice).replace(/[^0-9]/g, "")) || 0,
        c.image || null,
        c.duration || "Flexible",
        c.description || "",
        JSON.stringify(c.syllabus || []),
        c.instructor || "RUD-Demo",
        "",
        c.rating || 4.5,
        c.reviews || 0,
        JSON.stringify(c.badges || []),
        JSON.stringify(c.outcomes || []),
        0
      );
    }
    res.status(201).json({ message: "Catalog scanned and imported" });
  } catch (error) {
    next(error);
  }
});

router.post("/upload", requireAdmin, upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });
  const url = `http://localhost:5000/uploads/${req.file.filename}`;
  res.json({ url });
});

export default router;
