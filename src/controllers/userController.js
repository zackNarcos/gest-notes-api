'use strict';
const User = require('../models/userModel')
const Pays = require('../models/projectModel')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const { registerValidation, loginValidation } = require("../middleware/validation");
const JWT_KEY = process.env.JWT_KEY;

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({attributes: { exclude: ["password"] },});
    return res.status(200).send(
      users
    )
  } catch (err) {
    return res.status(400).send({error: err});
  }
}

// signup
exports.signUp = async (req, res) => {

  const emailExist = await User.findOne({
    where: { email: req.body.email }
  });
  if (emailExist) return res.status(400).send({ message: "Email already exist!" });

  try {
    const newUser = await createUserObj(req);
    const savedUser = await User.create(newUser);
    return res.status(200).send({ message: "User created successfully!", user: savedUser });
  } catch (err) {
    return res.status(400).send({ error: err });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.update(req.body, {
      where: { id: req.params.id },
        returning: true // Retourne l'enregistrement mis à jour
    });

    if (updatedUser[0] === 1) {
      return res.status(400).send({ message: "Could not update user" });
    }
    return res.status(200).send({ message: "User updated successfully", updatedUser });

  } catch (error) {
    return res.status(400).send({ error: "An error has occurred, unable to update user" });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.destroy({
      where: { id: req.params.id }
    });
    if (!deletedUser) {
      return res.status(400).send({ message: "Could not delete user" });
    }
    return res.status(200).send({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    return res.status(400).send({ error: "An error has occurred, unable to delete user" });
  }
};

exports.data = async (req, res) => {
  const token = req.header("auth-token");
    if (!token) return res.status(401).send({ message: "Access Denied" });

    try {
        req.user = jwt.verify(token, JWT_KEY);
        const user = await User.findByPk(req.user.id, {
          attributes: { exclude: ["password"] },
        });

        return res.status(200).send(user);
    } catch (err) {
        return res.status(400).send({ message: "Error occurred while fetching user data", error: err });
    }
    // return res.status(200).send({ message: "Access Granted", user: req.user });
};

const createUserObj = async (req) => {
  return {
    email: req.body.email,
    roles: req.body.roles,
    password: bcrypt.hashSync(req.body.password, 10),
    nom: req.body.nom,
    prenom: req.body.prenom,
    adresse: req.body.adresse,
    ville: req.body.ville,
    telephone: req.body.telephone,
    description: req.body.description,
    salaire: req.body.salaire,
    isLocked: req.body.isLocked
  };
}
