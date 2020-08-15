var createError = require("http-errors");
var express = require("express");
var mongoose = require("mongoose");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var config = require("config");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var galleryRouter = require("./routes/gallery");
var cupcakesRouter = require("./routes/cupcake");
var bakeryItems = require("./routes/bakeryItems");
var cstCakes = require("./routes/customCake");
const session = require("express-session");
var MongoConnect = require("connect-mongo")(session);

var app = express();
if (!config.get("jwtPrivateKey")) {
      console.error("FATAL ERROR: jwtPrivateKey is not defined.");
      process.exit(1);
}

mongoose
      .connect("mongodb://localhost/Bakery", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
      })
      .then(() => console.log("Connected to MongoDB..."))
      .catch((err) => console.error("Could not connect to MongoDB..."));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
      session({
            secret: "mysupersecret",
            resave: false,
            saveUninitialized: false,
            cookie:{maxAge:90 * 60 * 1000}
      })
);
app.use(express.static(path.join(__dirname, "public")));
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/Gallery", galleryRouter);
app.use("/Cupcakes", cupcakesRouter);
app.use("/BakeryProducts", bakeryItems);
app.use("/CustomizedCakes", cstCakes);



app.use((req,res,next)=>
{
      res.locals.session = req.session;
      next();
});
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
