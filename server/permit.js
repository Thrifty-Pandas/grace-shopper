// middleware for doing role-based permissions
//expects allowed user roles as params and returns a middleware which will either
//pass to the next middleware or send a 403 based on the user role
const permit = (...allowed) => {
  const isAllowed = role => allowed.indexOf(role) > -1

  // return a middleware
  return (req, res, next) => {
    let userRole
    if (!req.user) userRole = 'Unauth_User'
    else if (req.user.isAdmin) userRole = 'Admin'
    else userRole = 'Auth_User'
    if (req.user && isAllowed(userRole)) next()
    else {
      // role is allowed, so continue on the next middleware
      res.status(403).json({message: 'Forbidden'}) // user is forbidden
    }
  }
}

module.exports = permit
