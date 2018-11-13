const mongoose = require('mongoose');

const Curriculum = mongoose.model('Curriculum');

module.exports = {
  /**
   * Método que cria um currículo.
   */
  async store(req, res, next) {
    try {
      const id = req.userId;

      const curriculum = await Curriculum.create({ ...req.body, user: id });

      return res.json(curriculum);
    } catch (error) {
      return next(error);
    }
  },
  /**
   * Método que busca os currículos por página.
   */
  async index(req, res, next) {
    try {
      const { userId } = req;
      const { page } = req.query;

      if (!page || page < 1) {
        return res.status(400).json({
          stauts: 400,
          error: 'Não é possível obter uma página menor ou igual a 0',
        });
      }

      const totalDocuments = await Curriculum.countDocuments({ user: userId });

      if (!totalDocuments) {
        return res.status(204).json([]);
      }

      let totalPages = 0;
      if (!Number.isInteger(totalDocuments / 3)) {
        // eslint-disable-next-line radix
        totalPages = parseInt(totalDocuments / 3) + 1;
      } else {
        totalPages = totalDocuments / 3;
      }

      if (page - 1 > totalPages) {
        return res.status(204).json([]);
      }

      const curriculums = await Curriculum.find({ user: userId }, null, {
        skip: (page - 1) * 3,
        limit: 3,
        sort: 'createdAt',
      });

      return res.json({
        curriculums,
        totalPages,
      });
    } catch (error) {
      return next(error);
    }
  },
  /**
   * Método que busca currículo por ID.
   */
  async show(req, res, next) {
    try {
      const { id } = req.params;

      const curriculum = await Curriculum.findOne({ _id: id });

      if (!curriculum) {
        return res.status(404).json({ status: 404, error: 'Curriculum não encontrado' });
      }

      return res.json(curriculum);
    } catch (error) {
      return next(error);
    }
  },
  /**
   * Método que atualiza um currículo por ID.
   */
  async update(req, res, next) {
    try {
      const { userId } = req;
      const { id } = req.params;

      const curriculum = await Curriculum.findOneAndUpdate(
        { $and: [{ _id: id }, { user: userId }] },
        req.body,
        { new: true },
      );

      if (!curriculum) {
        return res.status(400).json({ error: 'Currículo não encontrado' });
      }

      return res.json(curriculum);
    } catch (error) {
      return next(error);
    }
  },
  /**
   * Método que exclui um currículo por ID.
   */
  async destroy(req, res, next) {
    try {
      const { userId } = req;
      const { id } = req.params;

      await Curriculum.findOneAndRemove({ $and: [{ _id: id }, { user: userId }] });
      return res.json();
    } catch (error) {
      return next(error);
    }
  },
};
