import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import bcrypt from 'bcryptjs';

async function seedDev() {
  const db = await open({
    filename: './backend/data/quorion.sqlite',
    driver: sqlite3.Database
  });

  const email = 'lucifer@convosecai.com';
  const password = '1234';
  const passwordHash = await bcrypt.hash(password, 12);

  // Check if exists
  const existing = await db.get("SELECT id FROM users WHERE email = ?", email);
  if (existing) {
    await db.run("UPDATE users SET password_hash = ?, role = 'admin' WHERE id = ?", passwordHash, existing.id);
    console.log("Updated existing dev user.");
  } else {
    await db.run(
      "INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)",
      "Lucifer Dev", email, passwordHash, "admin"
    );
    console.log("Created new dev user.");
  }
}
seedDev();
