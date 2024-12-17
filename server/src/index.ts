import express, { Request, Response} from 'express';
import session from 'express-session';
import applicantRoutes from './routes/applicant';
import applicationRoutes from './routes/application'
import adminRoutes from './routes/admin';
import jobRoutes from './routes/job';
import authRoutes from './routes/auth';
import assert from "assert";
import dotenv from 'dotenv';

// Extend SessionData inline
declare module 'express-session' {
  interface SessionData {
    code_verifier?: string;
    state?: string;
  }
}

// Assertions for type safety
assert(process.env.PORT, "Environment variable PORT must be defined.");
assert(process.env.HOST, "Environment variable HOST must be defined.");
assert(process.env.SESSION_SECRET, "Environment variable SESSION_SECRET must be defined.");

// Declarations & Configurations
dotenv.config();
const app = express();
const PORT = parseInt(process.env.PORT, 10);
const HOST = process.env.HOST;
const SESSION_SECRET = process.env.SESSION_SECRET;

app.use(express.json());
app.use('/applicant', applicantRoutes);
app.use('/admin', adminRoutes);
app.use('/job', jobRoutes);
app.use('/application', applicationRoutes);
app.use('/auth', authRoutes);

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello, TypeScript Express!');
});


// Configure session middleware
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Set to true in production
  })
);

// Handling middleware errors
app.use((err: any, _req: Request, res: Response) => {
  if (err.name === 'UnauthorizedError') {
    // Handle authentication errors (e.g., invalid or missing token)
    console.error('Authentication error:', err.message);
    res.status(401).json({ error: err.message });
  }
  // Handle other types of errors
  console.error(err.stack);
  res.status(500).send('Something went wrong');
});

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});