const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Don = new Schema({
  NomduPlat: String,
  Compostion: String,
  Details: String
});
module.exports = mongoose.model("Don", Don);
