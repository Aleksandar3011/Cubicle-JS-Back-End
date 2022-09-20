const express = require('express');
const homeContorller = require('./controllers/homeController')
const cubeController = require('./controllers/cubeController');

const router = express.Router();

router.get('/', homeContorller.index)
router.get('/about', homeContorller.about)

router.use('/cube', cubeController)

module.exports = router;