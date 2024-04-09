const express = require('express');
const dotenv = require('dotenv');
var bodyParser = require("body-parser");
const cors = require('cors');
const mongoose = require('mongoose');
const RouterUser = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const PORT = 8000;
const app = express();

app.use(bodyParser.json({limit: "50mb"}));
app.use(cookieParser())
app.use(express.urlencoded({extends: false}))
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true // Make sure to include this if you're sending cookies or authentication headers
  }));
dotenv.config();
// 
mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log('Database connected successfully!'))
.catch((err) =>  console.log('Database not connected!', err));
//
app.use('/', RouterUser);


app.listen(PORT,()=> console.log(`server is running on port ${PORT}`))