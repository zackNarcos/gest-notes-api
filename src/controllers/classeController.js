'use strict';

const Classe = require('../models/classeModel');

// Récupérer toutes les classes
exports.getClasses = async (req, res) => {
    const { yearsId } = req.query;
    try {
        const classes = await Classe.findAll({
            where: { yearsId: yearsId }
        });
        return res.status(200).send(classes);
    } catch (err) {
        return res.status(400).send({ error: err });
    }
};

// Récupérer une classe
exports.getClasse = async (req, res) => {
    try {
        const classe = await Classe.findOne({
            where: { id: req.params.id }
        });
        if (!classe) {
            return res.status(404).send({ message: "Classe non trouvée" });
        }
        return res.status(200).send(classe);
    } catch (err) {
        return res.status(400).send({ error: err });
    }
}

// Ajouter une classe
exports.addClasse = async (req, res) => {
    const { label, yearsId, isPublished } = req.body;

    try {
        const classe = await Classe.create({ label, yearsId, isPublished });
        return res.status(201).send(classe);
    } catch (err) {
        return res.status(400).send({ error: err });
    }
};

// Mettre à jour une classe
exports.updateClasse = async (req, res) => {
    const { id } = req.params;
    const { label, yearsId, isPublished } = req.body;

    try {
        const [updated] = await Classe.update({ label, yearsId, isPublished }, {
            where: { id: id }
        });

        if (updated) {
            const updatedClasse = await Classe.findByPk(id);
            return res.status(200).send(updatedClasse);
        }

        throw new Error('Classe non trouvée');
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
};

// Supprimer une classe
exports.deleteClasse = async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await Classe.destroy({
            where: { id: id }
        });

        if (deleted) {
            return res.status(204).send();
        }

        throw new Error('Classe non trouvée');
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
};

// Publier une classe
exports.publishClasse = async (req, res) => {
    const { id } = req.params;

    try {
        const [updated] = await Classe.update({ isPublished: true }, {
            where: { id: id }
        });

        if (updated) {
            const publishedClasse = await Classe.findByPk(id);
            return res.status(200).send(publishedClasse);
        }

        throw new Error('Classe non trouvée');
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
};

// Dépublier une classe
exports.unpublishClasse = async (req, res) => {
    const { id } = req.params;

    try {
        const [updated] = await Classe.update({ isPublished: false }, {
            where: { id: id }
        });

        if (updated) {
            const unpublishedClasse = await Classe.findByPk(id);
            return res.status(200).send(unpublishedClasse);
        }

        throw new Error('Classe non trouvée');
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
};

// Publier toutes les classes
exports.publishAllClasses = async (req, res) => {
    try {
        const [updated] = await Classe.update({ isPublished: true }, {
            where: {},
            returning: true
        });

        if (updated) {
            const publishedClasses = await Classe.findAll();
            return res.status(200).send(publishedClasses);
        }

        throw new Error('Aucune classe trouvée');
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
};

// Dépublier toutes les classes
exports.unpublishAllClasses = async (req, res) => {
    try {
        const [updated] = await Classe.update({ isPublished: false }, {
            where: {},
            returning: true
        });

        if (updated) {
            const unpublishedClasses = await Classe.findAll();
            return res.status(200).send(unpublishedClasses);
        }

        throw new Error('Aucune classe trouvée');
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
};
// Supprimer toutes les classes
exports.deleteAllClasses = async (req, res) => {
    try {
        const deletedClasses = await Classe.destroy({
            where: { id: req.body.ids }
        });
        if (!deletedClasses) {
            return res.status(400).send({ message: "Could not delete classes" });
        }
        return res.status(200).send({ message: "Classes deleted successfully", classes: deletedClasses });
    } catch (error) {
        return res.status(400).send({ error: "An error has occurred, unable to delete classes" });
    }
};