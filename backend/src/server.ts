import express from 'express';
import { sql } from 'kysely';
import { db } from './db/index.js';

const app = express();

app.use(express.json());

app.get('/api/health', async (_req, res) => {
  try {
    await sql`SELECT 1`.execute(db);

    res.json({
      status: 'ok',
      database: 'connected',
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      status: 'error',
      database: 'disconnected',
    });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`PennyWise backend running on http://localhost:${PORT}`);
});
