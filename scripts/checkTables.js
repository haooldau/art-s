const authSequelize = require('../src/config/authDatabase');

async function checkTables() {
  try {
    // 查询所有表
    const [results] = await authSequelize.query('SHOW TABLES');
    console.log('数据库中的表:', results);

    // 检查users表的结构
    const [userTableInfo] = await authSequelize.query('DESCRIBE users');
    console.log('\nusers表结构:', userTableInfo);
  } catch (error) {
    console.error('查询失败:', error);
  } finally {
    await authSequelize.close();
  }
}

checkTables(); 