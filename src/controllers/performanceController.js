const db = require('../config/database');
const path = require('path');

exports.getAllPerformances = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM performances ORDER BY created_at DESC');
    res.json({ 
      success: true, 
      data: rows 
    });
  } catch (error) {
    console.error('获取数据错误:', error);
    res.status(500).json({ 
      success: false, 
      message: '服务器错误：' + error.message 
    });
  }
};

exports.createPerformance = async (req, res) => {
  try {
    const { artist, type, province, city, venue, notes, date } = req.body;
    const poster = req.file ? `/uploads/${req.file.filename}` : null;

    const [result] = await db.execute(
      'INSERT INTO performances (artist, type, province, city, venue, notes, date, poster) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [artist, type, province, city, venue, notes, date, poster]
    );

    res.json({ 
      success: true, 
      message: '数据提交成功',
      data: result
    });
  } catch (error) {
    console.error('创建演出记录失败:', error);
    res.status(500).json({ 
      success: false, 
      message: '服务器错误：' + error.message 
    });
  }
}; 