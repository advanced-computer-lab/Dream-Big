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
 })

module.exports = router;