const ObjectID = require("mongoose").Types.ObjectId;
const Organisation=require('../models/organisation/organisation');


module.exports.Add = async (req, res) => {
  const {
    nom,
    adresse,
    type,
    isAssocation,
    isResto,
  } = req.body;
  
  const O= new Organisation({
    nom,
    adresse,
    type,
    isAssocation,
    isResto,
  })
  try{
    await O.save();
    res.status(200).send(O);
  }catch(e){
    res.status(500).send(e);

  }


}
module.exports.findAll = async (req, res) => {
  try {
    const docs = await Organisation.find({}).exec();
    res.status(200).send(docs);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports.findAssociation = async (req, res) => {
  try {
    const docs = await Organisation.find({
      isAssocation:true
    }).exec();
    res.status(200).send(docs);
  } catch (err) {
    res.status(500).send(err);
  }
};
module.exports.findResto = async (req, res) => {
  try {
    const docs = await Organisation.find({
      isResto:true
    }).exec();
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
   const docs= await  Organisation.findById(req.params.id);
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
   const docs= await Organisation.findByIdAndDelete(req.params.id);
      if (docs) res.send(docs);

    
  } catch (err) {
    res.status(500).send(err);
  }   
};
module.exports.update = async (req, res) => {
  
  if (!ObjectID.isValid(req.body.id))
  return res.status(400).send({
    "message": "Invalid id",
  })
  let updatedData = {};
  if(req.body.nom){
    updatedData["nom"] = req.body.nom;
  }
  if(req.body.adresse) {
    updatedData["adresse"] = req.body.adresse;

  }
  
  if(req.body.type){
    updatedData["type"] = req.body.type;
  }
  if(req.body.isAssocation){
    updatedData['isAssocation']=req.body.isAssocation
  }
  if(req.body.isResto){
    updatedData['isResto']=req.body.isResto

  }
 

  try{
    const updated=await Organisation.findByIdAndUpdate(req.body.id,updatedData,{
      new:true,
    });
          res.status(200).send(updated);
    
  } catch (err) {
    res.status(500).send(err);
  }
};