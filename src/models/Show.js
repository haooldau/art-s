const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Show = sequelize.define('Show', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  artist: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tag: {
    type: DataTypes.STRING(50)
  },
  city: {
    type: DataTypes.STRING(50)
  },
  venue: {
    type: DataTypes.STRING
  },
  lineup: {
    type: DataTypes.TEXT
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  price: {
    type: DataTypes.STRING(100)
  },
  status: {
    type: DataTypes.STRING(50)
  },
  detail_url: {
    type: DataTypes.STRING
  },
  poster: {
    type: DataTypes.STRING
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'shows',
  timestamps: false,  // 因为我们使用created_at而不是createdAt
  underscored: true  // 使用下划线命名而不是驼峰命名
});

module.exports = Show; 