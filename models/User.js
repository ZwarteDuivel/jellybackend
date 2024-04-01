const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  signature: {
    type: String,
    required: true,
  },
  licenseAccepted: {
    type: Boolean, // Add a new field for storing whether the license is accepted or not
    default: false, // Default value is false
  }
});

module.exports = mongoose.model('User', userSchema);
