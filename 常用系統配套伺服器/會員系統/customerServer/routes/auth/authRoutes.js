const express = require('express');
const { registerUser, loginUser, logInCheck, logout } = require('../../controllers/auth/authController');
const verifyTokenData = require('../../middlewares/verifyTokenData');
const allowRoles = require('../../middlewares/allowRoles');


const router = express.Router();

//註冊會員
router.post('/register', registerUser);

//會員登入
router.post('/login', loginUser);  

//確認登入
router.post('/logInCheck', verifyTokenData, allowRoles('admin','user','vip','vendor'), logInCheck);

//登出
router.post('/logout', verifyTokenData, logout);

module.exports = router;
