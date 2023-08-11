exports.delete = (req, res, next) => {
  const prodId = req.body.productId;
  res.render("del", { pageTitle: `DELETED`, path: `/delete/${prodId}` });
};
