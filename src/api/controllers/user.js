const User = require('../models/user');
const bcrypt = require('bcrypt');
const { generateSign } = require('../../../config/jwt');

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json('Request error');
  }
};

const register = async (req, res, next) => {
  try {
    const newUser = new User({
      userName: req.body.userName,
      password: req.body.password,
      email: req.body.email,
      rol: 'user'
    });

    const duplicatedUser = await User.findOne({ userName: req.body.userName });

    if (duplicatedUser) {
      return res.status(400).json('This username already exists');
    }

    const savedUser = await newUser.save();
    return res.status(201).json(savedUser);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ userName: req.body.userName });
    if (!user) {
      return res.status(400).json('This user does not exist');
    }
    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = generateSign(user._id);
      return res.status(200).json({ user, token });
    } else {
      return res.status(400).json('Password incorrect');
    }
  } catch (error) {
    return res.status(400).json('Request error');
  }
};

module.exports = { getUsers, register, login };
