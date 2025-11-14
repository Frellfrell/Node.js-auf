import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Book = sequelize.define(
  "Book",
  {
    title: { type: DataTypes.STRING, allowNull: false },
    author: { type: DataTypes.STRING, allowNull: false },
    year: { type: DataTypes.INTEGER }
  },
  {
    tableName: "Books",
    timestamps: false
  }
);

export default Book;