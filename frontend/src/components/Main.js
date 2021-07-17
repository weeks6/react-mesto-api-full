import { useContext } from 'react'

import CurrentUserContext from '../contexts/CurrentUserContext'

import Card from './Card'

export default function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) {
  const user = useContext(CurrentUserContext)

  return (
    <main className="main container">
      <section className="profile">
        <div className="avatar">
          <img src={user?.avatar} className="avatar__image" alt={user?.name} />
          <button
            className="button avatar__edit"
            aria-label="Редактировать аватар"
            type="button"
            onClick={onEditAvatar}
          />
        </div>
        <div className="profile-info">
          <div className="profile-info__inner">
            <h1 className="profile-info__name">{user?.name}</h1>
            <button
              type="button"
              aria-label="Редактировать профиль"
              className="button button_type_edit"
              onClick={onEditProfile}
            />
          </div>
          <p className="profile-info__about">{user?.about}</p>
        </div>
        <button
          type="button"
          aria-label="Добавить"
          className="button button_type_add"
          onClick={onAddPlace}
        />
      </section>
      <section>
        <ul className="elements">
          {cards.map((card) => (
            <Card
              card={card}
              key={card._id}
              onCardClick={onCardClick}
              onDeleteClick={onCardDelete}
              onCardLike={onCardLike}
            />
          ))}
        </ul>
      </section>
    </main>
  )
}
