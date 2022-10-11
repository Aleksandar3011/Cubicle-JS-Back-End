const bcrypt = require('bcrypt');
const User = require('../models/User');

const saltRounds = 10;

exports.register = async ({username, password, repeatPassword}) => {
    
    //TODO: form validation message
    if(password !== repeatPassword){
        return false;
    }
    
    const hashedPassowrd = await bcrypt.hash(password, saltRounds);

    const createdUser = User.create({
        username,
        password: hashedPassowrd
    });

    return createdUser;  
};