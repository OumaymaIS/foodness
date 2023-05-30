const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Plat = new Schema({
  Nom du Plat: String,
  Compostion: String,
  Details: String
});
module.exports = mongoose.model("plat", Plat);
