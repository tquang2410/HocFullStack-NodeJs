const User = require("../models/user");
const bcrypt = require('bcrypt');
const saltRounds = 10;
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
const loginService = async ( email1, password) => {
    try {
        // hash password here if needed
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = await User.findOne({ email: email1 });
        if (user) {
            const isMatchPassword = await bcrypt.compare(password, user.password);
            if(!isMatchPassword){
                return {
                    EC: 2,
                    EM: "Wrong email or password"
                }
            } else {
                // create an access token
                return "create an access"
            }
        } else {
            return {
                EC : 1,
                EM: "Wrong email or password"
            }
        }

        return result;

    } catch (error) {
        console.log(error);
        return null;
    }
}
module.exports = {
    createUserService, loginService
}