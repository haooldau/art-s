const express = require('express');
const router = express.Router();
const pool = require('../config/database');

router.get('/test-db', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS result');
    res.json({
      success: true,
      message: '数据库连接测试成功',
      data: rows[0]
    });
  } catch (error) {
    console.error('数据库测试失败:', error);
    res.status(500).json({
      success: false,
      message: '数据库连接测试失败',
      error: error.message
    });
  }
});

module.exports = router; 