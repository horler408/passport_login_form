const bcrypt = require("bcryptjs");
const passport = require("passport");

const User = require("../models/User");


// Get Login Page
exports.signin =  (req, res) => res.render("login");

// Get Register Page
exports.signup = (req, res) => res.render("register");

// Post Registration
exports.register = (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  let errors = [];

  if (!first_name || last_name || !email || !password) {
    errors.push({ msg: "Please enter all fields" });
  }

  if (password.length < 8) {
    errors.push({ msg: "Password must be at least 8 characters" });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      first_name,
      last_name,
      email,
      password
    });
  } else {
    User.findOne({ email: email }).then((user) => {
      if (user) {
        errors.push({ msg: "Email already exists" });
        res.render("register", {
          errors,
          first_name,
          last_name,
          email,
          password
        });
      } else {
        const newUser = new User({
          first_name,
          last_name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => {
                req.flash(
                  "success_msg",
                  "You are now registered and can log in"
                );
                res.redirect("/users/login");
              })
              .catch((err) => console.log(err));
          });
        });
      }
    });
  }
}

// Login
exports.login = (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
}

// Logout
exports.logout = (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/users/login");
}

 //Delete User
 exports.deleteUser = (req, res) => {
    User.deleteOne({ _id: req.params.userId })
      .exec()
      .then(() => {
        res.status(200).json({
          message: "User Deleted Successfully!",
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  };
  
  exports.getUsers = (req, res) => {
    User.find().exec()
    .then(user => {
      res.status(200).json(user)
    })
    .catch(error => {
      res.status(400).json({
        error: error
      })
    })
  }