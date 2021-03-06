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

      const user = await User.findOne({ $and: [{ _id: id }, { username: usernamePath }] });

      if (!user) {
        return res.status(404).json({ status: 404, error: 'Usuário não encontrado' });
      }

      if (currentPassword && newPassword && !(await user.compareHash(currentPassword))) {
        return res.status(401).json({ status: 401, error: 'Senha atual inválida' });
      }

      if (username && user.username !== username) {
        if (await User.findOne({ username })) {
          return res
            .status(409)
            .json({ status: 409, error: 'Já existe um usuário com o username cadastrado' });
        }

        user.username = username;
      }

      if (email && email !== user.email) {
        if (await User.findOne({ email })) {
          return res
            .status(400)
            .json({ status: 400, error: 'Já existe um usuário com o e-mail cadastrado' });
        }

        user.email = email;
      }

      if (newPassword) {
        user.password = newPassword;
      }

      user.name = name;
      user.personalInformation = personalInformation;

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

      const user = await User.findOne({ username: usernamePath });

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

  /**
  * Método que exclui um usuário por username
  */
  async destroy(req, res, next) {
    try {
      const userId = req.userId;
      const user = await User.findOne({  _id: userId });
    
      if (!user) {
        return res.status(404).json({ status: 404, error: 'Usuário não encontrado!' });
      }
     
      const curriculum = await Curriculum.findOne({ user: userId });

      await Curriculum.findOneAndRemove({ user: userId});
      await User.findOneAndRemove({_id: userId});

      return res.json();
    } catch (error) {
      return next(error);
    }
  },
};
