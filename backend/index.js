const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const session = require('express-session');

const app = express();


mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log('MongoDB connected'))
.catch(err=>console.log('MongoDB connection error:', err));



app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})