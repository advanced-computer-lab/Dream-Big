const express = require("express");
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const Users = require('./models/Users');
const session = require('express-session');// session middleware
const { v4: uuidv4 } = require('uuid');
const passport = require('passport');// authentication
dotenv.config()

const MongoURI = process.env.Mongo_URI

const port = process.env.PORT || "8000";

const flightCont = require('./Controllers/flightController');
const userCont = require('./Controllers/userController');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true})
.then(result =>console.log("MongoDB is now connected") )
.catch(err => console.log(err));

app.use(session({
  genid: function (req) {
    return uuidv4();
  },
  secret: process.env.Session_Secret,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000, secure: true }
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(Users.createStrategy());

passport.serializeUser(Users.serializeUser());
passport.deserializeUser(Users.deserializeUser());

app.use('/flights',flightCont);
app.use('/user',userCont);

app.get('/',(req,res) => {
  res.send('Welcome');
})

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});
 