const router = require('express').Router();
let Users = require('../models/Users');


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