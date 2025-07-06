const express = require('express');
const {createUser, handleLogin, getUser, getAccount} = require("../controllers/userController");

const routerAPI = express.Router();
// const delay = require('../config/middleware/delay');
const auth = require('../config/middleware/auth');
// router gọi đến controller
routerAPI.get('/', (req, res) => {
    return res.status(200).json('Welcome to the API')
})

routerAPI.all("*", auth);
routerAPI.get("/user", getUser);
routerAPI.get("/account", getAccount);

routerAPI.post("/register", createUser)
routerAPI.post("/login", handleLogin)


module.exports = routerAPI; //export default