const mongoose = require('mongoose');

const Curriculum = mongoose.model('Curriculum');

module.exports = {
  async store(req, res, next) {
    try {
      const id = req.userId;

      const curriculum = await Curriculum.create({ ...req.body, user: id });

      return res.json(curriculum);
    } catch (error) {
      return next(error);
    }
  },

  async index(req, res, next) {
    try {
      return res.send();
    } catch (error) {
      return next(error);
    }
  },

  async show(req, res, next) {
    try {
      const { id } = req.params;

      const curriculum = await Curriculum.findById(id);

      if (!curriculum) {
        return res.status(404).json({ status: 404, error: 'Curriculum não encontrado' });
      }

      return res.json(curriculum);
    } catch (error) {
      return next(error);
    }
  },

  async update(req, res, next) {
    try {
      return res.send();
    } catch (error) {
      return next(error);
    }
  },

  async destroy(req, res, next) {
    try {
      return res.send();
    } catch (error) {
      return next(error);
    }
  },
};
