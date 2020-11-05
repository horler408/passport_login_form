
// Welcome Page
exports.home =  (req, res) => res.render("home")

// Dashboard
exports.dashboard = (req, res) => {
  res.render("dashboard", {
    user: req.user,
  })
}  

