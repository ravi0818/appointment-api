import express, { Request, Response } from 'express';

import cors from 'cors';
import mongoose from 'mongoose';

import { dbConfig } from './config/dbConfig';
import routes from './routes';

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      userRole?: string;
    }
  }
}

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use(cors());

mongoose
  .connect(dbConfig.uri)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Define a basic route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

app.use('/api', routes);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
