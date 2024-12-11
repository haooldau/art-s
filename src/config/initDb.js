const pool = require('./database');

async function initializeDatabase() {
  try {
    // 创建演出表
    await pool.query(`
      CREATE TABLE IF NOT EXISTS performances (
        id INT AUTO_INCREMENT PRIMARY KEY,
        artist VARCHAR(255) NOT NULL,
        type VARCHAR(100),
        date DATE NOT NULL,
        province VARCHAR(100),
        city VARCHAR(100),
        venue VARCHAR(255),
        poster VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    console.log('数据库表初始化成功');
  } catch (error) {
    console.error('数据库表初始化失败:', error);
    throw error;
  }
}

module.exports = initializeDatabase; 