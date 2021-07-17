const Card = require('../models/card');

const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');
const ValidationError = require('../errors/validation-error');
const BadError = require('../errors/bad-error');

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({}).populate(['likes', 'owner']);

    res.send(cards);
  } catch (err) {
    next(err);
  }
};

const createCard = async (req, res, next) => {
  const card = {
    name: req.body.name,
    link: req.body.link,
    owner: req.user._id,
  };

  try {
    const createdCard = await Card.create([card], {
      runValidators: true,
    });
    res.status(201).send(createdCard);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new ValidationError(err.message));
    }

    next(err);
  }
};

const deleteCard = async (req, res, next) => {
  const { _id } = req.user;
  const { cardId } = req.params;
  try {
    const cardToDelete = await Card.findOne({ _id: cardId });

    if (!cardToDelete) {
      throw new NotFoundError('Карточка не найдена');
    }

    if (cardToDelete.owner.toString() !== _id) {
      throw new ForbiddenError('Нет прав');
    }

    const deletedCard = await Card.deleteOne({ _id: cardId }).orFail();
    res.send(deletedCard);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadError('С запросом что-то не так'));
    }

    next(err);
  }
};

const setCardLike = async (req, res, next) => {
  const { _id } = req.user;
  const { cardId } = req.params;
  try {
    const likedCard = await Card.findByIdAndUpdate(
      cardId,
      {
        $addToSet: { likes: _id },
      },
      { new: true },
    );

    if (!likedCard) {
      throw new NotFoundError('Карточка не найдена');
    }

    res.status(200).send(likedCard);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadError('С запросом что-то не так'));
    }
    next(err);
  }
};

const removeCardLike = async (req, res, next) => {
  const { _id } = req.user;
  const { cardId } = req.params;
  try {
    const card = await Card.findByIdAndUpdate(
      cardId,
      {
        $pull: { likes: _id },
      },
      { new: true },
    );

    if (!card) {
      throw new NotFoundError('Карточка не найдена');
    }

    res.status(200).send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadError('С запросом что-то не так'));
    }
    next(err);
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  setCardLike,
  removeCardLike,
};
