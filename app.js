const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
require("dotenv").config();

const connectDB = require("./config/connection");

const adminRouter = require("./routes/admin");
const productRouter = require("./routes/product");
const customerRouter = require("./routes/customer");
const categoriesRouter = require("./routes/category");

const app = express();

connectDB();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

//cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type, Accept, Authorization",
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,GET");
    return res.status(200).json();
  }
  next();
});

app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  }),
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: "application/*+json" }));
// app.use(bodyParser.urlencoded({ extended: true }));
// parse some custom thing into a Buffer
app.use(bodyParser.raw({ type: "application/vnd.custom-type" }));
// parse an HTML body into a string
app.use(bodyParser.text({ type: "text/html" }));

app.use("/admin", adminRouter);
app.use("/product", productRouter);
app.use("/customer", customerRouter);
app.use("/category", categoriesRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
