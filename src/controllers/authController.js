'use strict';
const User = require('../models/userModel')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const { loginValidation } = require("../middleware/validation");
const JWT_KEY = process.env.JWT_KEY;

// login
exports.logIn = async (req, res) => {
  const { error } = loginValidation(req.body);
  console.log(error)
  if (error) return res.status(400).send(error.details[0].message);

  const foundUser = await User.findOne({ email: req.body.email }); //returns the first document that matches the query criteria or null
  console.log(foundUser)
  if (!foundUser) return res.status(400).send({ error: "Données de connexion invalides" });

  try {
    const isMatch = await bcrypt.compareSync(req.body.password, foundUser.password);
    if (!isMatch) return res.status(400).send({ error: "Données de connexion invalides" });

    // create and assign jwt
    const token = await jwt.sign({ id: foundUser.id }, JWT_KEY);

    return res.status(200).header("auth-token", token).send({ "auth-token": token, userId: foundUser.id });
  } catch (error) {
    return res.status(400).send(error);
  }
};
