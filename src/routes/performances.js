const express = require('express');
const router = express.Router();
const performanceController = require('../controllers/performanceController');

// 获取演出列表
router.get('/', performanceController.getPerformances);

// 获取单个演出详情
router.get('/:id', performanceController.getPerformance);

// 创建新演出
router.post('/', performanceController.createPerformance);

// 更新演出信息
router.put('/:id', performanceController.updatePerformance);

// 删除演出
router.delete('/:id', performanceController.deletePerformance);

module.exports = router; 