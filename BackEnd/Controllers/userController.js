const router = require('express').Router();
const User = require('../models/Users');
const passport = require('passport'); 

router.route('/login').post(async(req, res, next) => {
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

module.exports = router;