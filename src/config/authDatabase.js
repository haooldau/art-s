const { Sequelize } = require('sequelize');

const authSequelize = new Sequelize('zeabur', 'root', '74R6z2n891KemMJrjQ3OcT5uwkYE0HgV', {
  host: 'hkg1.clusters.zeabur.com',
  port: 32710,
  dialect: 'mysql',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

module.exports = authSequelize; 