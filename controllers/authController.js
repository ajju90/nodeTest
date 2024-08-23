const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool = require('../config/db');
const jwtSecret = 'dfgxndhfjvznbcvzddmnbfcnvbxcmgvbzmfcbgvfnvmzfbvldnfv';

exports.register = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        const connection = await pool.getConnection();

        const [existingUser] = await connection.execute('SELECT * FROM users WHERE admin_User = ?', [username]);

        if (existingUser.length > 0) {
            return res.status(409).json({ message: 'Username already taken' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await connection.execute('INSERT INTO users (admin_User, admin_Pws) VALUES (?, ?)', [username, hashedPassword]);

        connection.release();
        return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        const connection = await pool.getConnection();

        const [rows] = await connection.execute('SELECT * FROM users WHERE admin_User = ?', [username]);

        connection.release();

        if (rows.length === 0) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const user = rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.admin_Pws);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const token = jwt.sign({ id: user.admin_Id, username: user.admin_User }, jwtSecret, { expiresIn: '1h' });

        return res.json({ token });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};