require('dotenv').config();
const sequelize = require('../config/database');
const Performance = require('../models/Performance');

async function migrate() {
  try {
    // 同步所有模型到数据库
    await sequelize.sync({ alter: true });
    console.log('数据库迁移完成');
    process.exit(0);
  } catch (error) {
    console.error('数据库迁移失败:', error);
    process.exit(1);
  }
}

migrate(); 