const express = require('express');
const homeContorller = require('./controllers/homeController')
const cubeController = require('./controllers/cubeController');
const accessoryController = require('./controllers/accessoryController.js')
const authController = require('./controllers/authController');

const router = express.Router();

router.use('/', homeContorller);
router.use('/cube', cubeController);
router.use('/accessory', accessoryController);
router.use('/auth', authController);
router.use('*', (req, res) => {
    res.render('404')
});

module.exports = router;