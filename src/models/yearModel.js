const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const db = process.env.MYSQL_URL
const sequelize = new Sequelize(db);


const Year = sequelize.define('years', {
    label: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        trim: true,
        lowercase: true
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
        console.log('Table years synchronisées avec succès');
    })
    .catch(err => {
        console.error('Erreur lors de la synchronisation des tables :', err);
    });

module.exports = Year;
