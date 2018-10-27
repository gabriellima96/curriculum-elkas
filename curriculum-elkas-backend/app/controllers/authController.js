const mongoose = require('mongoose');

const User = mongoose.model('User');

module.exports = {
  async signup(req, res, next) {
    try {
      const { email } = req.body;

      if (await User.findOne({ email })) {
        return res.status(400).json({ status: 400, code: 1, error: 'User already exists' });
      }

      const user = await User.create(req.body);

      return res.json(user);
    } catch (error) {
      return next(error);
    }
  },
};
