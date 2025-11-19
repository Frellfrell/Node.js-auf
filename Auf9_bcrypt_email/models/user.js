import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mustChangePassword: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  role: {
    type: DataTypes.ENUM('user', 'admin'),
    defaultValue: 'user',
  } 
   },
  {
    tableName: 'users',      // название таблицы в базе
    timestamps: true,        // в таблице есть createdAt/updatedAt
    freezeTableName: true    // чтобы Sequelize не менял название таблицы
  }
);

export default User;