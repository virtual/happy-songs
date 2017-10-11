var mongoose = require("mongoose");
var TrackSchema = new mongoose.Schema({
  trackId: String,
  playCount: Number
});
module.exports = mongoose.model('Track', TrackSchema);