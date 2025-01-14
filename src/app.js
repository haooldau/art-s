require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');

// 导入路由
const performanceRoutes = require('./routes/performances');
const artRoutes = require('./routes/art');

const app = express();

// 简化的CORS配置
app.use(cors());

// 基础中间件
app.use(express.json());
app.use(compression());
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  contentSecurityPolicy: false
}));

// 修改 JSON 响应设置
app.set('json spaces', 0); // 禁用 JSON 格式化
app.use((req, res, next) => {
  const originalJson = res.json;
  res.json = function(obj) {
    // 确保返回的是一个干净的 JSON 字符串
    return originalJson.call(this, JSON.parse(JSON.stringify(obj)));
  };
  next();
});

// 静态文件服务
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads'), {
  maxAge: '1d',
  etag: true
}));

// 数据库连接
sequelize.authenticate()
  .then(() => {
    console.log('主数据库连接成功');
    // 同步数据库模型（仅在开发环境）
    if (process.env.NODE_ENV === 'development') {
      return sequelize.sync({ alter: true });
    }
  })
  .catch(err => {
    console.error('主数据库连接失败:', err);
  });

// 连接认证数据库
const authSequelize = require('./config/authDatabase');
authSequelize.authenticate()
  .then(() => {
    console.log('认证数据库连接成功');
    return authSequelize.sync();
  })
  .catch(err => {
    console.error('认证数据库连接失败:', err);
  });

// API 路由
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'SparkleLive API is running'
  });
});

// 认证路由
app.use('/api/auth', authRoutes);

// 其他业务路由
app.use('/api/performances', performanceRoutes);
app.use('/api/art', artRoutes);

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: '服务器内部错误'
  });
});

// 404 处理
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: '接口不存在'
  });
});

const PORT = process.env.PORT || 8001;
const HOST = process.env.HOST || '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`服务器运行在 http://${HOST}:${PORT}`);
});

module.exports = app;