const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('AnchorPoint', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        property_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        latitude: {
            type: DataTypes.DECIMAL(10, 8),
            allowNull: false
        },
        longitude: {
            type: DataTypes.DECIMAL(11, 8),
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('Pass', 'Fail', 'Pending'),
            defaultValue: 'Pending'
        },
        lastInspectionDate: {
            type: DataTypes.DATE,
            allowNull: true
        },
        nextInspectionDate: {
            type: DataTypes.DATE,
            allowNull: true
        },
        notes: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
        tableName: 'anchor_points',
        timestamps: true
    });
}; 