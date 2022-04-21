/* Setup Express */
const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// load enviroment variables
dotenv.config({ path: './config/config.env' });

//Connect to Database
connectDB();


//Setting up Express
const app = express();

//Set static folder | Letting know Node know where our front end files are
app.use(express.static(path.join(__dirname, 'public')));

// Body parser
app.use(express.json());

// Enable cors
app.use(cors());

// Routes
app.use('/api/v1/stores', require('./routes/stores'));




//app.listen(5000, '0.0.0.0')

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);