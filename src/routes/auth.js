const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { v4: uuidv4 } = require('uuid');

// 注册路由
router.post('/register', async (req, res) => {
  try {
    const { username, realName, password, avatar, slogan } = req.body;
    
    // 检查用户名是否已存在
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: '用户名已存在' });
    }

    // 密码加密
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // 生成唯一账号
    const accountId = uuidv4().substring(0, 8);

    // 创建新用户
    const user = await User.create({
      username,
      realName,
      password: hashedPassword,
      accountId,
      avatar,
      slogan
    });

    res.status(201).json({
      message: '注册成功',
      user: {
        id: user.id,
        username: user.username,
        accountId: user.accountId,
        realName: user.realName,
        avatar: user.avatar,
        slogan: user.slogan
      }
    });
  } catch (error) {
    res.status(500).json({ message: '服务器错误', error: error.message });
  }
});

// 登录路由
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // 查找用户
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: '用户名或密码错误' });
    }

    // 验证密码
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: '用户名或密码错误' });
    }

    // 生成JWT token
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      message: '登录成功',
      token,
      user: {
        id: user.id,
        username: user.username,
        accountId: user.accountId,
        realName: user.realName,
        avatar: user.avatar,
        slogan: user.slogan
      }
    });
  } catch (error) {
    res.status(500).json({ message: '服务器错误', error: error.message });
  }
});

module.exports = router; 