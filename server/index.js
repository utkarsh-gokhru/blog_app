import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { userAuth } from './routes/auth.js';
import dotenv from 'dotenv';

const app = express();

app.use(cors());
app.use(express.json());
dotenv.config();

const db_url = process.env.DATABASE_URL;
mongoose.connect(db_url)
.then(() => {
    console.log('DB connected!');
})
.catch((err) => {
    console.log(`DB conection failed: ${err}`);
})

app.use("/auth",userAuth);

const port = process.env.PORT;
app.listen(port,() => console.log('Server started'));