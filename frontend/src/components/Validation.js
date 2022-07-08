function Validation({ errorMessage, name }) {

  return (
    <span className={`popup__error popup__error_type_avatar ${errorMessage[name] ? 'popup__error_visible' : ''}`}>
      {errorMessage[name]}
    </span>
  )
}

export default Validation;