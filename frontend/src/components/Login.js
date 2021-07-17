import { useState } from 'react'
import { useHistory } from 'react-router-dom'

function Login({ onLogin }) {
  const history = useHistory()

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

  const handleLogin = (evt) => {
    evt.preventDefault()

    onLogin({
      email: form.email.value,
      password: form.password.value,
    }).then(() => history.push('/'))
  }

  return (
    <main className="main container login">
      <h1 className="page__title login__title">Вход</h1>
      <form
        className="login__form"
        name="login-form"
        onSubmit={handleLogin}
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
          Войти
        </button>
      </form>
    </main>
  )
}

export default Login
