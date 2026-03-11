import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Product = sequelize.define("Product", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },

  categoryName: {
    type: DataTypes.STRING,
    references: {
      model: "Categories",
      key: "name",
    },
  },
});

export default Product;
