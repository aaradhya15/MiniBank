const jwt = require("jsonwebtoken");
const { request } = require("express");

module.exports = function authenticateToken(req, res, next) {
  if(req.method ==='OPTIONS')
  next();
  const authHeader = req.headers['authorization'];
    //console.log(authHeader);
    const token = authHeader && authHeader.split(' ')[1];
    //console.log(token)
    if (token == null) return res.sendStatus(401) 
  
    jwt.verify(token, "secret", (err, user) => {
      console.log(err)
      if (err) return res.sendStatus(403)
      req.user = user
      //console.log(req.user);
      next() 
    });
  }