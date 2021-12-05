const router = require('express').Router();
let Flights = require('../models/Flights');
let Users = require('../models/Users');

router.post('/getUserSearch', async (req, res) => {
    //const flight =new Flights( req.body);
    try {
        //await flight.save();
        const flights = await Flights.find(req.body);

        console.log("FLIGHTSSS", flights);
        res.send(flights);

    }
    catch (err) {
        console.log("ERRORR");
        res.status(500).send(err)
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

router.put('/:id', async (req, res, next) => {
    try {
        const toUpdate = req.body.updateReservedFlights;
        const result = await Users.findByIdAndUpdate(req.params.id, { ReservedFlights: toUpdate }, { new: true });
        await Users.save;
        res.send(result);
    }
    catch (err) {
        console.log(err.message);
    }
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

        const values = await result.populate("ReservedFlights");
        console.log(values.ReservedFlights)

        res.send(values.ReservedFlights);

    }
    catch (err) {
        console.log(err.message);
    }
});

module.exports = router;