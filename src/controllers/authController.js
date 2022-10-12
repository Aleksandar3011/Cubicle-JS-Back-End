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

    res.redirect('/auth/login')
});

//Login
router.get('/login', async (req, res) => {
   await res.render('auth/login')
});

router.post('/login', async (req, res) => {

   let token = await authService.login(req.body);

   if(!token){
    //TODO: add notifications
    return res.render('404');
    }

    res.cookie('user', token);

    res.redirect('/');
});

module.exports = router;