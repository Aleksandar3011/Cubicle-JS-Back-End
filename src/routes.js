const express = require('express');
const homeContorller = require('./controllers/homeController')

const router = express.Router();

router.get('/', homeContorller.index)

module.exports = router;