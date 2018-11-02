const mongoose = require('mongoose');

const User = mongoose.model('User');

module.exports = {
  async update(req, res, next) {
    try {
      const id = req.userId;
      const usernamePath = req.params.username;

      const {
        currentPassword, newPassword, name, username, email, personalInformation,
      } = req.body;

      const user = await User.findOneAndUpdate(
        usernamePath,
        { name, personalInformation },
        { new: true },
      );

      if (!user) {
        return res.status(404).json({ status: 404, error: 'Usuário não encontrado' });
      }

      if (user.id !== id) {
        return res
          .status(403)
          .json({ status: 403, error: 'Permissão negada para acessar esse usuário' });
      }

      if (currentPassword && newPassword && !(await user.compareHash(currentPassword))) {
        return res.status(401).json({ status: 401, error: 'Senha atual inválida' });
      }

      if (username && user.username !== username) {
        if (await user.findOne(username)) {
          return res
            .status(409)
            .json({ status: 409, error: 'Já existe um usuário com o username cadastrado' });
        }

        user.username = username;
      }

      if (email && email !== user.email) {
        if (await user.findOne(email)) {
          return res
            .status(400)
            .json({ status: 400, error: 'Já existe um usuário com o e-mail cadastrado' });
        }

        user.email = email;
      }

      if (newPassword) {
        user.password = newPassword;
      }

      await user.save();
      return res.json(user);
    } catch (error) {
      return next(error);
    }
  },

  async index(req, res, next) {
    try {
      const id = req.userId;
      const usernamePath = req.params.username;

      const user = await User.findOne(usernamePath);

      if (!user) {
        return res.status(404).json({ status: 404, error: 'Usuário não encontrado' });
      }

      if (user.id !== id) {
        return res
          .status(403)
          .json({ status: 403, error: 'Permissão negada para acessar esse usuário' });
      }

      return res.json(user);
    } catch (error) {
      return next(error);
    }
  },
};
