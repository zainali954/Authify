import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import connectDB from './db/connectDB.js';

const port = process.env.port
connectDB().
then(()=>{
    app.listen(port, ()=> console.log(`Server running on port ${port}`))
})
