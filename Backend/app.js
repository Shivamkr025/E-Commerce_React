import express from 'express';
import mongoose from 'mongoose';
import RouterFile from './router/shopRouter.js';

const app = express()
const PORT = 6052

app.use(express.json())
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