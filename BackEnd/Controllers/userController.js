const router = require('express').Router();
let Flights = require('../models/Flights');
let Users = require('../models/Users');



//  router.route('/getSearchedFlights').get(async(req, res) => {
//   const flights = await Flights.find(req.query)
//   try{
//       res.send(flights)
//   }
//   catch(err){
//       res.status(500).send(err);
//   }
// }
// );

//FILTER
 router.post('/getUserSearch',async(req, res) => {
  //const flight =new Flights( req.body);
  try{
      //await flight.save();
      const flights = await Flights.find(req.body);
      
      console.log("FLIGHTSSS",flights);
      res.send(flights);
      
  }
  catch(err)
  {
      console.log("ERRORR");
      res.status(500).send(err)
  }
 });

//UPDATE USER
// router.put('/:id', async (req, res, next) => {
//     try{
//       const id = req.params;
//       const toUpdate = req.body.toBeUpdatedInUser;
//       console.log(toUpdate);
//       const result = await Users.findByIdAndUpdate(req.params.id , {toUpdate:toUpdate}, { new: true });
//       console.log(result);
//       res.send(result);
//     }
//     catch(err){
//       console.log(err.message);
//     }
//   });
router.put('/:id', async (req, res, next) => {
  try {
    const toUpdate = req.body.toBeUpdatedInUser;
    const result = await Users.findByIdAndUpdate( req.params.id , toUpdate, { new: true });
    await Users.save;
    console.log(result)
    res.send(result);
  }
  catch (err) {
    console.log(err.message);
  }
});



module.exports = router;
//{$gte : req.body.numberOfPassengers}