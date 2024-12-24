import express, { NextFunction, Request, Response} from 'express';
import applicantRoutes from './routes/applicant.js';
import applicationRoutes from './routes/application.js'
import adminRoutes from './routes/admin.js';
import jobRoutes from './routes/job.js';
import authRoutes from './routes/auth.js';
import assert from 'assert';
import dotenv from 'dotenv';
import cors from 'cors';

// Assertions for type safety
assert(process.env.PORT, "Environment variable PORT must be defined.");
assert(process.env.HOST, "Environment variable HOST must be defined.");

// Declarations & Configurations
dotenv.config();
const app = express();
const PORT = parseInt(process.env.PORT, 10);
const HOST = process.env.HOST;

// Handling middleware errors
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
  if (err.name === 'UnauthorizedError') {
    // Handle authentication errors (e.g., invalid or missing token)
    console.error('Authentication error:', err.message);
    res.status(401).json({ error: err.message });
  }
  // Handle other types of errors
  console.error(err.stack);
  res.status(500).send('Something went wrong');
});

// Routes
app.use(cors());
app.use(express.json());
app.use('/applicant', applicantRoutes);
app.use('/admin', adminRoutes);
app.use('/job', jobRoutes);
app.use('/application', applicationRoutes);
app.use('/auth', authRoutes);

// Test Route
app.get('/', (_req: Request, res: Response) => {
  res.send('Hello, TypeScript Express!');
});

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});