import React from 'react'

function Popup({
  isOpened,
  name,
  onClose,
  children
}) {
  return (
    <div
      className={
        isOpened
          ? `popup popup_type_${name} popup_opened`
          : `popup popup_type_${name}`
      }
      onKeyPress={(evt) => {
        console.log(evt);
      }}
      role='dialog'
    >
      <div className="popup__container container">
        <button
          type="button"
          aria-label="Закрыть"
          className="button button_type_close"
          onClick={onClose}
        />
        {children}
      </div>
      <button
        type='button'
        title='Закрыть'
        aria-label='Закрыть'
        className="popup__overlay"
        onClick={onClose}
      />
    </div>
  )
}

export default Popup
