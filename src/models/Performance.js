const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Performance = sequelize.define('Performance', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  artist: {
    type: DataTypes.STRING,
    allowNull: false
  },
  venue: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  price: {
    type: DataTypes.JSON,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  image: {
    type: DataTypes.STRING
  },
  source: {
    type: DataTypes.ENUM('damai', 'showstart'),
    allowNull: false
  },
  sourceUrl: {
    type: DataTypes.STRING
  },
  status: {
    type: DataTypes.ENUM('upcoming', 'ongoing', 'ended'),
    defaultValue: 'upcoming'
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'performances',
  indexes: [
    {
      fields: ['artist']
    },
    {
      fields: ['date']
    },
    {
      fields: ['source']
    }
  ]
});

module.exports = Performance; 