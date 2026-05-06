import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import bcrypt from "bcryptjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const USERS_FILE = path.resolve(__dirname, "../../data/users.json");

export async function getUsers() {
  try {
    const data = await fs.readFile(USERS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      await fs.mkdir(path.dirname(USERS_FILE), { recursive: true });
      const masterPass = await bcrypt.hash("1234", 12);
      const initialUsers = [
        {
          id: 1,
          name: "Lucifer Dev",
          email: "lucifer@convosecai.com",
          password_hash: masterPass,
          role: "admin",
          created_at: new Date().toISOString()
        }
      ];
      await fs.writeFile(USERS_FILE, JSON.stringify(initialUsers, null, 2));
      return initialUsers;
    }
    throw error;
  }
}

export async function saveUsers(users) {
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
}

export async function addUser(user) {
  const users = await getUsers();
  const newUser = {
    id: Date.now(),
    role: "student",
    created_at: new Date().toISOString(),
    ...user
  };
  users.push(newUser);
  await saveUsers(users);
  return newUser;
}

export async function findUserByEmail(email) {
  const users = await getUsers();
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export async function findUserById(id) {
  const users = await getUsers();
  return users.find((u) => u.id === Number(id));
}

export async function getAllUsers() {
  return await getUsers();
}

export async function deleteUser(id) {
  const users = await getUsers();
  const filtered = users.filter((u) => u.id !== Number(id));
  await saveUsers(filtered);
}
