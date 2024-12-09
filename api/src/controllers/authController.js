const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.login = (req, res) => {
    const { email } = req.body;


    const rol = email === "admin@gmail.com" ? "admin" : "user"

}