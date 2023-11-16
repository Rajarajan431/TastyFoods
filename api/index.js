import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRouter from './routes/authRoutes.js'
dotenv.config()

const app = express()

mongoose.connect(process.env.MONGODB)
.then(() => {
    console.log("Connected to MongoDB")
})
.catch((err) => {
    console.log(err);
})

app.use(express.json())

app.use('/api/auth', authRouter)

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})

app.use(( err, req, res, next ) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});