import express from 'express';
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.route.js';
import cors from "cors";

dotenv.config();

const app = express();

const DB = process.env.URI;
const PORT = process.env.PORT;

const connect = mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log("Connection successful");
  }).catch((err) => console.error("Connection failed", err));

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  });

app.use('/api/user', userRouter); 

app.use((err, req, res, next) =>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
      success:false,
      statusCode,
      message, 
    });
  })
