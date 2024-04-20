'use strict';

const Student = require('../models/studentModel');

// Récupérer toutes les students
exports.getStudents = async (req, res) => {
    const { yearsId, classesId } = req.query;
    try {
        const students = await Student.findAll({
            where: { yearsId: yearsId, classesId: classesId}
        });
        return res.status(200).send(students);
    } catch (err) {
        return res.status(400).send({ error: err });
    }
};

// Récupérer une Student`
exports.getStudent = async (req, res) => {
    try {
        const student = await Student.findOne({
            where: { id: req.params.id }
        });
        if (!student) {
            return res.status(404).send({ message: "student non trouvée" });
        }
        return res.status(200).send(student);
    } catch (err) {
        return res.status(400).send({ error: err });
    }
}

// Ajouter une student
exports.addStudent = async (req, res) => {
    const { firstName, lastName, email, tel, yearsId, classesId, isPublished } = req.body;

    try {
        const student = await Student.create({ firstName, lastName, email, tel, classesId, yearsId, isPublished });
        return res.status(201).send(student);
    } catch (err) {
        return res.status(400).send({ error: err });
    }
};

// Mettre à jour une student
exports.updateStudent = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email, tel, yearsId, classesId, isPublished } = req.body;

    try {
        const [updated] = await Student.update({ firstName, lastName, email, tel, yearsId, classesId, isPublished }, {
            where: { id: id }
        });

        if (updated) {
            const updatedStudent = await Student.findByPk(id);
            return res.status(200).send(updatedStudent);
        }

        throw new Error('student non trouvée');
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
};

// Supprimer une student
exports.deleteStudent = async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await Student.destroy({
            where: { id: id }
        });

        if (deleted) {
            return res.status(204).send();
        }

        throw new Error('student non trouvée');
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
};

// Publier une student
exports.publishStudent = async (req, res) => {
    const { id } = req.params;

    try {
        const [updated] = await Student.update({ isPublished: true }, {
            where: { id: id }
        });

        if (updated) {
            const publishedStudent = await Student.findByPk(id);
            return res.status(200).send(publishedStudent);
        }

        throw new Error('student non trouvée');
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
};

// Dépublier une student
exports.unpublishStudent = async (req, res) => {
    const { id } = req.params;

    try {
        const [updated] = await Student.update({ isPublished: false }, {
            where: { id: id }
        });

        if (updated) {
            const unpublishedStudent = await Student.findByPk(id);
            return res.status(200).send(unpublishedStudent);
        }

        throw new Error('student non trouvée');
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
};

// Publier toutes les students
exports.publishAllStudents = async (req, res) => {
    try {
        const [updated] = await Student.update({ isPublished: true }, {
            where: {},
            returning: true
        });

        if (updated) {
            const publishedStudents = await Student.findAll();
            return res.status(200).send(publishedStudents);
        }

        throw new Error('Aucune student trouvée');
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
};

// Dépublier toutes les students
exports.unpublishAllStudents = async (req, res) => {
    try {
        const [updated] = await Student.update({ isPublished: false }, {
            where: {},
            returning: true
        });

        if (updated) {
            const unpublishedStudents = await Student.findAll();
            return res.status(200).send(unpublishedStudents);
        }

        throw new Error('Aucune Students trouvée');
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
};
// Supprimer toutes les students
exports.deleteAllStudents = async (req, res) => {
    try {
        const deletedStudents = await Student.destroy({
            where: { id: req.body.ids }
        });
        if (!deletedStudents) {
            return res.status(400).send({ message: "Could not delete  students" });
        }
        return res.status(200).send({ message: "students deleted successfully",  students: deletedStudents });
    } catch (error) {
        return res.status(400).send({ error: "An error has occurred, unable to delete  students" });
    }
};