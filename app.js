const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const deleteController = require("./controllers/delete");

const db = require('./util/database')

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

db.execute('SELECT * FROM products')
app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(deleteController.delete);
app.use(errorController.get404);

app.listen(3000);
