const { DataTypes } = require('sequelize');
const authSequelize = require('../config/authDatabase');

const User = authSequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  accountId: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  realName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true
  },
  slogan: {
    type: DataTypes.STRING,
    allowNull: true
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
  tableName: 'users',
  timestamps: true
});

// 强制同步数据库，如果表不存在则创建
authSequelize.sync({ force: true })
  .then(() => {
    console.log('User表已同步');
  })
  .catch(err => {
    console.error('同步User表时出错:', err);
  });

module.exports = User; 