const router = require('express').Router();

const authService = require('../services/authService');

//Register
router.get('/register', (req, res) => {
    res.render('auth/register')
});

router.post('/register', async (req, res) => {

    const createdUser = await authService.register(req.body);

    if(!createdUser){
        //TODO: add notifications
        return res.render('404');
    }

    res.redirect('/auth/register')
});

//Login
router.get('/login', (req, res) => {
    res.render('auth/login')
});

module.exports = router;