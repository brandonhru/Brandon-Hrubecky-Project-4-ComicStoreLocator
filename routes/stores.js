//USING EXPRESS ROUTER
//EXPORTING ROUTER
const express = require('express');
const { getStores, addStore } = require('../controllers/stores');

const router = express.Router();
//SLASH USED BECAUSE API IS ALREADY IDENTIFIED IN THE SERVER.JS FILE
router.route('/').get(getStores).post(addStore);


module.exports = router;