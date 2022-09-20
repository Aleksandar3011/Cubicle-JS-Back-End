const express = require('express');
const homeContorller = require('./controllers/homeController')
const cubeController = require('./controllers/cubeController');

const router = express.Router();

router.use('/', homeContorller)
router.use('/cube', cubeController)

module.exports = router;