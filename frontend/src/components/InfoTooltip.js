import React from "react";
import useEscapeClick from "../utils/useEscapeClick";
import confirm from '../images/confirm.svg';
import reject from '../images/reject.svg';

function InfoTooltip({ isSignup, signupError, isOpen, onClose }) {
  const image = isSignup ? confirm : reject;

  useEscapeClick(isOpen, onClose);
  
  return (
    <div className={`tooltip tooltop_type_ tooltip_opened`} onMouseDown={onClose}>
      <div className="tooltip__container" onMouseDown={(e) => e.stopPropagation()}>
      <button className="tooltip__close-button" type="button" onMouseDown={onClose}></button>
        <div className="tooltip__image" style={{ backgroundImage: `url(${image})` }}>
        </div>
        <h2 className={`tooltip__message tooltip__message_type`}>
          {isSignup ? 'Вы успешно зарегистрировались!' : `${signupError}.`}
        </h2>
    </div>
   </div>
  ) 
}

export default InfoTooltip;