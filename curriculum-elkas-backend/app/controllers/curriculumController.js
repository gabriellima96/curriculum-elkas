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
      const { userId } = req;
      const { page } = req.query;

      if (!page || page < 1) {
        return res
          .status(400)
          .json({ stauts: 400, error: 'Não é possível obter uma página menor ou igual a 0' });
      }

      const totalDocuments = await Curriculum.countDocuments({ user: userId });

      if (!totalDocuments) {
        return res.status(204).json([]);
      }

      let totalPages = 0;
      if (!Number.isInteger(totalDocuments / 5)) {
        // eslint-disable-next-line radix
        totalPages = parseInt(totalDocuments / 5) + 1;
      } else {
        totalPages = totalDocuments / 5;
      }

      if (page - 1 > totalPages) {
        return res.status(204).json([]);
      }

      const curriculums = await Curriculum.find({ user: userId }, null, {
        skip: (page - 1) * 5,
        limit: 5,
      });

      return res.json({
        curriculums,
        totalPages,
      });
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
