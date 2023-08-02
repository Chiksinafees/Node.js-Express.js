const Product = require("../models/singleProduct");

exports.getAddProductPage = (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

exports.postAddProducts = (req, res, next) => {
  const singleProduct = new Product(req.body.title);
  singleProduct.save();
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((totalProducts) => {
    res.render("shop", {
      prods: totalProducts,
      pageTitle: "Shop",
      path: "/",
      hasProducts: totalProducts.length > 0,
      activeShop: true,
      productCSS: true,
    });
  });
};
