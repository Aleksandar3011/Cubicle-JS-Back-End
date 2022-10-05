const express = require('express');
const homeContorller = require('./controllers/homeController')
const cubeController = require('./controllers/cubeController');
const accessoryController = require('./controllers/accessoryController.js')

const router = express.Router();

router.use('/', homeContorller)
router.use('/cube', cubeController)
router.use('/accessory', accessoryController)

module.exports = router;