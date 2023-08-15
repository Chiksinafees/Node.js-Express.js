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
  const product = new Product(null, title, imageUrl, price, description);
  product
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([rows]) => {
      res.render("admin/products", {
        prods: rows,
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

  Product.findById(prodId)
    .then(([product]) => {
      console.log("qqqqqq", product);
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product[0],
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
  const updatedProducts = new Product(
    prodId,
    updatedTitle,
    updatedimageUrl,
    updatedPrice,
    updatedDesc
  );
  updatedProducts
    .edit(prodId)
    .then(() => {
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  console.log("prodId", prodId);

  Product.deleteProductById(prodId)
    .then(() => {
      res.redirect(`/delete/${prodId}`);
    })
    .catch((err) => console.log(err));
};
