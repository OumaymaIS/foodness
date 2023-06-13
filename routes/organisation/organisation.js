
var express = require('express');
var router = express.Router();
var controllerOrganisation=require("../../controller/controllerOrganisation");

router.post("/add",controllerOrganisation.Add);
router.get("/findAll",controllerOrganisation.findAll);
router.put("/update",controllerOrganisation.update);
router.get("/findById/:id",controllerOrganisation.findById);
router.delete("/delete/:id",controllerOrganisation.delete);

router.get("/findAssociation",controllerOrganisation.findAssociation);

router.get("/findResto",controllerOrganisation.findResto);
module.exports = router;
