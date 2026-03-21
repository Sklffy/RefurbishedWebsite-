import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = join(__dirname, 'portfolio.db');

export const db = new sqlite3.Database(dbPath);

export async function initDB() {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Create experiences table
      db.run(`
        CREATE TABLE IF NOT EXISTS experiences (
          id TEXT PRIMARY KEY,
          title TEXT NOT NULL,
          company TEXT NOT NULL,
          date TEXT NOT NULL,
          logo TEXT,
          logo_bg TEXT DEFAULT 'bg-white',
          points TEXT,
          sort_order INTEGER DEFAULT 0,
          created_date TEXT DEFAULT CURRENT_TIMESTAMP,
          updated_date TEXT DEFAULT CURRENT_TIMESTAMP
        )
      `, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  });
}

export function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, changes: this.changes });
    });
  });
}

export function get(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

export function all(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows || []);
    });
  });
}