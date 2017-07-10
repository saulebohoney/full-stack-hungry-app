'use strict';

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {type: String, required: true},
  nevers: [Number]
});

userSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    name: this.name,
    nevers: this.nevers
  };
};

const User = mongoose.model('User', userSchema);

module.exports = {User};
