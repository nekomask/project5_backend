const jwt = require('jsonwebtoken');

const jwtMiddleware = (req, res, next) => {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
      return res.status(401).send({
          success: false,
          data: 'Access denied. No token provided.'
      });
  }

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
  } catch (err) {
      res.status(400).send({
          success: false,
          data: 'Invalid token.'
      });
  }
};

module.exports = jwtMiddleware;
