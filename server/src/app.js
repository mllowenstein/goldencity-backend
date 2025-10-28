import express from 'express';
import bodyParser from 'body-parser';
import notesRouter from './routes/notesRoutes.js';
import errorMiddleware from './middlewares/error/index.js';

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Request logging middleware (development)
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });
}

// app.use('/api/user', userRouter);
app.use('/api/notes', notesRouter);

// Health Check Route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Notes API is running!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// Root Route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to Notes API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      notes: '/api/notes',
    },
  });
});

// 404 Handler - must be before error middleware
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    error: `Route ${req.originalUrl} not found`,
  });
});

// Error Middleware (must be last)
app.use(errorMiddleware);

export default app;
