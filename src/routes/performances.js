const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const performanceController = require('../controllers/performanceController');

// 配置文件上传
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

// 路由
router.get('/', performanceController.getAllPerformances);
router.post('/', upload.single('poster'), performanceController.createPerformance);

module.exports = router; 