const express = require("express");
const curdController = require("../../Controllers/CrudControllers");
const  getAllDataRandom = require("../../Controllers/GetDataRandom");
const router = express.Router();

router.route('/post')  
    
    .post(curdController.postData)

router.route('/all')
    
    .get(curdController.getAllData)

router.route('/random')
    
    .get(getAllDataRandom.getAllDataRandom)
    
router.route('/:id')
    
    .delete(curdController.deleteData)
    .patch(curdController.updateData)   

module.exports = router;