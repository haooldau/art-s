// 统一的错误处理
const errorHandler = (err, req, res, next) => {
  console.error('API Error:', err);
  
  // 数据库连接错误
  if (err.code === 'ECONNREFUSED') {
    return res.status(503).json({
      success: false,
      message: '数据库连接失败'
    });
  }

  // 文件上传错误
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      success: false,
      message: '文件大小超出限制'
    });
  }

  // 默认错误响应
  res.status(err.status || 500).json({
    success: false,
    message: err.message || '服务器内部错误'
  });
};

module.exports = errorHandler; 