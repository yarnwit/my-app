const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('./db');
require('dotenv').config({ path: '../.env' });

const app = express();
app.use(cors());
app.use(express.json());

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
        console.error(error.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try{
        const { email, password } = req.body;

        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if(user.rows.length === 0){
            return res.status(400).json({ message: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' });
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].password_hash);
        if(!validPassword){
            return res.status(400).json({ message: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' });
        }

        const payload = {
            userId: user.rows[0].id,
            email: user.rows[0].email
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.json({ message: 'เข้าสู่ระบบสำเร็จ', token });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));