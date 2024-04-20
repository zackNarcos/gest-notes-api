const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const db = process.env.MYSQL_URL
const sequelize = new Sequelize(db);


const Student = sequelize.define('students', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        trim: true,
        lowercase: true
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    tel: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    yearsId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'years',
            key: 'id'
        }
    },
    classesId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'classes',
            key: 'id'
        }
    },
    isPublished: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
}, {
    timestamps: true
});

// Synchronisation automatique de la base de données
sequelize.sync()
    .then(() => {
        console.log('Student years synchronisées avec succès');
    })
    .catch(err => {
        console.error('Erreur lors de la synchronisation des tables :', err);
    });

module.exports = Student;
