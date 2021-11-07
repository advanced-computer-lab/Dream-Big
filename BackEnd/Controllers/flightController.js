const router = require('express').Router();
let Flights = require('../models/Flights');

router.route('/getAllFlights').get(async(req, res) => {
  const flights = await Flights.find()
    try{
        res.send(flights);
    }
    catch(err){
        res.status(500).send(err);
    }
 });

 router.get('/FlightDetails/:id',async(req, res) => {
  console.log('id', req.params.id)
    try{
      const id = req.params.id;
      const flights = await Flights.findById(id)
        console.log(flights);
        res.send(flights);
    }
    catch(err){
        res.status(500).send(err)
    }
 });

 router.route('/getSearchedFlights').get(async(req, res) => {
  const flights = await Flights.find(req.query)
  try{
      res.send(flights)
  }
  catch(err){
      res.status(500).send(err);
  }
}
);

 router.patch('/:id', async (req, res, next) => {
   try{
     const id = req.params;
     const toUpdate = req.body.updatedFlights;
     console.log(toUpdate);
     const result = await Flights.findByIdAndUpdate({ _id: req.params.id }, toUpdate, { new: true });
     res.send(result);
   }
   catch(err){
     console.log(err.message);
   }
 });

 router.post('/createFlight',async(req, res) => {
  const flight =new Flights( req.body);
  try{
      await flight.save();
  }
  catch(err)
  {
      console.log("ERRORR");
      res.status(500).send(err)
  }
 });

module.exports = router;