import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import api from '../utils/api'
import CurrentUserContext from '../contexts/CurrentUserContext'

import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm'
import ImagePopup from './ImagePopup'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import ProtectedRoute from './ProtectedRoute'
import InfoTooltip from './InfoTooltip'

import Register from './Register'
import Login from './Login'

import {
  getAccessToken,
  getUserInfo,
  setAccessToken,
  signIn,
  signOut,
  signUp,
} from '../utils/auth'

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [cards, setCards] = useState([])

  useEffect(() => {
    if (getAccessToken()) {
      api
        .fetchCards()
        .then((fetchedCards) => setCards(fetchedCards.data))
        .catch((err) => console.log(err))

      getUserInfo()
        .then((userRes) => setCurrentUser(userRes.data))
        .catch((err) => console.log(err))
    }
  }, [])

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(
    false
  )

  const [infoTooltip, setInfoTooltip] = useState({
    open: false,
    state: false,
  })
  const [selectedCard, setSelectedCard] = useState(null)

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleDeleteClick() {
    setIsConfirmDeletePopupOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsConfirmDeletePopupOpen(false)
    setInfoTooltip((state) => ({
      ...state,
      open: false,
    }))
    setSelectedCard(null)
  }

  function handleUpdateUser({ name, about }) {
    api
      .updateUserInfo(name, about)
      .then((user) => {
        setCurrentUser(user.data)
        closeAllPopups()
      })
      .catch((err) => console.log(err))
  }

  function handleAvatarUpdate({ avatar }) {
    api
      .updateUserAvatar(avatar)
      .then((user) => {
        setCurrentUser(user.data)
        closeAllPopups()
      })
      .catch((err) => console.log(err))
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id)

    api
      .changeCardLikeStatus(card._id, isLiked)
      .then((newCard) =>
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard.data : c))
        )
      )
      .catch((err) => console.log(err))
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => setCards((state) => state.filter((c) => c._id !== card._id)))
      .catch((err) => console.log(err))
  }

  function handleAddPlaceSubmit({ title, link }) {
    // TODO: fix naming to be uniform
    api
      .createCard({ name: title, link })
      .then((card) => {
        setCards([card.data, ...cards])
        closeAllPopups()
      })
      .catch((err) => console.log(err))
  }

  function handleSignIn({ email, password }) {
    return signIn(email, password)
      .then((res) => {
        if (res.token) {
          setAccessToken(res.token)
          api.setAuthHeader()
          getUserInfo()
            .then((userRes) => setCurrentUser(userRes.data))
            .catch((err) => console.log(err))
          api
            .fetchCards()
            .then((fetchedCards) => setCards(fetchedCards.data))
            .catch((err) => console.log(err))
        }
      })
      .catch((err) => console.log(err))
  }

  function handleSignOut() {
    signOut()
    setCurrentUser(null)
  }

  function handleSignUp(email, password) {
    signUp(email, password)
      .then((res) => {
        setInfoTooltip({
          open: true,
          state: true,
        })
        return res
      })
      .catch((err) => {
        setInfoTooltip({
          open: true,
          state: false,
        })

        console.log(err)
      })
  }

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Header onSignOut={handleSignOut} />
          <Switch>
            <Route path="/sign-up">
              <Register onRegister={handleSignUp} />
            </Route>
            <Route path="/sign-in">
              <Login onLogin={handleSignIn} />
            </Route>
            <ProtectedRoute exact path="/">
              <Main
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onDeleteClick={handleDeleteClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
              />
            </ProtectedRoute>
          </Switch>

          <Footer />

          <EditProfilePopup
            isOpened={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <EditAvatarPopup
            isOpened={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onAvatarUpdate={handleAvatarUpdate}
          />

          <AddPlacePopup
            isOpened={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          <PopupWithForm
            isOpened={isConfirmDeletePopupOpen}
            onClose={closeAllPopups}
            title="Вы уверены?"
            name="confirm-delete"
            buttonText="Да"
          />

          <InfoTooltip
            isOpened={infoTooltip.open}
            name="infoTooltip"
            success={infoTooltip.state}
            onClose={closeAllPopups}
          />

          <ImagePopup selectedCard={selectedCard} onClose={closeAllPopups} />
        </div>
      </CurrentUserContext.Provider>
    </Router>
  )
}

export default App
