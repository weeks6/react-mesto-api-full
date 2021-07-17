export default function PopupWithForm({
  title,
  name,
  buttonText,
  isOpened,
  onClose,
  onSubmit,
  children,
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
        <form
          className="form"
          name={`${name}-form`}
          onSubmit={onSubmit}
          noValidate
        >
          <div className="form__inner">
            <h2 className="popup__title">{title}</h2>
            {children}
            <button
              className="button button_type_save"
              type="submit"
            >
              {buttonText}
            </button>
          </div>
        </form>
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
