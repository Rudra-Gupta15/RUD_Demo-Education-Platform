import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

async function check() {
  const db = await open({
    filename: './backend/data/quorion.sqlite',
    driver: sqlite3.Database
  });
  const developers = await db.all("SELECT * FROM developers");
  console.log(JSON.stringify(developers, null, 2));
}
check();
