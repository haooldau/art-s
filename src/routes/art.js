const express = require('express');
const router = express.Router();
const artController = require('../controllers/artController');

// 获取艺人报价
router.get('/:artistName', artController.getArtistPrice);

// 设置艺人报价
router.post('/price', artController.setArtistPrice);

module.exports = router; 