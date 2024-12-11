require('dotenv').config();
const sequelize = require('../config/database');
const Performance = require('../models/Performance');

const sampleData = [
  {
    title: '2024张远演唱会',
    artist: '张远',
    venue: '上海梅赛德斯奔驰文化中心',
    date: '2024-03-23T19:30:00',
    price: {
      "A": 1080,
      "B": 780,
      "C": 580,
      "D": 380
    },
    description: '张远2024巡回演唱会上海站',
    source: 'damai',
    sourceUrl: 'https://detail.damai.cn/item.htm?id=123456',
    status: 'upcoming'
  },
  {
    title: '陈楚生「你还好吗」2024巡回演唱会',
    artist: '陈楚生',
    venue: '北京工人体育馆',
    date: '2024-04-13T19:30:00',
    price: {
      "A": 1280,
      "B": 980,
      "C": 680,
      "D": 480
    },
    description: '陈楚生2024巡回演唱会北京站',
    source: 'showstart',
    sourceUrl: 'https://www.showstart.com/event/123456',
    status: 'upcoming'
  }
];

async function seed() {
  try {
    // 清空现有数据
    await Performance.destroy({ where: {} });
    
    // 插入示例数据
    await Performance.bulkCreate(sampleData);
    
    console.log('数据填充完成');
    process.exit(0);
  } catch (error) {
    console.error('数据填充失败:', error);
    process.exit(1);
  }
}

seed(); 