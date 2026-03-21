import express from 'express';
import cors from 'cors';
import { initDB } from './db.js';
import experiencesRouter from './routes/experiences.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/experiences', experiencesRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Initialize database and start server
initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Portfolio backend running on http://localhost:${PORT}`);
    console.log('Database: SQLite');
  });
}).catch(err => {
  console.error('Failed to initialize database:', err);
  process.exit(1);
});