import React from 'react'
import Popup from './Popup'

import successImage from '../images/success.svg'
import failureImage from '../images/failure.svg'

function InfoTooltip({ success, name, isOpened, onClose }) {
  return (
    <Popup isOpened={isOpened} name={name} onClose={onClose}>
      <div className="infotooltip">
        {success ? (
          <>
            <img
              src={successImage}
              alt="Успех"
              className="infotooltip__image"
            />
            <p className="infotooltip__text">Вы успешно зарегистрировались!</p>
          </>
        ) : (
          <>
            <img
              src={failureImage}
              alt="Ошибка"
              className="infotooltip__image"
            />
            <p className="infotooltip__text">
              Что-то пошло не так! Попробуйте ещё раз.
            </p>
          </>
        )}
      </div>
    </Popup>
  )
}

export default InfoTooltip
