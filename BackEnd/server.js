const express = require("express");
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv')
dotenv.config()

const MongoURI = process.env.Mongo_URI

const port = process.env.PORT || "8000";

const flightCont = require('./Controllers/flightController');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true})
.then(result =>console.log("MongoDB is now connected") )
.catch(err => console.log(err));

app.use('/flights',flightCont);

app.get('/',(req,res) => {
  res.send('Welcome');
})

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });
