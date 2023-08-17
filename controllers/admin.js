const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  Product.create({
    title: title,
    imageUrl: imageUrl,
    price: price,
    description: description,
  })
    .then((result) => {
      // console.log(res);
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((product) => {
      res.render("admin/products", {
        prods: product,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  let editMode = req.query.edit;
  // console.log('edit', editMode)
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  // console.log('prodId', prodId)

  Product.findByPk(prodId)
    .then((product) => {
      console.log("qqqqqq", product);
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
      });
    })
    .catch((err) => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  console.log("iddddddddd", prodId);
  const updatedTitle = req.body.title;
  const updatedimageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDesc = req.body.description;

  Product.findByPk(prodId)
    .then((product) => {
      (product.title = updatedTitle),
        (product.imageUrl = updatedimageUrl),
        (product.price = updatedPrice),
        (product.description = updatedDesc);
      return product.save();
    })
    .then((result) => {
      console.log("product updated!!!!");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId)
    .then((product) => {
      return product.destroy();
    })
    .then((result) => {
      console.log(res, "deleted");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};
