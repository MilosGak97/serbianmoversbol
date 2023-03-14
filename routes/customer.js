const path = require('path');
const express = require('express');
const customerController = require('../controllers/customer');
const router = express.Router();

router.get('/login', customerController.GETlogin);
router.post('/login',customerController.POSTlogin);
 /*
router.use('/mybol', customerController.viewBOL);

router.post('/signature1', customerController.POSTsignature1);

router.get('/signedBol', customerController.GETsignedBol);

router.post('/boldelivery', customerController.POSTbolDelivery);

router.post('/bolmaterials', customerController.POSTbolMaterials);

router.post('/bolendtime', customerController.POSTbolEndTime);

router.post('/signature2', customerController.POSTsignature2);
*/
module.exports = router;