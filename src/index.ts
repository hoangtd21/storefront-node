import express, { Request, Response } from 'express';
import { client } from './database';

const app: express.Application = express();
const PORT = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from app');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
