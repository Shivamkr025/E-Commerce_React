import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import RouterFile from './router/userRouter.js';

const app = express()
const PORT = 6052

app.use(express.json())
app.use(cookieParser())
app.use('/', RouterFile)

mongoose.connect('mongodb://localhost:27017/E-Commerce_Project')
    .then(() => {
        console.log('successfully connect mongodb...');
    }).catch((error) => {
        console.log(error);
    })

app.listen(PORT, ()=>{
    console.log(`Server running at http://localhost:${PORT}`);
    
})