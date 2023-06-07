const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Commentaire = new Schema({
  refUser:  {
    type: Schema.Types.ObjectId, 
    ref: 'user'
  },
  refDon:  {
    type:Schema.Types.ObjectId, 
    ref: 'Don'},
  content: String,
  isPublic: Boolean,
});
module.exports = mongoose.model("Commentaire", Commentaire);
