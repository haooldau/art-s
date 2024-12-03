const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'hkg1.clusters.zeabur.com',
  port: process.env.DB_PORT || 32710,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '74R6z2n891KemMJrjQ3OcT5uwkYE0HgV',
  database: process.env.DB_NAME || 'zeabur',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    rejectUnauthorized: false
  }
});

// 测试连接
pool.getConnection((err, connection) => {
  if (err) {
    console.error('数据库连接失败:', err);
    return;
  }
  console.log('数据库连接成功!');
  connection.release();
});

module.exports = pool.promise(); 