const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const bycrypt = require('bcryptjs');

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

User.beforeCreate( async (user) => {
    const salt = await bycrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
});

module.exports = User;