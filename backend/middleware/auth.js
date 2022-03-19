
module.exports = {
    ensureAuth: (req, res, next) => {
      if (req.isAuthenticated()) 
      {
        if(req.user._id==req.body.userid && req.user.name==req.body.username)
        return next();
      }
      else res.redirect("/");
    },
    ensureGuest: (req, res, next) => {
      if (req.isAuthenticated()) res.redirect("/user/profile-page");
      else return next();
    },
    isAdmin: (req, res, next) => {
      if (req.session.isAdmin) return next();
      else res.redirect("/");
    },
  };