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

// CORS 配置
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://spark.hkg1.zeabur.app',
    'https://art-f.zeabur.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false
}));

// 基础中间件
app.use(express.json());
app.use(compression());
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  contentSecurityPolicy: false
}));

// 在所有路由之前初始化数据库
initializeDatabase().catch(console.error);

// API 路由
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'SparkleLive API is running'
  });
});

app.use('/api/performances', performanceRoutes);
app.use('/api/test', testRoutes);

// 静态文件
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads'), {
  maxAge: '1d',
  etag: true
}));

// 错误处理
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});