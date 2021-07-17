import { useContext, useState, useEffect } from 'react'
import PopupWithForm from './PopupWithForm'

import CurrentUserContext from '../contexts/CurrentUserContext'

function EditProfilePopup({ isOpened, onClose, onUpdateUser }) {
  const user = useContext(CurrentUserContext)

  const [form, setForm] = useState({
    name: {
      value: '',
      validity: null,
      validtityMessage: '',
    },
    about: {
      value: '',
      validity: null,
      validtityMessage: '',
    },
  })

  useEffect(() => {
    setForm({
      name: {
        value: user?.name,
        validity: true,
        validtityMessage: '',
      },
      about: {
        value: user?.about,
        validity: true,
        validtityMessage: '',
      },
    })
  }, [user, isOpened])

  const handleChange = (evt) => {
    setForm({
      ...form,
      [evt.target.name]: {
        value: evt.target.value,
        validity: evt.target.validity,
        validtityMessage: evt.target.validationMessage,
      },
    })
  }

  function handleSubmit(evt) {
    evt.preventDefault()

    onUpdateUser({
      name: form.name.value,
      about: form.about.value,
    })
  }

  return (
    <PopupWithForm
      isOpened={isOpened}
      onClose={onClose}
      onSubmit={handleSubmit}
      name="edit"
      title="Редактировать профиль"
      buttonText="Сохранить"
    >
      <div className="form__input-field">
        <input
          type="text"
          className="form__text-field"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          required
          name="name"
          value={form.name.value || ''}
          onChange={handleChange}
        />
        <span className="form__input-error">{form.name.validtityMessage}</span>
      </div>

      <div className="form__input-field">
        <input
          type="text"
          className="form__text-field"
          placeholder="О себе"
          minLength="2"
          maxLength="200"
          required
          name="about"
          value={form.about.value || ''}
          onChange={handleChange}
        />
        <span className="form__input-error">{form.about.validtityMessage}</span>
      </div>
    </PopupWithForm>
  )
}

export default EditProfilePopup
