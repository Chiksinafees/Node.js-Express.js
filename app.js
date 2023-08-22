const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const deleteController = require("./controllers/delete");

const sequalize = require("./util/dataBase");
const Product = require("./models/product");
const UserData = require("./models/userData");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
// const { userInfo } = require("os");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  // it run only when requested not with the initial app run,
  UserData.findByPk(1)
    .then((user) => {
      req.user = user; // it means when req is empty it get data from database via sequelize
      next(); // just to move to next line after completion of above line
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(deleteController.delete);
app.use(errorController.get404);

Product.belongsTo(UserData, { constraints: true, onDelete: "CASCADE" }); // onDelete= cascade means if userdata is deleted then all data associated with it also get deleted
UserData.hasMany(Product);
// constraints:true means create a relation between product and userdata

sequalize
  // .sync({force:true})  // force:true means to override existing table with new changes
  .sync()
  .then((result) => {
    // console.log(UserData.findByPk(1));
    return UserData.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return UserData.create({ name: "Dummy", email: "dummy@gmail.com" });
    }
    return user;
  })
  .then((result) => {
    console.log(result);
    app.listen(3000);
  })
  .catch((err) => console.log(err));
