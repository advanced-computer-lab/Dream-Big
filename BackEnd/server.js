const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors')

const dotenv = require('dotenv')
dotenv.config()

const MongoURI = process.env.Mongo_URI

const app = express();
const port = process.env.PORT || "8000";
const Flights = require('./models/Flights');

const flightCont = require('./Controllers/flightController');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => console.log("MongoDB is now connected"))
  .catch(err => console.log(err));

app.use('/flights', flightCont);

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
