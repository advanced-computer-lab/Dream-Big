const router = require('express').Router();
let Users = require('../models/Users');
let Flights = require('../models/Flights');

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client('989878519962-v9maq3qp1rr9cm265k1ar4nvft5hcrag.apps.googleusercontent.com');
const passport = require('passport');

router.route('/login').post(async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) {
      console.log("Unsuccessfully Authenticated");
      res.send({})
    }
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        console.log("Successfully Authenticated");
        res.send(req.user);
      })
    }
  })(req, res, next);
});

router.post("/google/login", async (req, res) => {
  
  console.log(req.body.token, " req body token ");
  const ticket = await client.verifyIdToken({
    idToken: req.body.token,
    audience: process.env.CLIENT_ID
  });
  const { email } = ticket.getPayload();
  const user = Users.findOne({ Email: email })
  console.log(user);
  if (!user) {
    console.log("Unsuccessfully Authenticated");
    res.send({})
  }
  else {
    req.logIn(user, (err) => {
      if (err) throw err;
      console.log("Successfully Authenticated");
      console.log(user, "user");
      res.send(user);
    })
  }
  res.status(200)
})

router.route('/changePassword').post(async function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    Users.findById(req.body.id)
      .then(userChosen => {
        userChosen.changePassword(req.body.password, req.body.newPassword, function (err, user) {
          if (err) {
            console.log(err);
            res.json('Error Changing Password');
            res.send(err);
          } else
            res.send('Password Changed successfully !');
        })
      })
  })(req, res, next);
});

router.route('/getUsers').get(async (req, res) => {
  const user = await Users.find({})
  try {
    res.send(user);
  }
  catch (err) {
    res.status(500).send(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const toUpdate = req.body.newList;
    const result = await Users.findByIdAndUpdate(req.params.id, { ReservedFlights: toUpdate }, { new: true });
    await Users.save;
    console.log(result)
    res.send(result);
  }
  catch (err) {
    console.log(err.message);
  }
});

router.get('/:id/getReservedFlights', async (req, res, next) => {
  try {
    console.log(req.params.id)
    const result = await Users.findById(req.params.id);

    res.send(result);

  }
  catch (err) {
    console.log(err.message);
  }
});

router.post('/getUserSearch', async (req, res) => {
  try {
    const flights = await Flights.find(req.body);

    console.log("FLIGHTSSS", flights);
    res.send(flights);

  }
  catch (err) {
    console.log("ERRORR");
    res.status(500).send(err)
  }
});

router.get('/UserDetails/:id', async (req, res) => {
  console.log('id', req.params.id)
  try {
    const id = req.params.id;
    const users = await Users.findById(id).populate('ReservedFlights')
    console.log(users);
    res.send(users);
  }
  catch (err) {
    res.status(500).send(err)
  }
});

router.put('/users/:id', async (req, res, next) => {
  console.log('updatteeeeeee')
  try {
    const toUpdate = req.body.updateReservedFlights;
    console.log('upddd', toUpdate)
    const result = await Users.findByIdAndUpdate(req.params.id, { ReservedFlights: toUpdate }, { new: true });
    await Users.save;
    res.send(result);
  }
  catch (err) {
    console.log(err.message);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const toUpdate = req.body.toBeUpdatedInUser;
    const result = await Users.findByIdAndUpdate(req.params.id, toUpdate, { new: true });
    await Users.save;
    console.log(result)
  }
  catch (err) {
    console.log("ERRORR");
    res.status(500).send(err)
  }
});


module.exports = router;