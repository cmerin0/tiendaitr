const express = require("express");
const morgan = require("morgan");
const mysql = require("mysql");
const path = require("path");
const myConnection = require("express-myconnection");
const app = express();
const productoRoutes = require("./routes/producto.routes");

//Settings
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//Middleware (peticiones antes de las peticiones de los usuarios)
app.use(morgan("dev"));
app.use(
  myConnection(
    mysql,
    {
      host: "localhost",
      user: "root",
      password: "",
      database: "tiendaitr",
      port: 3306,
    },
    "single"
  )
);
app.use(express.urlencoded({ extended: false }));

//Customer Routes
app.use("/", productoRoutes);

//Starting server
app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});
