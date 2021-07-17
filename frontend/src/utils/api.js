import { baseUrl, AUTH_ENDPOINT } from './constants'
import checkResponse from './checkResponse'
import { getAccessToken } from './auth'

class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl
    this.headers = options.headers

    this.setAuthHeader()
  }

  setAuthHeader() {
    this.headers.Authorization = `Bearer ${getAccessToken()}`
  }

  updateUserInfo(name, about) {
    return fetch(`${AUTH_ENDPOINT}users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(checkResponse)
  }

  fetchCards() {
    return fetch(`${AUTH_ENDPOINT}cards`, {
      method: 'GET',
      headers: this.headers,
    }).then(checkResponse)
  }

  createCard({ name, link }) {
    return fetch(`${AUTH_ENDPOINT}cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(checkResponse)
  }

  deleteCard(cardId) {
    return fetch(`${AUTH_ENDPOINT}cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers,
    }).then(checkResponse)
  }

  changeCardLikeStatus(cardId, isLiked) {
    return fetch(`${AUTH_ENDPOINT}cards/${cardId}/likes`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: this.headers,
    }).then(checkResponse)
  }

  updateUserAvatar(avatar) {
    return fetch(`${AUTH_ENDPOINT}users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar,
      }),
    }).then(checkResponse)
  }
}

const api = new Api({
  baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
