export default function checkResponse(res) {
  if (res.ok) {
    return res.json()
  }
  // eslint-disable-next-line prefer-promise-reject-errors
  return Promise.reject(`Ошибка ${res.status}`)
}
