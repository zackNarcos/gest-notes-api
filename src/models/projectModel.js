const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const db = process.env.MYSQL_URL
console.log('db => ',db);
const sequelize = new Sequelize(db);


const Pays = sequelize.define('projects', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        lowercase: true,
        trim: true
    },
    link: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        lowercase: true,
        trim: true
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
        lowercase: true,
        trim: true
    },
    technologies: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
        lowercase: true,
        trim: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        lowercase: true,
        trim: true
    },

}, {
    timestamps: true
});

sequelize.sync()
    .then(() => {
        console.log('Tables synchronisées avec succès');
    })
    .catch(err => {
        console.error('Erreur lors de la synchronisation des tables :', err);
    });

module.exports = Pays;
