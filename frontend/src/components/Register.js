import { useState } from 'react'
import { NavLink } from 'react-router-dom'

function Register({ onRegister }) {
  const [form, setForm] = useState({
    email: {
      value: '',
      validity: null,
      validtityMessage: '',
    },
    password: {
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

  const handleRegister = (evt) => {
    evt.preventDefault()

    onRegister(form.email.value, form.password.value)
  }

  return (
    <main className="main container login">
      <h1 className="page__title login__title">Регистрация</h1>
      <form
        className="login__form"
        name="login-form"
        onSubmit={handleRegister}
        noValidate
      >
        <div className="form__input-field form__input-field_variant_dark">
          <input
            type="email"
            name="email"
            className="form__text-field"
            placeholder="Email"
            minLength="2"
            maxLength="30"
            required
            value={form.email.value}
            onChange={handleChange}
          />
          <span className="form__input-error">
            {form.email.validtityMessage}
          </span>
        </div>

        <div className="form__input-field form__input-field_variant_dark">
          <input
            type="password"
            name="password"
            className="form__text-field"
            placeholder="Пароль"
            required
            value={form.password.value}
            onChange={handleChange}
            minLength={8}
          />
          <span className="form__input-error">
            {form.password.validtityMessage}
          </span>
        </div>
        <button
          className="button button_type_save button_variant_light"
          type="submit"
        >
          Зарегистрироваться
        </button>
      </form>
      <div className="login__message">
        <span className="link">Уже зарегистрированы? </span>
        <NavLink className="link" to="/sign-in">
          Войти
        </NavLink>
      </div>
    </main>
  )
}

export default Register
