const mongoose = require('mongoose');

const User = mongoose.model('User');

module.exports = {
  async signin(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.json({ status: 400, code: 2, error: 'User not found' });
      }

      if (!(await user.compareHash(password))) {
        return res.json({ status: 400, code: 3, error: 'Invalid password' });
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
      const { email } = req.body;

      if (await User.findOne({ email })) {
        return res.status(400).json({ status: 400, code: 1, error: 'User already exists' });
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
