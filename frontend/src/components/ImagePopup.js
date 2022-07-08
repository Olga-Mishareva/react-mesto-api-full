import useEscapeClick from "../utils/useEscapeClick";

function ImagePopup({ card, isOpen, onClose }) {
  useEscapeClick(isOpen, onClose);

  return (
    <div className={`popup popup_type_show-image ${isOpen}`} onClick={onClose}>
      <div className="popup__illustration" onClick={(e) => e.stopPropagation()}>
        <button className="popup__close-button popup__close-button_type_show" type="button" onClick={onClose}></button>
        <img className="popup__image" src={card.link} alt={card.name}/>
        <p className="popup__caption">{card.name}</p>
      </div>
    </div>
  )
}

export default ImagePopup;