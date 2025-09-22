import express from 'express';
import dotenv from 'dotenv'
dotenv.config();
import connectdb from './config/db.js';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js';
import cors from 'cors'

const app = express()

app.use(cors({
    origin:"http://localhost:5173", credentials:true
}))


const port =process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser())
app.use('/api/auth',authRouter)

app.listen(port, ()=>{
    connectdb()
console.log(`Server is running ${port}`)
} )