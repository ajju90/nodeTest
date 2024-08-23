const pool = require('../config/db');

exports.storeGodownData = async (req, res) => {
    const godownData = req.body;

    if (!Array.isArray(godownData) || godownData.length === 0) {
        return res.status(400).json({ message: 'Invalid data format or empty array' });
    }

    try {
        const connection = await pool.getConnection();

        const query = `
            INSERT INTO godown_master (godown_Id, godown_Name, godown_Alias, godown_Parent, Cmp_Id, created_At, updated_At)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE 
                godown_Name = VALUES(godown_Name),
                godown_Alias = VALUES(godown_Alias),
                godown_Parent = VALUES(godown_Parent),
                updated_At = VALUES(updated_At)
        `;

        for (const godown of godownData) {
            const { godown_Id, godown_Name, godown_Alias, godown_Parent, Cmp_Id, created_At, updated_At } = godown;
            await connection.execute(query, [
                godown_Id, godown_Name, godown_Alias, godown_Parent, Cmp_Id, created_At, updated_At
            ]);
        }

        connection.release();
        return res.status(201).json({ message: 'Godown data stored successfully' });
    } catch (error) {
        console.error('Error storing godown data:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
