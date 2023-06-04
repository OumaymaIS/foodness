const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Don = new Schema({
  NomduPlat: String,
  Compostion: String,
  Details: String,
  Quantite:
  {type:Number,
  default:1
  }
});
module.exports = mongoose.model("Don", Don);
