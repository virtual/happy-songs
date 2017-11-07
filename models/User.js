var mongoose = require("mongoose");
var Hash = require('password-hash');
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
  username: String,
  email: { type: String, required: true, unique: true },
  password:  { type: String, set: function(newValue) {
		return Hash.isHashed(newValue) ? newValue : Hash.generate(newValue);
  }},
  favoriteTracks: [{type: Schema.Types.ObjectId, ref: 'Track', unique:true}]
});

module.exports = mongoose.model('User', UserSchema);