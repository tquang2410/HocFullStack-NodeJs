require('dotenv').config();
const User = require("../models/user");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const createUserService = async (name, email, password) => {
    try {
        // hash password here if needed
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        // save user to database
        let result = await User.create({
           name: name,
            email: email,
            password: hashedPassword,
            role: "customer"
        })
        return result;

    } catch (error) {
        console.log(error);
        return null;
    }
}
const loginService = async (email1, password) => {
    try {
        const user = await User.findOne({ email: email1 });
        if (!user) {
            return {
                EC: 1,
                EM: "Wrong email or password"
            }
        }
        const isMatchPassword = await bcrypt.compare(password, user.password);
        if (!isMatchPassword) {
            return {
                EC: 2,
                EM: "Wrong email or password"
            }
        }
        // create an access token
        const payload = {
            name: user.name,
            email: user.email,
        };
        const accessToken = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRATION
            }
        );
        return { accessToken,
            user: {
                name: user.name,
                email: user.email,
                role: user.role
            },
            EC: 0,
            EM: "Login successfully"
        };
    } catch (error) {
        console.log(error);
        return null;
    }
}
module.exports = {
    createUserService, loginService
}