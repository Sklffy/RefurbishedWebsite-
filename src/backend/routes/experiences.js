import express from 'express';
import { randomUUID } from 'crypto';
import { run, get, all } from '../db.js';

const router = express.Router();

// List experiences (sorted by sort_order)
router.get('/', async (req, res) => {
  try {
    const experiences = await all(
      'SELECT * FROM experiences ORDER BY sort_order ASC, created_date DESC'
    );
    res.json(experiences.map(exp => ({
      ...exp,
      points: exp.points ? JSON.parse(exp.points) : []
    })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single experience
router.get('/:id', async (req, res) => {
  try {
    const exp = await get('SELECT * FROM experiences WHERE id = ?', [req.params.id]);
    if (!exp) return res.status(404).json({ error: 'Not found' });
    res.json({
      ...exp,
      points: exp.points ? JSON.parse(exp.points) : []
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create experience
router.post('/', async (req, res) => {
  try {
    const { title, company, date, logo, logo_bg, points, sort_order } = req.body;
    const id = randomUUID();
    const now = new Date().toISOString();
    
    await run(
      `INSERT INTO experiences (id, title, company, date, logo, logo_bg, points, sort_order, created_date, updated_date)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, title, company, date, logo || null, logo_bg || 'bg-white', JSON.stringify(points || []), sort_order || 0, now, now]
    );
    
    res.json({ id, title, company, date, logo, logo_bg, points: points || [], sort_order, created_date: now, updated_date: now });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update experience
router.put('/:id', async (req, res) => {
  try {
    const { title, company, date, logo, logo_bg, points, sort_order } = req.body;
    const now = new Date().toISOString();
    
    await run(
      `UPDATE experiences SET title = ?, company = ?, date = ?, logo = ?, logo_bg = ?, points = ?, sort_order = ?, updated_date = ?
       WHERE id = ?`,
      [title, company, date, logo || null, logo_bg || 'bg-white', JSON.stringify(points || []), sort_order || 0, now, req.params.id]
    );
    
    res.json({ id: req.params.id, title, company, date, logo, logo_bg, points: points || [], sort_order, updated_date: now });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete experience
router.delete('/:id', async (req, res) => {
  try {
    await run('DELETE FROM experiences WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;