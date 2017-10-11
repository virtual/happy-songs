var mongoose = require("mongoose");
var UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
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
module.exports = mongoose.model('UserSchema', UserSchema);