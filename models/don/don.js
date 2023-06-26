const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DonSchema = new Schema({
  
  RefOrganization: {
    type: Schema.Types.ObjectId,
    ref: "organisation",
  },
  Target: Number,
  Description:String,
  ProgessValue:{
    type: Number,
    defaultValue:0,
  },
  RefTypeOfDon:{
    type: Schema.Types.ObjectId,
    ref:"typeofdon"
  },
  Dons: [
    {
      resto: {
        type: Schema.Types.ObjectId,
        ref: "organisation",
      },
      plat: {
          type: Schema.Types.ObjectId,
          ref: "organisation",
        },
      
      quantite: Number,
    },
  ], 
  
});

module.exports = mongoose.model("Don", DonSchema);
