import { Router } from "express";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { requireAuth, signToken } from "../middleware/auth.js";
import { findUserByEmail, addUser, findUserById } from "../utils/jsonDb.js";

const router = Router();

const signupSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email().max(160),
  password: z.string().min(4).max(120)
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

function publicUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    created_at: user.created_at
  };
}

router.post("/signup", async (req, res, next) => {
  try {
    const body = signupSchema.parse(req.body);
    const existing = await findUserByEmail(body.email);

    if (existing) {
      return res.status(409).json({ message: "An account with this email already exists" });
    }

    const passwordHash = await bcrypt.hash(body.password, 12);
    const user = await addUser({
      name: body.name,
      email: body.email.toLowerCase(),
      password_hash: passwordHash
    });

    res.status(201).json({ user: publicUser(user), token: signToken(user) });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Invalid signup details", issues: error.issues });
    }
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const body = loginSchema.parse(req.body);
    const user = await findUserByEmail(body.email);
    const valid = user ? await bcrypt.compare(body.password, user.password_hash) : false;

    if (!valid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({ user: publicUser(user), token: signToken(user) });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Invalid login details", issues: error.issues });
    }
    next(error);
  }
});

router.post("/social-login", async (req, res, next) => {
  try {
    const { name, email, provider } = req.body;
    let user = await findUserByEmail(email);

    if (!user) {
      // Create a mock social user if they don't exist
      user = await addUser({
        name,
        email: email.toLowerCase(),
        password_hash: "SOCIAL_AUTH_NODE", // Placeholder for social accounts
        provider: provider
      });
    }

    res.json({ user: publicUser(user), token: signToken(user) });
  } catch (error) {
    next(error);
  }
});

router.get("/me", requireAuth, async (req, res, next) => {
  try {
    const user = await findUserById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json({ user: publicUser(user) });
  } catch (error) {
    next(error);
  }
});

export default router;
