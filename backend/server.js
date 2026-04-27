const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('./db');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const auth = require('./middleware/auth');
const morgan = require('morgan');
const logger = require('./utils/logger');
require('dotenv').config({ path: '../.env' });

process.on('uncaughtException', (err) => {
    logger.error('FATAL: Uncaught Exception', { error: err.message, stack: err.stack });
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    logger.error('FATAL: Unhandled Rejection at promise', { reason: reason });
    process.exit(1);
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const app = express();
app.use(cors());
app.use(express.json());

const morganFormat = ':method :url :status :res[content-length] - :response-time ms';
app.use(
    morgan(morganFormat, {
        stream: {
            write: (message) => logger.info(message.trim()),
        },
    })
);

app.post('/api/auth/register', async (req, res) => {
    try{
        const { email, password } = req.body;

        const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if(userExists.rows.length > 0){
            return res.status(400).json({ message: 'อีเมลนี้ถูกใช้งานแล้ว' });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = await pool.query(
            'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email',
            [email, passwordHash]
        );

        res.status(201).json({ message: 'ลงทะเบียนสำเร็จ', user: newUser.rows[0] });
    } catch (error) {
        logger.error('Registration failed', { error: error.message, stack: error.stack, event: 'register_error' });
        res.status(500).json({ message: 'Server Error' });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try{
        const { email, password } = req.body;

        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if(user.rows.length === 0){
            logger.warn('Login failed: User not found', { email, event: 'login_failed' });
            return res.status(400).json({ message: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' });
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].password_hash);
        if(!validPassword){
            logger.warn('Login failed: Invalid password', { email, event: 'login_failed' });
            return res.status(400).json({ message: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' });
        }

        const payload = {
            userId: user.rows[0].id,
            email: user.rows[0].email
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

        logger.info('Login successful', { userId: user.rows[0].id, event: 'login_success' });

        res.json({ message: 'เข้าสู่ระบบสำเร็จ', token });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

app.post('/api/auth/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if(user.rows.length === 0){
            return res.status(404).json({ message: 'ไม่พบอีเมลนี้ในระบบ' });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        const toKenExpiry = new Date(Date.now() + 3600000);

        await pool.query(
            'UPDATE users SET reset_token = $1, reset_token_expiry = $2 WHERE email = $3',
            [resetToken, toKenExpiry, email]
        );

        const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'รีเซ็ตรหัสผ่านของคุณ',
            html: `<p>คุณได้ขอรีเซ็ตรหัสผ่าน กรุณาคลิกที่ลิงก์ด้านล่างเพื่อตั้งรหัสผ่านใหม่:</p>
                   <a href="${resetLink}">${resetLink}</a>
                   <p>ลิงก์นี้จะหมดอายุใน 1 ชั่วโมง</p>`
        });

        res.json({ message: 'ส่งลิงก์รีเซ็ตรหัสผ่านไปยังอีเมลของคุณแล้ว' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

app.post('/api/auth/reset-password', async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        const user = await pool.query('SELECT * FROM users WHERE reset_token = $1 AND reset_token_expiry > NOW()', [token]);

        if(user.rows.length === 0){
            return res.status(400).json({ message: 'Token ไม่ถูกต้องหรือหมดอายุแล้ว' });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(newPassword, salt);

        await pool.query(
            'UPDATE users SET password_hash = $1, reset_token = NULL, reset_token_expiry = NULL WHERE id = $2',
            [passwordHash, user.rows[0].id]
        );

        res.json({ message: 'รีเซ็ตรหัสผ่านสำเร็จ คุณสามารถเข้าสู่ระบบด้วยรหัสผ่านใหม่ได้เลย' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Srever Error' });
    }
});

app.get('/api/auth/me', auth, async (req, res) => {
    try {
        const userId = req.user.userId;
        const user = await pool.query('SELECT id, email FROM users WHERE id = $1', [userId]);

        if(user.rows.length === 0){
            return res.status(404).json({ message: 'ไม่พบข้อมูลผู้ใช้งาน' });
        }

        res.json(user.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`, { event: 'server_start' }));