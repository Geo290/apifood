const express = require('express');
const userCtrl = require( '../controllers/user.controllers.js');

const router = express.Router();

router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);

module.exports = router;