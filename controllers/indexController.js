
// Welcome Page
exports.home =  (req, res) => res.render("home")

//About Page
exports.about =  (req, res) => res.render("about")

// User Page
exports.users =  (req, res) => res.render("users")

// Dashboard
exports.dashboard = (req, res) => {
  res.render("dashboard", {
    user: req.user,
  })
}  

