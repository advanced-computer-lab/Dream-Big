const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const flightSchema = new Schema({
    From: {
      type: String,
      required: true,
    },
    To: {
      type: String,
      required: true    
    },
    FlightDepDate: {
      type: Date,
      required: true,
    },
    FlightArrDate: {
      type: Date,
      required: true,
    },
    FlightDepTime: {
      type: String,
      required: true,
    },
    FlightArrTime: {
      type: String,
      required: true,
    },
    Cabin: {
      type: String,
      required: true,
    },
    "Seats Available on Flight": {
      type: Number,
      required: true
    },
    FlightNumber: {
      type: String,
      required: true,
      unique:true
    },
    Airport: {
      type: String,
      required: true
    },
    Terminal: {
      type: Number,
      required: true
    }
   
  }, { timestamps: true });

const Flight = mongoose.model('Flight', flightSchema);
module.exports = Flight;