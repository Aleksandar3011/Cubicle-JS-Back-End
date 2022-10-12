const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const { secret, saltRounds } = require('../constants');



//REGISTER
exports.register = async ({ username, password, repeatPassword }) => {
    //TODO: form validation message
    if (password !== repeatPassword) {
        return false;
    }

    const hashedPassowrd = await bcrypt.hash(password, saltRounds);

    const createdUser = User.create({
        username,
        password: hashedPassowrd,
    });

    return createdUser;
};

//LOGIN
exports.login = async ({ username, password }) => {
    let user = await User.findOne({ username });

    if (!user) {
        return;
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        return;
    }

    const result = new Promise((resolve, reject) => {
        jwt.sign(
            { _id: user._id, username: user.username },
            secret,
            { expiresIn: "2d" },
            (err, decodeToken) => {
                if (err) {
                    return reject(err);
                }

                resolve(decodeToken);
            }
        );
    });

    return result;
};
