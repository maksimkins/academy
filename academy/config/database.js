const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('AcademyDb', 'admin', 'admin123!', {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = sequelize;