const express = require('express');
const router = express.Router();
const { middleware } = require('../config/middleware');
const usercontroller = require('../controllers/usercontroller');
router.post('/register', usercontroller.regster);
router.post('/login', usercontroller.loginUser);
router.use('/user', middleware, require('./user'));
router.use('/recipe', middleware, require('./recipe'));

module.exports = router;