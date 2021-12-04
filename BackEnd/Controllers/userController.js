const router = require('express').Router();
let Users = require('../models/Users');

router.get('/UserDetails/:id', async (req, res) => {
  console.log('id', req.params.id)
  try {
    const id = req.params.id;
    const users = await Users.findById(id).
      populate('ReservedFlights')
    console.log(users);
    res.send(users);
  }
  catch (err) {
    res.status(500).send(err)
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const toUpdate = req.body.updateReservedFlights;
    const result = await Users.findByIdAndUpdate( req.params.id , {ReservedFlights: toUpdate}, { new: true });
    await Users.save;
    res.send(result);
  }
  catch (err) {
    console.log(err.message);
  }
});

module.exports = router;