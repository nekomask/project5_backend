require('dotenv').config()
const jwt = require('jsonwebtoken');
const { urlencoded } = require('express');
const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const User = require('./models/users')
const morgan = require('morgan')
const app = express();
const session = require('express-session');
//const isLoggedIn = require('./middleware/isLoggedIn')
const jwtMiddleware = require('./middleware/jsonwebtokenMiddleware');
const itemController = require("./controllers/itemController")
const usersController = require("./controllers/usersController");
const loginController = require('./controllers/loginController');
const logoutController = require('./controllers/logoutController');

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
app.use(cors({
    origin: ["http://localhost:3000", "https://mybikedatabase.up.railway.app", "https://mybikedatabase-backend.up.railway.app", "https://my-bike-database-backend.onrender.com", "https://my-bike-database.onrender.com"],
    credentials: true
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));



app.use('/items', jwtMiddleware, itemController);
app.use('/login', loginController);
app.use('/logout', logoutController);
app.use('/users', usersController)


app.get('/verifyToken', (req, res) => {
    const token = req.headers.authorization?.replace(/^Bearer /, '');
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      res.json({ message: 'Token is valid' });
    });
  });
  

const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log(`app is running on port ${port}`)
    console.log(process.env.ORIGIN_HEADERS)
})
