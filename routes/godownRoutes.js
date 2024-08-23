const express = require('express');
const { storeGodownData } = require('../controllers/godownController');

const router = express.Router();

router.post('/storeGodownData', storeGodownData);

module.exports = router;