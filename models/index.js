// import models
const Product = require("./models/Product");
const Category = require("./models/Category");
const Tag = require("./models/Tag");
const ProductTag = require("./models/ProductTag");

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: "categoryId", // This is the foreign key in the Product model
  onDelete: "CASCADE", // This will delete products when the category is deleted
});
// Categories have many Products
Category.hasMany(Product, {
  foreignKey: "categoryId", // This is the foreign key in the Product model
  onDelete: "CASCADE", // This will delete products when the category is deleted
});
// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: ProductTag, // This specifies the junction table
  foreignKey: "productId", // Foreign key in the ProductTag table
  otherKey: "tagId", // Foreign key in the ProductTag table
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag, // This specifies the junction table
  foreignKey: "tagId", // Foreign key in the ProductTag table
  otherKey: "productId", // Foreign key in the ProductTag table
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
