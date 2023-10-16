// authMiddleware.js
const jwt = require('jsonwebtoken');
const {promisify} = require('util');


  module.exports = {
    eAdmin: async function(req, res, next) {
      authHeader = req.headers.authorization;
      console.log(authHeader);
      if (!authHeader) {
        return res.status(401).json({ message: 'Necessario Realizar o login para acessar á página' });
      }
      const [bearer, token] = authHeader.split(' ');
      console.log("bearer: " + bearer + " token: " + token);

      if(!token) {
        return res.status(401).json({ message: 'Token não informado' });
      }
    } 
  }


  

 

 
