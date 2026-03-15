const jwt = require("jsonwebtoken");
require("dotenv").config();

const GenrateToken = (res, userId) => {

    const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, { expiresIn: "30day" });
    res.cookie("jwt", token, {

        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        samsite: "Strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
    });
}
module.exports = GenrateToken;
