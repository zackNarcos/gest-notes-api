const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const db = process.env.MYSQL_URL
console.log('db => ',db);
const sequelize = new Sequelize(db);


const NewsLetter = sequelize.define('newsletters', {
    mail: {
        type: DataTypes.STRING,
        allowNull: false,
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

module.exports = NewsLetter;
