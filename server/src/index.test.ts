import request from 'supertest';
import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.get('/api', (_req: Request, res: Response) => {
    res.json({ message: 'Hello from the backend!' });
});

describe('GET /api', () => {
  it('responds with JSON', async () => {
    const res = await request(app).get('/api');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Hello from the backend!');
  });
});
