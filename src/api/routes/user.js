const { isAdmin } = require('../../../middlewares/auth');
const { getUsers, register, login } = require('../controllers/user');
const usersRoutes = require('express').Router();

usersRoutes.get('/', getUsers);
usersRoutes.post('/register', register);
usersRoutes.post('/login', login);

module.exports = usersRoutes;
