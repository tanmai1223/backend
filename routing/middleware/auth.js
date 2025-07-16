const isAuthenticated = (req, res, next) => {
  const Authenticated = false;

  if (Authenticated) {
    next();
  } else {
    res.status(401).json({"message":"Not Authenticated"})
  }
};

module.exports=isAuthenticated;