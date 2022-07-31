require('dotenv').config()
import Login from '../project5_frontend/src/userContainer/loginComponent/loginComponent';
const { urlencoded } = require('express');
const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const User = require('./models/users')
const morgan = require('morgan')
const app = express();
const session = require('express-session');
const isLoggedIn = require('../middleware/isLoggedIn')
const itemController = require("./controllers/itemController")
const usersController = require("./controllers/usersController");
const { default: Login } = require('../project5_frontend/src/userContainer/loginComponent/loginComponent');

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
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));


app.use('/users', usersController)
app.use('/items', isLoggedIn, itemController);
app.get('/login', (req, res) => {
    res.render(props.Login)
})


const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log('app is running')
})
