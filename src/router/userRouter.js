const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.post('/users', userController.CreateUser);

module.exports = router;