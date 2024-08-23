const express = require('express');
const authRoutes = require('./routes/authRoutes');
const godownRoutes = require('./routes/godownRoutes');
const authenticateToken = require('./middleware/authMiddleware');

const app = express();
const port = 3000;

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/api', authenticateToken, godownRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// CREATE TABLE `users` (
//     `admin_User` varchar(255) NOT NULL,
//     `admin_Pws` varchar(255) DEFAULT NULL,
//     PRIMARY KEY (`admin_User`)
