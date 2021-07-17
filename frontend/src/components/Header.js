import { useContext } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

import CurrentUserContext from '../contexts/CurrentUserContext'

export default function Header({ onSignOut }) {
  const user = useContext(CurrentUserContext)
  const location = useLocation()

  return (
    <header className="header container">
      <NavLink
        to="/"
        className="header__logo"
        target="_self"
        title="Главная страница Mesto"
      >
        <span className="header__logo_type_sr">Главная страница Mesto</span>
      </NavLink>
      {!user && location.pathname === '/sign-in' && (
        <NavLink to="/sign-up" className="link">
          Регистрация
        </NavLink>
      )}
      {!user && location.pathname === '/sign-up' && (
        <NavLink to="/sign-in" className="link">
          Войти
        </NavLink>
      )}
      {user && (
        <>
          <span className="profile-info__email">{user.email}</span>
          <button
            type="button"
            className="button button_type_basic"
            onClick={onSignOut}
          >
            Выйти
          </button>
        </>
      )}
    </header>
  )
}
