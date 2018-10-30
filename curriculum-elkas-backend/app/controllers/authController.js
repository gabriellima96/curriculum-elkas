const mongoose = require('mongoose');

const User = mongoose.model('User');

module.exports = {
  async signin(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ $or: [{ email }, { username: email }] });

      if (!user) {
        return res.status(404).json({ status: 404, error: 'E-mail/Usuário não encontrado' });
      }

      if (!(await user.compareHash(password))) {
        return res.status(400).json({ status: 400, error: 'Senha inválida' });
      }

      return res.json({
        user,
        token: user.generateToken(),
      });
    } catch (error) {
      return next(error);
    }
  },

  async signup(req, res, next) {
    try {
      const { email, username } = req.body;

      const userDB = await User.findOne({ $or: [{ email }, { username }] });

      if (userDB != null && userDB.email === email) {
        return res
          .status(400)
          .json({ status: 400, error: 'Já existe um usuário com o e-mail cadastrado' });
      }

      if (userDB != null && userDB.username) {
        return res
          .status(409)
          .json({ status: 409, error: 'Já existe um usuário com o username cadastrado' });
      }

      const user = await User.create(req.body);

      return res.json({
        user,
        token: user.generateToken(),
      });
    } catch (error) {
      return next(error);
    }
  },
};
