const router = require('express').Router();
let Users = require('../models/Users');
let Flights = require('../models/Flights');
const passport = require('passport');
const nodemailer = require('nodemailer');
const fs = require('fs');
var inLineCss = require('nodemailer-juice');
var pdf = require('html-pdf');
var html = fs.readFileSync('C:/Users/Omar Galal/Desktop/ACL_Project/Dream-Big/BackEnd/ItineraryTemplate/intinerary.html', 'utf8');

let mailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'safeescape9@gmail.com',
      pass: 'safeescape54321'
  }
});

mailTransporter.use('compile', inLineCss());

const sendEmail = async(source) => {
  let mailDetails = {
    from: 'safeescape9@gmail.com',
    to: 'oelhanafy12@gmail.com',
    subject: 'Your Reserved Trip',
    text: 'Node.js testing mail for GeeksforGeeks',
    html: `
    <!DOCTYPE html><html lang="en"><head><meta charset="utf-8" /><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1"><link href="images/favicon.png" rel="icon" /><title>Safe Escape</title><meta name="author" content="harnishdesign.net"></head><body><!-- Container --><div class="container-fluid itinerary-container"> <!-- Header --> <header> <div class="row align-items-center"> <div class="col-sm-5 text-center text-sm-right"> <h4 class="text-7 mb-0">Flight Itinerary</h4> </div> </div> <hr class="my-4"> </header> <!-- Header End --> <!-- Main Content --> <main style = 'display: flex; width: 100%;'> <div style = 'border: 1px solid wheat;'> <div class="col-sm-4"> <strong class="font-weight-600">Full Name:</strong> <p>Smith Rhodes</p> <strong class="font-weight-600">Email:</strong> <p>info.smith@example.com</p> </div> <div class="col-sm-4"> <strong class="font-weight-600">Purpose of Travel:</strong> <p>Business Travel</p> <strong class="font-weight-600">Reservation Id:</strong> <p>ZX4556WS24613</p> </div> <div class="col-sm-4"> <strong class="font-weight-600">Address:</strong> <address> 15 Hodges Mews,<br> High Wycombe, HP12 3JL<br> United Kingdom </address> </div> </div> <div class="card" style = 'border: 1px solid wheat;'> <div class="card-header"> <div class="row align-items-center trip-title"> <div class="col-5 col-md-auto text-center text-md-left"> <h5 class="m-0">New Delhi (DEL)</h5> </div> <div class="col-2 col-md-auto text-8 text-black-50 text-center trip-arrow">➝</div> <div class="col-5 col-md-auto text-center text-md-left"> <h5 class="m-0">Sydney (SYD)</h5> </div> <div class="col-12 col-md-auto text-3 text-dark text-center mt-2 mt-md-0 ml-md-auto">15 Jun 21, Sat</div> </div> </div> <div class="card-body"> <div class="row"> <div class="col-12 col-sm-3 text-center company-info"> <span class="text-4 font-weight-500 text-dark mt-1 mt-lg-0">IndiGo</span> <span class="text-muted d-block">6E-2726</span></div> <div class="col-12 col-sm-3 text-center time-info mt-3 mt-sm-0"> <span class="text-5 font-weight-500 text-dark">01:50</span> <span class="text-muted d-block">Departure</span> </div> <div class="col-12 col-sm-3 text-center time-info mt-3 mt-sm-0"> <span class="text-4 font-weight-500 text-dark">26h 18m</span> <span class="text-muted d-block">Duration</span> </div> <div class="col-12 col-sm-3 text-center time-info mt-3 mt-sm-0"> <span class="text-5 font-weight-500 text-dark">19:38</span> <span class="text-muted d-block">Arrival</span> </div> </div> <hr> <div class="row"> <div class="col-sm-4"><strong class="font-weight-600">Class of Service:</strong> <p>Economy</p> </div> <div class="col-sm-4"><strong class="font-weight-600">Confirmation Code:</strong> <p>#MG245C</p> </div> <div class="col-sm-4"><strong class="font-weight-600">Confirmation Status:</strong> <p><span class="badge badge-success py-1 px-2 font-weight-normal">Confirmed <i class="fas fa-check-circle"></i></span></p> </div> </div> <hr class="mt-1"> <div class="row"> <div class="col-sm-6"> <strong class="font-weight-600">Airport Info:</strong> <p class="mb-0">Indira Gandhi Intl,<br> New Delhi<br> Terminal 2 </p> <div class="d-flex align-items-center m-0"> <hr class="flex-grow-1 my-2"> <span class="mx-2">to</span> <hr class="flex-grow-1 my-2"> </div> <p class="mb-sm-0">Kingsford Smith Airport,<br> Sydney<br> Terminal 1 </div> <div class="col-sm-6"> <strong class="font-weight-600">Flight Info:</strong><br> <p>Boeing 777-200<br> Breakfast, Meal </p> </div> </div> </div> </div> <div > <div class="card mt-4" style = 'border: 1px solid wheat;'> <div class="card-header"> <div class="row align-items-center trip-title"> <div class="col-5 col-md-auto text-center text-md-left"> <h5 class="m-0">Sydney (SYD)</h5> </div> <div class="col-2 col-md-auto text-8 text-black-50 text-center trip-arrow">➝</div> <div class="col-5 col-md-auto text-center text-md-left"> <h5 class="m-0">New Delhi (DEL)</h5> </div> <div class="col-12 col-md-auto text-3 text-dark text-center mt-2 mt-md-0 ml-md-auto">20 Jun 21, Thu</div> </div> </div> <div class="card-body"> <div class="row"> <div class="col-12 col-sm-3 text-center company-info"> <span class="text-4 font-weight-500 text-dark mt-1 mt-lg-0">JetAirways</span> <span class="text-muted d-block">6E-2726</span></div> <div class="col-12 col-sm-3 text-center time-info mt-3 mt-sm-0"> <span class="text-5 font-weight-500 text-dark">02:30</span> <span class="text-muted d-block">Departure</span> </div> <div class="col-12 col-sm-3 text-center time-info mt-3 mt-sm-0"> <span class="text-4 font-weight-500 text-dark">26h 18m</span> <span class="text-muted d-block">Duration</span> </div> <div class="col-12 col-sm-3 text-center time-info mt-3 mt-sm-0"> <span class="text-5 font-weight-500 text-dark">20:18</span> <span class="text-muted d-block">Arrival</span> </div> </div> <hr> <div class="row"> <div class="col-sm-4"><strong class="font-weight-600">Class of Service:</strong> <p>Economy</p> </div> <div class="col-sm-4"><strong class="font-weight-600">Confirmation Code:</strong> <p>#EM319W</p> </div> <div class="col-sm-4"><strong class="font-weight-600">Confirmation Status:</strong> <p><span class="badge badge-success py-1 px-2 font-weight-normal">Confirmed <i class="fas fa-check-circle"></i></span></p> </div> </div> <hr class="mt-1"> <div class="row"> <div class="col-sm-6"> <strong class="font-weight-600">Airport Info:</strong> <p class="mb-0">Kingsford Smith Airport,<br> Sydney<br> Terminal 1 </p> <div class="d-flex align-items-center m-0"> <hr class="flex-grow-1 my-2"> <span class="mx-2">to</span> <hr class="flex-grow-1 my-2"> </div> <p class="mb-sm-0">Indira Gandhi Intl,<br> New Delhi<br> Terminal 2 </div> <div class="col-sm-6"> <strong class="font-weight-600">Flight Info:</strong><br> <p>Boeing 767-300<br> Breakfast, Meal</p> </div> </div> </div> </div> </div> </main> <!-- Main Content End --> <!-- Footer --> <footer class="text-center mt-3"> <p><strong>Safe Escape</strong><br> 4th Floor, Plot No.22, Above El Brens, 145 Bolaq Rd,<br> Suite 100-18, Qahira EG 2028. </p> <hr> <p class="text-1"><strong>NOTE :</strong> This is computer generated receipt and does not require physical signature.</p> <div class="btn-group btn-group-sm d-print-none"> <a href="javascript:window.print()" class="btn btn-light border text-black-50 shadow-none"><i class="fa fa-print"></i> Print</a> <a href="" class="btn btn-light border text-black-50 shadow-none"><i class="fa fa-download"></i> Download</a> </div> </footer> <!-- Footer End --> </div><!-- Container End --> </body></html>
    `
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

router.route('/sendEmail').get(async (req,res) => {
  pdf.create(html).toFile('./businesscard.pdf', function(err, res) {
    if (err) return console.log(err);
    console.log(res); // { filename: '/app/businesscard.pdf' }
  });
  //sendEmail(fs.readFileSync('C:/Users/Omar Galal/Desktop/ACL_Project/Dream-Big/BackEnd/ItineraryTemplate/intinerary.html', 'utf8'));
})

router.route('/updatereservedtrip').patch(async (req,res) => {
  console.log('reservedddd')
  try {
    const toUpdate = req.body.updatedFlights;
    console.log('upddd',toUpdate)
    const user = await Users.findById(req.body.userId);
    console.log('userr', user.ReservedFlights)

    let newReservedFlights = user.ReservedFlights;
    newReservedFlights[req.body.index][req.body.flightType].FirstSeats = toUpdate.flight.FirstSeats;
    newReservedFlights[req.body.index][req.body.flightType].BusinessSeats = toUpdate.flight.BusinessSeats;
    newReservedFlights[req.body.index][req.body.flightType].EconomySeats = toUpdate.flight.EconomySeats;
    if(req.body.flightType === 'Departure'){
      newReservedFlights[req.body.index]['depPassengerInfo'] = toUpdate.depPassengerInfo;
    }
    else{
      newReservedFlights[req.body.index]['retPassengerInfo'] = toUpdate.depPassengerInfo;
    }
    console.log('new list ',newReservedFlights)
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
  console.log(req.body);
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



router.route('/getUsers').get(async (req, res) => {
  const Users = await Users.find({})
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
  //const flight =new Flights( req.body);
  try {
    //await flight.save();
    console.log("Searchhh", req.body);
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
    console.log('upddd',toUpdate)
    const result = await Users.findByIdAndUpdate(req.params.id, { ReservedFlights: toUpdate }, { new: true });
    await Users.save;
    res.send(result);
  }
  catch (err) {
    console.log(err.message);
  }
});




module.exports = router;