const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const authConfig = require('../../config/auth');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ status: 401, error: 'Nenhum token fornecido' });
  }

  const parts = authHeader.split(' ');
  if (!parts.length === 2) {
    return res.status(401).json({ status: 401, error: 'Nenhum token fornecido' });
  }

  const [scheme, token] = parts;
  if (scheme !== 'Bearer') {
    return res.status(401).json({ status: 401, error: 'Token malformatado' });
  }

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;

    return next();
  } catch (error) {
    return res.status(401).json({ status: 401, error: 'Token inválido' });
  }
};
