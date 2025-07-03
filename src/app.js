require('dotenv').config();
const express = require('express');
const connectionDB = require('./config/database');
const app = express();
const cokkieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');


app.use(cors({
    origin: "http://localhost:5173",
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true
}));
app.use(express.json());    // middleware to parse JSON request bodies
app.use(cokkieParser());   // middleware to parse cookies

const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');
const userRouter = require('./routes/user');

app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requestRouter);
app.use('/', userRouter);


connectionDB().then(() => {
    console.log('Database connected successfully');
    app.listen(7777, () => {
        console.log('Server is running on port 7777');
    });
}).catch(err => {
    console.error('Database connection failed:', err);
})