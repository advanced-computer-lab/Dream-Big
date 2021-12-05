const router = require('express').Router();
const mongoose = require('mongoose');
const Users = require('./models/Users');
const dotenv = require('dotenv');
dotenv.config();
const MongoURI = process.env.Mongo_URI;

mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true})
.then(result =>console.log("MongoDB is now connected") )
.catch(err => console.log(err));

const seed = async() => {
    const User = new Users({username: 'slim', Email: 'slim@gmail.com'})
    const registeredUser = await Users.register(User, 'ostorhaaa');
    console.log('User', registeredUser);
}


const seed2 = async() => {
    const User = new Users({username: 'engy', Email: 'engy@gmail.com'})
    const registeredUser = await Users.register(User, 'password');
    console.log('User', registeredUser);
}
seed2();


