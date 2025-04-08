const { DataTypes } = require('sequelize');

const User = {
    tableName: 'users',
    columns: {
        id: 'INT PRIMARY KEY AUTO_INCREMENT',
        username: 'VARCHAR(255) NOT NULL UNIQUE',
        email: 'VARCHAR(255) NOT NULL UNIQUE',
        password: 'VARCHAR(255) NOT NULL',
        first_name: 'VARCHAR(255) NOT NULL',
        last_name: 'VARCHAR(255) NOT NULL',
        phone_number: 'VARCHAR(20)',
        role: "ENUM('viewer', 'staff', 'contractor', 'admin') DEFAULT 'viewer'",
        created_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
        updated_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
    }
};

module.exports = User;
