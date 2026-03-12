import { sequelize, Category, Product } from "./models/index.js";

async function testOneToMany() {
  try {
    await sequelize.authenticate();
    console.log("DB connected");

    await sequelize.sync();

    const category = await Category.create({
      name: "Cosmetics",
    });

    await Product.create({
      name: "iPhone",
      price: 1200,
      categoryName: "Cosmetics",
    });

    await Product.create({
      name: "Laptop",
      price: 2000,
      categoryName: "Cosmetics",
    });

    const result = await Category.findOne({
      where: { name: "Cosmetics" },
      include: Product,
    });

    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await sequelize.close();
    console.log("Connection closed");
  }
}

testOneToMany();
