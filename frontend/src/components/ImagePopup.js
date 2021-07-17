export default function ImagePopup({ selectedCard, onClose }) {

  return (
    <div
      className=
      {`popup ${selectedCard ? 'popup_opened' : ''}`}
    >
      <div className="image-popup__container">
        <button
          type="button"
          aria-label="Закрыть"
          className="button button_type_close"
          onClick={onClose}
        />
        <img
          src={selectedCard?.link}
          alt={selectedCard?.name}
          loading="lazy"
          className="image-popup__image"
        />
        <h2 className="image-popup__title">{selectedCard?.name}</h2>
      </div>
    </div>
  )
}
