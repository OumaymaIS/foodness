const Don = require("../models/don/don");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.Add = async (req, res) => {
  const {
    NomduPlat,
    Compostion,
    Details,
  } = req.body;
  
  const D= new Don({
    NomduPlat,
    Compostion,
    Details,
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
module.exports.update = async (req, res) => {
  
  if (!ObjectID.isValid(req.body.id))
  return res.status(400).send({
    "message": "Invalid id",
  })
  let updatedData = {};
  

  if(req.body.NomduPlat){
    updatedData.NomduPlat=req.body.NomduPlat;
  }

  if(req.body.Compostion){
    updatedData.Compostion=req.body.Compostion;
  }
  
  if(req.body.Details){
    updatedData.Details=req.body.Details;
  }
    
  if(req.body.Quantite){
    updatedData.Quantite=req.body.Quantite;
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