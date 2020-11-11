
// Welcome Page
exports.home =  (req, res) => res.render("home")

// User Page
exports.users =  (req, res) => res.render("users")

// Dashboard
exports.dashboard = (req, res) => {
  res.render("dashboard", {
    user: req.user,
  })
}  

