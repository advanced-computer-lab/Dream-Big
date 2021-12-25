const router = require('express').Router();
let Users = require('../models/Users');
let Flights = require('../models/Flights');

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client('989878519962-v9maq3qp1rr9cm265k1ar4nvft5hcrag.apps.googleusercontent.com');
const passport = require('passport');
const nodemailer = require('nodemailer');
const fs = require('fs');
var inLineCss = require('nodemailer-juice');
const puppeteer = require('puppeteer');
const hbs = require('handlebars');


let mailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'safeescape9@gmail.com',
      pass: 'safeescape54321'
  }
});

mailTransporter.use('compile', inLineCss());

const sendEmail = async(email) => {
console.log('email', email)
  let mailDetails = {
    from: 'safeescape9@gmail.com',
    to: email,
    subject: 'Your Reserved Trip',
    text: 'Your Reserved Itinerary',
    attachments: [{
      filename: 'doc.pdf',
      path: 'C:/Users/Omar Galal/Desktop/ACL_Project/Dream-Big/BackEnd/doc.pdf',
      contentType: 'application/pdf'
    }]
  };
  await mailTransporter.sendMail(mailDetails, function(err, data) {
    if(err) {
        console.log('Error Occurs');
        res.send('ERROOORRRR');
    } else {
        console.log('Email sent successfully');
        res.send('SUCCESSSS')
    }});
}

router.route('/sendEmail').post(async (req,res) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const content = await hbs.compile(fs.readFileSync('C:/Users/Omar Galal/Desktop/ACL_Project/Dream-Big/BackEnd/ItineraryTemplate/intinerary.hbs', 'utf8'))
  await page.addStyleTag({
    path: 'C:/Users/Omar Galal/Desktop/ACL_Project/Dream-Big/BackEnd/ItineraryTemplate/bootstrap.min.css'
  })
  await page.addStyleTag({
    path: 'C:/Users/Omar Galal/Desktop/ACL_Project/Dream-Big/BackEnd/ItineraryTemplate/style.css'
  })
  await page.addScriptTag({
    path: 'C:/Users/Omar Galal/Desktop/ACL_Project/Dream-Big/BackEnd/ItineraryTemplate/bootstrap.min.js'
  })
  await page.setContent(content({
    depTrip: {...req.body.trip.Departure},
    retTrip: {...req.body.trip.Return},
    trip: {...req.body.trip},
    user: {...req.body.user}
  }))
  await page.emulateMediaType('screen');
  await page.pdf({
    path: './doc.pdf',
    format: 'a3',
    printBackground: true
  })
  console.log('done')
  await browser.close();
  await sendEmail(req.body.email);
  res.send('Ok');
})

router.route('/updatereservedtrip').patch(async (req,res) => {
  console.log('reservedddd')
  try {
    const toUpdate = req.body.updatedFlights;
    console.log('upddd',toUpdate)
    const user = await Users.findById(req.body.userId);
    console.log('userr', user.ReservedFlights)
    let newReservedFlights = user.ReservedFlights;
    if(req.body.statusPath){
      newReservedFlights[req.body.index][req.body.flightType].FirstSeats = toUpdate.flight.FirstSeats;
      newReservedFlights[req.body.index][req.body.flightType].BusinessSeats = toUpdate.flight.BusinessSeats;
      newReservedFlights[req.body.index][req.body.flightType].EconomySeats = toUpdate.flight.EconomySeats;
      if(req.body.flightType === 'Departure'){
        newReservedFlights[req.body.index]['depPassengerInfo'] = toUpdate.depPassengerInfo;
      }
      else{
        newReservedFlights[req.body.index]['retPassengerInfo'] = toUpdate.depPassengerInfo;
      }
      console.log('new list first',newReservedFlights)
    }
    else{
      newReservedFlights[req.body.index][req.body.flightType] = toUpdate
    }
    const result = await Users.findByIdAndUpdate(req.body.userId, { ReservedFlights: newReservedFlights }, { new: true });
    console.log('new userr ',result)
    await Users.save;
    res.send(result);
  }
  catch (err) {
    console.log(err.message);
  }
})

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

router.put('/userInfo/:id', async (req, res, next) => {
  try {
    const toUpdate = req.body.toBeUpdatedInUser;
    console.log('reqqq', toUpdate)
    console.log('idd', req.params.id)
    const result = await Users.findByIdAndUpdate(req.params.id, toUpdate, { new: true });
    await Users.save;
    console.log('Result',  result)
    res.send(result)
  }
  catch (err) {
    console.log("ERRORR");
    res.status(500).send(err)
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




module.exports = router;