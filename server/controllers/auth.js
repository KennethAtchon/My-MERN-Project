import jwt from 'jsonwebtoken';

// Verify the JWT's signature and check if it is still valid
export const validateJWT = (req, res, next) => {
  const token = req.headers['authorization'];
  if (token) {
    // Remove the 'Bearer ' prefix from the token
    const cleanToken = token.replace('Bearer ', '');
    // Verify the JWT
    jwt.verify(cleanToken, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: 'Invalid token' });
      } else {
        // Token is valid, save the decoded user information in the request object
        req.user = decoded;
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

