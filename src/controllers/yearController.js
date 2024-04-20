'use strict';
const Year = require('../models/yearModel');

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Récupérer toutes les années
exports.getYears = async (req, res) => {
  try {
    const years = await Year.findAll({});
    return res.status(200).send(years);
  } catch (err) {
    return res.status(400).send({ error: err });
  }
}

// Récupérer une année
exports.getYear = async (req, res) => {
    try {
        const year = await Year.findOne({
          where: { id: req.params.id }
        });
        if (!year) {
          return res.status(404).send({ message: "Year not found" });
        }
        return res.status(200).send(year);
    } catch (err) {
        return res.status(400).send({ error: err });
    }
};


// Ajouter une année
exports.addYear = async (req, res) => {
  const labelExist = await Year.findOne({
    where: { label: req.body.label }
  });
  if (labelExist) return res.status(400).send({ message: "Year already exists!" });

  try {
    const newYear = await createYearObj(req);
    const savedYear = await Year.create(newYear);
    return res.status(200).send({ message: "Year created successfully!", data: savedYear });
  } catch (err) {
    return res.status(400).send({ error: err });
  }
};

// Mettre à jour une année
exports.updateYear = async (req, res) => {
  try {
    const updatedYear = await Year.update(req.body, {
      where: { id: req.params.id },
      returning: true // Retourne l'enregistrement mis à jour
    });

    if (updatedYear[0] !== 1) {
      return res.status(400).send({ message: "Could not update year" });
    }
    return res.status(200).send({ message: "Year updated successfully", data: updatedYear });

  } catch (error) {
    return res.status(400).send({ error: "An error has occurred, unable to update year" });
  }
};

// Supprimer une année
exports.deleteYear = async (req, res) => {
  try {
    const deletedYear = await Year.destroy({
      where: { id: req.params.id }
    });
    if (!deletedYear) {
      return res.status(400).send({ message: "Could not delete year" });
    }
    return res.status(200).send({ message: "Year deleted successfully", data: deletedYear });
  } catch (error) {
    return res.status(400).send({ error: "An error has occurred, unable to delete year" });
  }
};

// Delete all years
exports.deleteAllYears = async (req, res) => {
  try {
    const deletedYears = await Year.destroy({
      where: { id: req.body.ids }
    });
    if (!deletedYears) {
      return res.status(400).send({ message: "Could not delete years" });
    }
    return res.status(200).send({ message: "Years deleted successfully", years: deletedYears });
  } catch (error) {
    return res.status(400).send({ error: "An error has occurred, unable to delete years" });
  }
};

// Publish all years
exports.publishAllYears = async (req, res) => {
  try {
    const publishedYears = await Year.update({ isPublished: true }, {
      where: { id: req.body.ids }
    });
    return res.status(200).send({ message: "Years published successfully", years: publishedYears });
  } catch (error) {
    return res.status(400).send({ error: "An error has occurred, unable to publish years" });
  }
};

// Unpublish all years
exports.unpublishAllYears = async (req, res) => {
  try {
    const unpublishedYears = await Year.update({ isPublished: false }, {
      where: { id: req.body.ids }
    });
    return res.status(200).send({ message: "Years unpublished successfully", years: unpublishedYears });
  } catch (error) {
    return res.status(400).send({ error: "An error has occurred, unable to unpublish years" });
  }
};

// Publish one year
exports.publishYear = async (req, res) => {
  try {
    const publishedYear = await Year.update({ isPublished: true }, {
      where: { id: req.params.id }
    });
    return res.status(200).send({ message: "Year published successfully", year: publishedYear });
  } catch (error) {
    return res.status(400).send({ error: "An error has occurred, unable to publish year" });
  }
};

// Unpublish one year
exports.unpublishYear = async (req, res) => {
  try {
    const unpublishedYear = await Year.update({ isPublished: false }, {
      where: { id: req.params.id }
    });
    return res.status(200).send({ message: "Year unpublished successfully", year: unpublishedYear });
  } catch (error) {
    return res.status(400).send({ error: "An error has occurred, unable to unpublish year" });
  }
};

// Fonction utilitaire pour créer un objet année
const createYearObj = async (req) => {
  return {
    label: req.body.label,
  };
}