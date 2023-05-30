const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Plat = new Schema({
  NomduPlat: String,
  Compostion: String,
  Details: String
});
module.exports = mongoose.model("plat", Plat);
