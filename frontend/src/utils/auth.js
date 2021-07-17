import checkResponse from './checkResponse'
import { AUTH_ENDPOINT, STORAGE_TOKEN_KEY } from './constants'

export const setAccessToken = (value) => {
  localStorage.setItem(STORAGE_TOKEN_KEY, value)
}

export const getAccessToken = () => localStorage.getItem(STORAGE_TOKEN_KEY)

export const removeAccessToken = () =>
  localStorage.removeItem(STORAGE_TOKEN_KEY)

export const signIn = (email, password) => {
  const url = `${AUTH_ENDPOINT}signin`
  const headers = {
    'Content-Type': 'application/json',
  }

  return fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      email,
      password,
    }),
  }).then(checkResponse)
}

export const signUp = (email, password) => {
  const url = `${AUTH_ENDPOINT}signup`
  const headers = {
    'Content-Type': 'application/json',
  }

  return fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      email,
      password,
    }),
  }).then(checkResponse)
}

export const signOut = () => {
  removeAccessToken()
}

export const getUserInfo = () => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getAccessToken()}`,
  }

  return fetch(`${AUTH_ENDPOINT}users/me`, {
    method: 'GET',
    headers,
  }).then(checkResponse)
}
