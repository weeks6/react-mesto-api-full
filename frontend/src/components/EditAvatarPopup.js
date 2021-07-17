import React, { useRef } from 'react'
import PopupWithForm from './PopupWithForm'

function EditAvatarPopup({ isOpened, onClose, onAvatarUpdate }) {
  const avatarRef = useRef(null)

  function handleSubmit(evt) {
    evt.preventDefault()

    onAvatarUpdate({
      avatar: avatarRef.current.value,
    })
  }

  return (
    <PopupWithForm
      isOpened={isOpened}
      onClose={onClose}
      onSubmit={handleSubmit}
      name="avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
    >
      <div className="form__input-field">
        <input
          type="url"
          className="form__text-field"
          name="fieldAvatar"
          placeholder="Ссылка на картинку"
          ref={avatarRef}
          required
        />
        {/* <span className="form__input-error">
          {avatarRef.current.validationMessage}
        </span> */}
      </div>
    </PopupWithForm>
  )
}

export default EditAvatarPopup
