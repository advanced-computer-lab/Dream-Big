const router = require('express').Router();
let Flights = require('../models/Flights');

router.route('/getAllFlights').get(async (req, res) => {
  const flights = await Flights.find()
  try {
    //console.log(flights);
    res.send(flights);
  }
  catch (err) {
    res.status(500).send(err);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const toUpdate = req.body;
    console.log(toUpdate);
    const result = await Flights.findByIdAndUpdate({ _id: req.params.id }, toUpdate, { new: true });
    console.log(result);
    res.send(result);
  }
  catch (err) {
    console.log(err.message);
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await Flights.findByIdAndDelete({ _id: req.params.id }, { new: true });
    console.log(result);
    res.send(result);
  }
  catch (err) {
    console.log(err.message);
  }
})


module.exports = router;