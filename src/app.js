require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const performanceRoutes = require('./routes/performances');
const compression = require('compression');
const helmet = require('helmet');
const initializeDatabase = require('./config/initDb');
const testRoutes = require('./routes/test');

const app = express();

// 中间件
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// 启用压缩
app.use(compression());

// 安全头
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  contentSecurityPolicy: false
}));

// 静态资源缓存
app.use('/uploads', express.static('public/uploads', {
  maxAge: '1d',
  etag: true
}));

// 确保 API 路由在最前面
app.use('/api/performances', performanceRoutes);
app.use('/api/test', testRoutes);

// 其他中间件和静态文件配置放在后面
app.use(express.static('public'));

// 错误处理
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: '服务器内部错误'
  });
});

// 初始化数据库
initializeDatabase().catch(console.error);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use((req, res, next) => {
  res.header('Content-Type', 'application/json');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});