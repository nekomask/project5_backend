require('dotenv').config()
const { urlencoded } = require('express');
const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const morgan = require('morgan')
const app = express();
const session = require('express-session');
const itemController = require("./controllers/itemController")

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/karolin_mongoose_store'

//Connect to Mongo
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true},
    () => console.log('MongoDB connection established:', mongoURI)
)
// Error / Disconnection
const db = mongoose.connection
db.on('error', err => console.log(err.message + ' is Mongod not running?'))
db.on('disconnected', () => console.log('mongo disconnected'))

app.use(morgan('short'))
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
   
}));

app.use('/items', itemController);
const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log('app is running')
})
