import sequelize from "../config/db.js";

import Category from "./category.js";
import Product from "./product.js";

Category.hasMany(Product, {
  foreignKey: "categoryName",
  sourceKey: "name",
});

Product.belongsTo(Category, {
  foreignKey: "categoryName",
  targetKey: "name",
});

export { sequelize, Category, Product };
