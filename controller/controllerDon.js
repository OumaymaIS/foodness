const Don = require("../models/don/don");
const ObjectID = require("mongoose").Types.ObjectId;
/* RefOrganization: {
    type: Schema.Types.ObjectId,
    ref: "organisation",
  },
  Target: Number,
  Description: String
  Dons: [
    {
      resto: {
        type: Schema.Types.ObjectId,
        ref: "organisation",
      },
      plats: [
        {
          type: Schema.Types.ObjectId,
          ref: "organisation",
        },
      ],
      quantite: Number,
    },
  ],*/

module.exports.Participer =async(req, res) => {
  const{
    resto,
      plat,
    donId,
    quantite,
  }=req.body;
  if (!ObjectID.isValid(donId))
  return res.status(400).send({
    "message": "Invalid id",
  })
  d= await Don.findById(donId);
  d.Dons.push({
    resto:resto,
    plat:plat,
    quantite:quantite 
  }) 
  d.ProgessValue=d.ProgessValue+quantite;

  await Don.save();
  res.send(d);


  
}
module.exports.Add = async (req, res) => {
  const {
    RefOrganization,
    Target,
    Description
  } = req.body;
  const ProgessValue=0;
  const D= new Don({
    RefOrganization,
    Target,
    Description,
    ProgessValue
  })
  try{
    await D.save();
    res.status(200).send(D);
  }catch(e){
    res.status(500).send(e);

  }


}
module.exports.findAll = async (req, res) => {
  try {
    const docs = await Don.find({}).exec();
    res.status(200).send(docs);
  } catch (err) {
    res.status(500).send(err);
  }
};
module.exports.findById = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
  return res.status(400).send({
    "message": "Invalid id",
  })

  try {
   const docs= await  Don.findById(req.params.id);
      if (docs) res.send(docs);
    
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports.delete = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
  return res.status(400).send({
    "message": "Invalid id",
  })
 
  try {
   const docs= await  Don.findByIdAndDelete(req.params.id);
      if (docs) res.send(docs);

    
  } catch (err) {
    res.status(500).send(err);
  }   
};
/* RefOrganization,
    Target,
    Description*/

module.exports.update = async (req, res) => {
  
  if (!ObjectID.isValid(req.body.id))
  return res.status(400).send({
    "message": "Invalid id",
  })
  let updatedData = {};
  

  if(req.body.Target){
    updatedData.Target=req.body.Target;
  }

  if(req.body.Description){
    updatedData.Description=req.body.Description;
  }
  try{
    const updated=await Don.findByIdAndUpdate(req.body.id,updatedData,{
      new:true,
    });
          res.status(200).send(updated);
    
  } catch (err) {
    res.status(500).send(err);
  }
};