'use strict';

const Matiere = require('../models/matiereModel');

// Récupérer toutes les Matieres
exports.getMatieres = async (req, res) => {
    const { yearsId, classesId } = req.query;
    try {
        const matieres = await Matiere.findAll({
            where: { yearsId: yearsId, classesId: classesId}
        });
        return res.status(200).send(matieres);
    } catch (err) {
        return res.status(400).send({ error: err });
    }
};

// Récupérer une Matiere
exports.getMatiere = async (req, res) => {
    try {
        const matiere = await Matiere.findOne({
            where: { id: req.params.id }
        });
        if (!matiere) {
            return res.status(404).send({ message: "matiere non trouvée" });
        }
        return res.status(200).send(matiere);
    } catch (err) {
        return res.status(400).send({ error: err });
    }
}

// Ajouter une Matiere
exports.addMatiere = async (req, res) => {
    const { label, yearsId, classesId, isPublished } = req.body;

    try {
        const matiere = await Matiere.create({ label, classesId, yearsId, isPublished });
        return res.status(201).send(matiere);
    } catch (err) {
        return res.status(400).send({ error: err });
    }
};

// Mettre à jour une Matiere
exports.updateMatiere = async (req, res) => {
    const { id } = req.params;
    const { label, yearsId, classesId, isPublished } = req.body;

    try {
        const [updated] = await Matiere.update({ label, yearsId, classesId, isPublished }, {
            where: { id: id }
        });

        if (updated) {
            const updatedMatiere = await Matiere.findByPk(id);
            return res.status(200).send(updatedMatiere);
        }

        throw new Error('Matiere non trouvée');
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
};

// Supprimer une Matiere
exports.deleteMatiere = async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await Matiere.destroy({
            where: { id: id }
        });

        if (deleted) {
            return res.status(204).send();
        }

        throw new Error('Matiere non trouvée');
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
};

// Publier une Matiere
exports.publishMatiere = async (req, res) => {
    const { id } = req.params;

    try {
        const [updated] = await Matiere.update({ isPublished: true }, {
            where: { id: id }
        });

        if (updated) {
            const publishedMatiere = await Matiere.findByPk(id);
            return res.status(200).send(publishedMatiere);
        }

        throw new Error('Matiere non trouvée');
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
};

// Dépublier une Matiere
exports.unpublishMatiere = async (req, res) => {
    const { id } = req.params;

    try {
        const [updated] = await Matiere.update({ isPublished: false }, {
            where: { id: id }
        });

        if (updated) {
            const unpublishedMatiere = await Matiere.findByPk(id);
            return res.status(200).send(unpublishedMatiere);
        }

        throw new Error('Matiere non trouvée');
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
};

// Publier toutes les Matieres
exports.publishAllMatieres = async (req, res) => {
    try {
        const [updated] = await Matiere.update({ isPublished: true }, {
            where: {},
            returning: true
        });

        if (updated) {
            const publishedMatieres = await Matiere.findAll();
            return res.status(200).send(publishedMatieres);
        }

        throw new Error('Aucune Matiere trouvée');
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
};

// Dépublier toutes les Matieres
exports.unpublishAllMatieres = async (req, res) => {
    try {
        const [updated] = await Matiere.update({ isPublished: false }, {
            where: {},
            returning: true
        });

        if (updated) {
            const unpublishedMatieres = await Matiere.findAll();
            return res.status(200).send(unpublishedMatieres);
        }

        throw new Error('Aucune Matiere trouvée');
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
};
// Supprimer toutes les Matieres
exports.deleteAllMatieres = async (req, res) => {
    try {
        const deletedMatieres = await Matiere.destroy({
            where: { id: req.body.ids }
        });
        if (!deletedMatieres) {
            return res.status(400).send({ message: "Could not delete Matieres" });
        }
        return res.status(200).send({ message: "Matieres deleted successfully", Matieres: deletedMatieres });
    } catch (error) {
        return res.status(400).send({ error: "An error has occurred, unable to delete Matieres" });
    }
};