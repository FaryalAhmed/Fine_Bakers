function sessionAuth(req, res, next) {
    res.locals.user = req.session.user;
    if(req.session.user)
    { res.locals.user.admin = req.session.user.admin;}

   
    next();
  }
  
  module.exports = sessionAuth;