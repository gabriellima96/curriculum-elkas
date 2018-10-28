const mongoose = require('mongoose');

const User = mongoose.model('User');

module.exports = {
  async update(req, res, next) {
    try {
      const id = req.userId;

      const {
        currentPassword, newPassword, confirmPassword, name, personalInformation,
      } = req.body;

      if (newPassword && newPassword !== confirmPassword) {
        return res.status(401).json({ error: "Password doesn't match" });
      }

      const user = await User.findOneAndUpdate(id, { name, personalInformation }, { new: true });

      if (currentPassword && newPassword && !(await user.compareHash(currentPassword))) {
        return res.status(401).json({ error: 'Invalid current password' });
      }

      if (newPassword) {
        user.password = newPassword;
        await user.save();
      }

      return res.json(user);
    } catch (error) {
      return next(error);
    }
  },

  async index(req, res, next) {
    try {
      const id = req.userId;

      const user = await User.findById(id);

      return res.json(user);
    } catch (error) {
      return next(error);
    }
  },
};
