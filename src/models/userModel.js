const { Sequelize, DataTypes } = require('sequelize');
const Pays = require('./projectModel');
require('dotenv').config();

const db = process.env.MYSQL_URL
const sequelize = new Sequelize(db);


const User = sequelize.define('users', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        trim: true,
        lowercase: true
    },
    roles: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'ROLE_EMPLOYE',
        validate: {
            isIn: ['ROLE_ADMIN', 'ROLE_USER', 'ROLE_EMPLOYE']
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: true
    },
    prenom: {
        type: DataTypes.STRING,
        allowNull: true
    },
    adresse: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ville: {
        type: DataTypes.STRING,
        allowNull: true
    },
    telephone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    salaire: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    isLocked: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    resetPasswordLink: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: ""
    }
}, {
    timestamps: true
});


// Synchronisation automatique de la base de données
sequelize.sync()
    .then(() => {
        console.log('Tables synchronisées avec succès');
    })
    .catch(err => {
        console.error('Erreur lors de la synchronisation des tables :', err);
    });

module.exports = User;
