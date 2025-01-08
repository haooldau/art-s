const sequelize = require('../config/database');

// 获取艺人报价信息
exports.getArtistPrice = async (req, res) => {
  try {
    const { artistName } = req.params;
    console.log('查询艺人:', artistName);

    // 先测试数据库连接
    try {
      await sequelize.authenticate();
      console.log('数据库连接正常');
    } catch (dbError) {
      console.error('数据库连接失败:', dbError);
      throw dbError;
    }
    
    // 直接从art表查询，使用正确的列名
    const [results] = await sequelize.query(
      'SELECT art, num FROM art WHERE art = ?',
      {
        replacements: [artistName],
        type: sequelize.QueryTypes.SELECT,
        raw: true
      }
    );

    console.log('查询结果:', results);

    res.json({
      success: true,
      num: results ? results.num : '暂无报价',
      inDatabase: !!results
    });
  } catch (error) {
    console.error('获取艺人报价失败:', error);
    res.status(500).json({
      success: false,
      message: '获取艺人报价失败: ' + error.message
    });
  }
};

// 设置艺人报价
exports.setArtistPrice = async (req, res) => {
  try {
    const { artist, price } = req.body;
    console.log('设置报价:', { artist, price });
    
    // 先测试数据库连接
    try {
      await sequelize.authenticate();
      console.log('数据库连接正常');
    } catch (dbError) {
      console.error('数据库连接失败:', dbError);
      throw dbError;
    }

    // 尝试更新，如果不存在则插入，使用正确的列名
    const result = await sequelize.query(
      `INSERT INTO art (art, num) 
       VALUES (?, ?) 
       ON DUPLICATE KEY UPDATE num = ?`,
      {
        replacements: [artist, price, price],
        type: sequelize.QueryTypes.UPSERT
      }
    );

    console.log('更新结果:', result);

    res.json({
      success: true,
      message: '报价设置成功'
    });
  } catch (error) {
    console.error('设置艺人报价失败:', error);
    res.status(500).json({
      success: false,
      message: '设置艺人报价失败: ' + error.message
    });
  }
}; 