const express = require("express");
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const Users = require('./models/Users');
const session = require('express-session');// session middleware
const { v4: uuidv4 } = require('uuid');
const passport = require('passport');// authentication
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client('989878519962-v9maq3qp1rr9cm265k1ar4nvft5hcrag.apps.googleusercontent.com');
dotenv.config()

//const Stripe = require('stripe');
const stripe = require('stripe')('sk_test_51K8Gt8JB7TR08zEVSXWAbJdwsl6776ujRtQzlhz8NohOLa5GSf7mcA0JpiIk2HAmnfCQvrPOZjcQg3IVvyPt54s700Vwnv2yoA');
//const stripe = Stripe(process.env.secretKey);

const MongoURI = process.env.Mongo_URI

const port = process.env.PORT || "8000";

const flightCont = require('./Controllers/flightController');
const userCont = require('./Controllers/UserController');
const { response } = require("express");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => console.log("MongoDB is now connected"))
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

app.use('/flights', flightCont);
app.use('/user', userCont);
app.use('/users', userCont);

app.get('/', (req, res) => {
  res.send('Welcome');
})

app.post('/Payment', async (req, res) => {
  const customer = await stripe.customers.create({
    customer: req.body.body.user.name,
    email: req.body.body.user.email,
    description: `Flight ${req.body.body.flightNumber} Reservation`
  })
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'egp',
          product_data: {
            name: req.body.body.flightNumber,
          },
          unit_amount: req.body.body.price,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'https://example.com/success',
    cancel_url: 'https://example.com/cancel',
  });
  res.redirect(303, session.url);
});

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
