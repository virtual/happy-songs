var mongoose = require("mongoose");
var TrackSchema = new mongoose.Schema({
  id: String,
  playCount: Number
});
module.exports = mongoose.model('Track', TrackSchema);