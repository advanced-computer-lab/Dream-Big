const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
var passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
  FirstName: {
    type: String,
    required: true,
  },
  MiddleName: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true
  },
  Age: {
    type: Number,
    required: true,
  },
  LivesIn: {
    type: String,
    required: true
  },
  PhoneNumber: {
    type: String,
    required: true
  },
  PassportNumber:{
    type: String,
    required: true
  },
  ReservedFlights: {
    Departure: { type: Schema.Types.ObjectId, ref: 'Flight' },
    Return: { type: Schema.Types.ObjectId, ref: 'Flight' },
    ChosenDepSeats: {
      type: Array,
      required: false
    },
    ChosenCabin: {
      type: String,
      required: false
    },
    ChosenRetSeats: {
      type: Array,
      required: false
    }
  }
}, { timestamps: true });

// plugin for passport-local-mongoose
userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

module.exports = User;