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
  },
  FirstSeats: {
    availableSeatsNum: {
      type: Number
    },
    allSeats: {
      type: Array
    },
    required: false
  },
  BusinessSeats: {
    availableSeatsNum: {
      type: Number
    },
    allSeats: {
      type: Array
    },
    required: false
  },
  EconomySeats: {
    availableSeatsNum: {
      type: Number
    },
    allSeats: {
      type: Array
    },
    required: false
  }
}, { timestamps: true });

const Flight = mongoose.model('Flight', flightSchema);
module.exports = Flight;