const Performance = require('../models/Performance');
const Show = require('../models/Show');
const { Op } = require('sequelize');

// 获取演出列表
exports.getPerformances = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 1000,
      artist,
      source,
      startDate,
      endDate,
      status,
      city
    } = req.query;

    const where = {};
    if (artist) {
      console.log('搜索艺人:', artist);
      where.artist = artist.trim();
    }
    if (source) where.source = source;
    if (status) where.status = status;
    if (city) where.city = city;
    if (startDate || endDate) {
      where.date = {};
      if (startDate) where.date[Op.gte] = new Date(startDate);
      if (endDate) where.date[Op.lte] = new Date(endDate);
    }

    console.log('查询条件:', where);

    const performances = await Show.findAndCountAll({
      attributes: [
        'id',
        'name',
        'artist',
        'tag',
        'city',
        'venue',
        'lineup',
        'date',
        'price',
        'status',
        'detail_url',
        'poster',
        'created_at'
      ],
      where,
      limit: parseInt(limit),
      offset: (parseInt(page) - 1) * parseInt(limit),
      order: [['date', 'ASC']]
    });

    res.json({
      success: true,
      data: performances.rows,
      total: performances.count,
      page: parseInt(page),
      totalPages: Math.ceil(performances.count / parseInt(limit))
    });
  } catch (error) {
    console.error('获取演出列表失败:', error);
    res.status(500).json({
      success: false,
      message: '获取演出列表失败'
    });
  }
};

// 获取单个演出详情
exports.getPerformance = async (req, res) => {
  try {
    const performance = await Performance.findByPk(req.params.id);
    if (!performance) {
      return res.status(404).json({
        success: false,
        message: '演出不存在'
      });
    }
    res.json({
      success: true,
      data: performance
    });
  } catch (error) {
    console.error('获取演出详情失败:', error);
    res.status(500).json({
      success: false,
      message: '获取演出详情失败'
    });
  }
};

// 创建新演出
exports.createPerformance = async (req, res) => {
  try {
    const performance = await Performance.create(req.body);
    res.status(201).json({
      success: true,
      data: performance
    });
  } catch (error) {
    console.error('创建演出失败:', error);
    res.status(500).json({
      success: false,
      message: '创建演出失败'
    });
  }
};

// 更新演出信息
exports.updatePerformance = async (req, res) => {
  try {
    const performance = await Performance.findByPk(req.params.id);
    if (!performance) {
      return res.status(404).json({
        success: false,
        message: '演出不存在'
      });
    }
    await performance.update(req.body);
    res.json({
      success: true,
      data: performance
    });
  } catch (error) {
    console.error('更新演出失败:', error);
    res.status(500).json({
      success: false,
      message: '更新演出失败'
    });
  }
};

// 删除演出
exports.deletePerformance = async (req, res) => {
  try {
    const performance = await Performance.findByPk(req.params.id);
    if (!performance) {
      return res.status(404).json({
        success: false,
        message: '演出不存在'
      });
    }
    await performance.destroy();
    res.json({
      success: true,
      message: '演出已删除'
    });
  } catch (error) {
    console.error('删除演出失败:', error);
    res.status(500).json({
      success: false,
      message: '删除演出失败'
    });
  }
}; 