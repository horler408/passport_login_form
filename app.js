const express = require("express");
const expressLayouts = require("express-ejs-layouts");
//const bodyParser = require("body-parser");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");
const path = require('path');

const app = express();
const dbConnect = require('./config/remoteDb')

const indexRoute = require('./routes/indexRoute');
const userRoute = require('./routes/userRoute');

// Passport Config
require("./config/passport")(passport);

// DB Config
dbConnect()


//Static Files
app.use(express.static(path.join(__dirname, 'public')))

// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

// Express body parser
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// Routes
app.use("/", indexRoute);
app.use("/auth", userRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
