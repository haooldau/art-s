# SparkleLive Backend

数据库后端服务，用于管理演出数据和用户数据。

## 项目结构

```
src/
├── config/           # 配置文件
│   ├── database.js   # 数据库配置
│   └── logger.js     # 日志配置
├── controllers/      # 控制器
│   ├── performanceController.js  # 演出相关控制器
│   └── userController.js         # 用户相关控制器
├── models/          # 数据模型
│   ├── Performance.js   # 演出模型
│   └── User.js          # 用户模型
├── services/        # 业务逻辑
│   ├── performanceService.js  # 演出相关服务
│   └── userService.js         # 用户相关服务
├── database/        # 数据库相关
│   ├── migrations/  # 数据库迁移
│   └── seeders/     # 数据填充
├── utils/           # 工具函数
│   ├── logger.js    # 日志工具
│   └── validator.js # 数据验证
├── middleware/      # 中间件
│   ├── auth.js      # 认证中间件
│   └── error.js     # 错误处理
├── routes/          # 路由
│   ├── performances.js  # 演出相关路由
│   └── users.js         # 用户相关路由
└── app.js          # 应用入口文件
```

## 主要功能

1. 演出数据管理
   - 存储从大麦网和秀动网爬取的演出数据
   - 提供演出数据的CRUD接口
   - 支持演出数据的搜索和筛选

2. 用户数据管理
   - 用户注册和登录
   - 用户收藏演出
   - 用户订阅演出通知

## API 文档

### 演出相关接口

- GET /api/performances - 获取演出列表
- GET /api/performances/:id - 获取单个演出详情
- POST /api/performances - 创建新演出
- PUT /api/performances/:id - 更新演出信息
- DELETE /api/performances/:id - 删除演出

### 用户相关接口

- POST /api/users/register - 用户注册
- POST /api/users/login - 用户登录
- GET /api/users/favorites - 获取用户收藏的演出
- POST /api/users/favorites/:id - 收藏演出
- DELETE /api/users/favorites/:id - 取消收藏

## 环境变量

```env
# 服务器配置
NODE_ENV=development
PORT=8001
HOST=0.0.0.0

# 数据库配置
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=password
DB_NAME=sparklelive

# 跨域配置
CORS_ORIGIN=http://localhost:3000

# 文件上传配置
UPLOAD_PATH=./public/uploads
MAX_FILE_SIZE=5242880
```

## 开发指��

1. 安装依赖
```bash
npm install
```

2. 运行开发服务器
```bash
npm run dev
```

3. 数据库迁移
```bash
npm run migrate
```

4. 填充测试数据
```bash
npm run seed
``` 