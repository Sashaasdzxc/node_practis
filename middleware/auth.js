module.exports = function (req, res, next) {
  if(!req.session.isAutenticated){
    return res.redirect('/auth/login')
  }
  next()
}