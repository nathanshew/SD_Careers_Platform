import express, { NextFunction, Request, Response} from 'express';
import applicantRoutes from './routes/applicant';
import applicationRoutes from './routes/application'
import adminRoutes from './routes/admin';
import jobRoutes from './routes/job';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);
const HOST = process.env.HOST || "localhost";

app.use(cors());
app.use(express.json());
app.use('/applicant', applicantRoutes);
app.use('/admin', adminRoutes);
app.use('/job', jobRoutes);
app.use('/application', applicationRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript Express!');
});

// Add this error handling middleware
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong');
});

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});