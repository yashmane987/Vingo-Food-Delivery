import express from 'express';
import dotenv from 'dotenv'
import connectdb from './config/db.js';
dotenv.config();
const app = express()

const port =process.env.PORT || 5000;

app.listen(port, ()=>{
    connectdb()
console.log(`Server is running ${port}`)
} )