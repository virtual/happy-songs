var mongoose = require("mongoose");
var UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  //email: String,
  email: { type: String, required: true, unique: true },
  password: String
});
/*
Use Populate
link trackSchema and UserSchema
make login page
store all the things
Update trackcount without connecting to user
then connect trackcount with user
(this isn't in order)
*/
module.exports = mongoose.model('User', UserSchema);