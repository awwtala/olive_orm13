// import models
const Product = require("./Product");
const Category = require("./Category");
const Tag = require("./Tag");
const ProductTag = require("./ProductTag");

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: "categoryId", // This is the foreign key in the Product model
  onDelete: "CASCADE", // This will delete products when the category is deleted
});
// Categories have many Products
Category.hasMany(Product, {
  foreignKey: "categoryId",
  onDelete: "CASCADE",
});
// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: "productId",
  otherKey: "tagId", // Foreign key in the ProductTag table
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: "tagId",
  otherKey: "productId",
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
