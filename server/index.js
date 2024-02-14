import express from 'express';
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.route.js';

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

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  });

app.use('/api/user', userRouter); 
