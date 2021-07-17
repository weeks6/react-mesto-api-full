import { useContext } from 'react'

import CurrentUserContext from '../contexts/CurrentUserContext'

export default function Card({ card, onCardClick, onDeleteClick, onCardLike }) {
  const { name, link, likes, owner } = card

  const user = useContext(CurrentUserContext)

  const isOwn = owner === user?._id
  const isLiked = likes?.some((i) => i === user?._id)

  function handleLikeClick() {
    onCardLike(card)
  }

  function handleDeleteClick() {
    onDeleteClick(card)
  }

  return (
    <li className="card">
      {isOwn && (
        <button
          className="button button_type_delete"
          type="button"
          aria-label="Удалить карточку"
          onClick={handleDeleteClick}
        />
      )}
      <img
        src={link}
        alt={name}
        className="card__image card__main-image"
        onClick={() => onCardClick(card)}
        onKeyDown={(evt) => evt.key === 'Enter' && onCardClick(card)}
      />
      <div className="card__info">
        <h2 className="card__title" title={name}>
          {name}
        </h2>
        <div className="card__like-wrapper">
          <button
            type="button"
            // @TODO: add different labels for different states of like
            aria-label="Поставить лайк карточке"
            className={`button button_type_like ${
              isLiked && 'button_type_like_active'
            }`}
            onClick={handleLikeClick}
          />
          <span className="card__like-counter">{likes?.length}</span>
        </div>
      </div>
    </li>
  )
}
