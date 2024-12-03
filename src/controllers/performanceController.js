const db = require('../config/database');
const path = require('path');
const fs = require('fs');

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
    const { artist, type, province, city, venue, date } = req.body;
    const poster = req.file ? `/uploads/${req.file.filename}` : null;

    // 确保 uploads 目录存在
    const uploadsDir = path.join(__dirname, '../../public/uploads');
    if (!fs.existsSync(uploadsDir)){
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // 打印接收到的数据，用于调试
    console.log('Received data:', { artist, type, province, city, venue, date, poster });

    const [result] = await db.execute(
      'INSERT INTO performances (artist, type, province, city, venue, date, poster) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [artist, type, province, city, venue, date, poster]
    );

    res.json({
      success: true,
      message: '数据提交成功',
      data: {
        id: result.insertId,
        artist,
        type,
        province,
        city,
        venue,
        date,
        poster
      }
    });
  } catch (error) {
    console.error('创建演出记录失败:', error);
    res.status(500).json({
      success: false,
      message: '服务器错误：' + error.message
    });
  }
}; 