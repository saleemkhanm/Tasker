const jwt = require("jsonwebtoken");
const User = require("../Models/UserModel");
const expressAsyncHandler = require("express-async-handler");
require("dotenv").config();

const protect = expressAsyncHandler(async (req, res, next) => {
    let token = req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.user = await User.findById(decoded.userId);
            next();

        } catch (error) {
            return res.status(401).json("Not autorized Invalid Token ");
        }
    }
    else {
        return res.status(401).json("Not autorized No Token Find");
    }
});
module.exports = protect
