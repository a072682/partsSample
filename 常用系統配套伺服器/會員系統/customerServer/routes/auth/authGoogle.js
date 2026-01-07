const express = require('express');
const passport = require('passport');
const router = express.Router();
const pool = require('../../db/db');
const jwt = require('jsonwebtoken');

// 啟動 Google 登入
router.get('/login',
    //passport接手登入流程
    passport.authenticate('google', {
        scope: ['profile', 'email'],
        session: false,
        prompt: 'select_account',
        //每一次登入時都會重新登入google帳號
    })
);

// Google callback
//http://localhost:5173/google/callback
//組合完成的網址必須與GOOGLE_REDIRECT_URI相同
router.get(
    '/callback',
    passport.authenticate('google', {
        session: false,
        failureRedirect: 'http://localhost:5173/#',
        //「Google OAuth 驗證失敗時，瀏覽器要被導向哪裡」
    }),
    async (req, res) => {

        const { email, googleId } = req.user;

        try {
            // 查詢是否已有此 email
            const existing = await pool.query(
                `SELECT id, email, role, auth_provider FROM users WHERE email = $1`,
                [email]
            );

            let user;

            // 如果不存在則執行以下內容
            if (existing.rowCount === 0) {
                //將使用者資料寫入資料表
                const result = await pool.query(
                    `
                        INSERT INTO users (email, auth_provider, google_id, role)
                        VALUES ($1, 'google', $2, 'user')
                        RETURNING id, email, role
                    `,
                    [email, googleId]
                );
                user = result.rows[0];
            } else {
                // 已存在的話當作登入
                user = existing.rows[0];
            }

            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                    auth_provider: 'google',
                },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            //redirect 回前端成功頁
            res.redirect(`http://localhost:5173/#/常用系統範例/token?value=${encodeURIComponent(token)}`);

            } catch (error) {
                console.error("google會員註冊失敗",error);
                res.redirect('http://localhost:5173/#');
            }
    }
);

module.exports = router;
