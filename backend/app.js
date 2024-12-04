import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js'
import adminRoutes from './routes/admin/admin.routes.js'
import apiResponse from './utils/apiResponse.js';

const app = express();

// Middleware to parse JSON
app.use(express.json());


app.use(cors({
    origin : process.env.CLIENT_URL,
    credentials : true
}))
// Middleware to parse cookies
app.use(cookieParser());

// Registering routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/admin', adminRoutes)

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err); // Log the error for debugging
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    apiResponse.error(res, message, {}, statusCode);
});

export default app;
