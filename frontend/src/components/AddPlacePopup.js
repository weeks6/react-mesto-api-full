import { useState } from 'react'

import PopupWithForm from './PopupWithForm'

export default function AddPlacePopup({ isOpened, onClose, onAddPlace }) {
  const [form, setForm] = useState({
    title: {
      value: '',
      validity: null,
      validtityMessage: '',
    },
    link: {
      value: '',
      validity: null,
      validtityMessage: '',
    },
  })

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

    onAddPlace({
      title: form.title.value,
      link: form.link.value,
    })
  }

  return (
    <PopupWithForm
      isOpened={isOpened}
      onClose={onClose}
      onSubmit={handleSubmit}
      name="add"
      title="Новое место"
      buttonText="Создать"
    >
      <div className="form__input-field">
        <input
          type="text"
          name="title"
          className="form__text-field"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
          value={form.title.value}
          onChange={handleChange}
        />
        <span className="form__input-error">{form.title.validtityMessage}</span>
      </div>

      <div className="form__input-field">
        <input
          type="url"
          name="link"
          className="form__text-field"
          placeholder="Ссылка на картинку"
          required
          value={form.link.value}
          onChange={handleChange}
        />
        <span className="form__input-error">{form.link.validtityMessage}</span>
      </div>
    </PopupWithForm>
  )
}
