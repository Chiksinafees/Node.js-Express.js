const db = require("../util/dataBase");

const Cart = require("./cart");

module.exports = class Product {
  constructor(id, title, imageUrl, price, description) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save() {
    return db.execute(
      "INSERT INTO products(title,imageUrl, price, description) VALUES(?,?,?,?)",
      [this.title, this.imageUrl, this.price, this.description]
    );
  }

  edit(id) {
    console.log(
      "Values to be updated:",
      this.title,
      this.imageUrl,
      this.price,
      this.description,
      id
    );

    return db.execute(
      `UPDATE products 
         SET title = ?, imageUrl = ?, price = ?, description = ? 
         WHERE id = ?`,
      [this.title, this.imageUrl, this.price, this.description, id]
    );
  }

  static deleteProductById(id) {
    return db.execute("DELETE FROM products WHERE products.id=?", [id]);
  }

  static fetchAll() {
    return db.execute("SELECT * FROM products");
  }

  static findById(id) {
    return db.execute("SELECT * FROM products WHERE products.id=?", [id]);
  }
};
