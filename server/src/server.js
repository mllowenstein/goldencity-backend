
import app from './app.js';
import dotenv from 'dotenv';
import cloudinary from  'cloudinary';
import connectDatabase from './config/database.js';

const PORT = process.env.PORT || 3099;

// UncaughtException Error

// Handle Uncaught Exceptions
process.on('uncaughtException', (err) => {
    console.error('❌ UNCAUGHT EXCEPTION! Shutting down...');
    console.error('Error:', err.name, err.message);
    console.error('Stack:', err.stack);
    process.exit(1);
  });

// connectDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Start Server
const server = app.listen(PORT, () => {
  console.log('\n' + '='.repeat(50));
  console.log('--> Server is running!');
  console.log('='.repeat(50));
});

// Handle Unhandled Promise Rejections
process.on('unhandledRejection', (err) => {
  console.error('❌ UNHANDLED REJECTION! Shutting down...');
  console.error('Error:', err.name, err.message);
  
  server.close(() => {
    process.exit(1);
  });
});

// Graceful Shutdown
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM received. Shutting down gracefully...');
  
  server.close(() => {
    console.log('✅ Process terminated!');
  });
});
