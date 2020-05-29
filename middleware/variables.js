module.exports = function (req, res, next) {
  res.locals.isAuth = req.session.isAutenticated
  res.locals.csrf = req.csrfToken()
  next()
}