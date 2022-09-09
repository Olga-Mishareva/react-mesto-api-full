import PopupWithForm from './PopupWithForm';
import { EN, RU }  from '../utils/constants';

function ConfirmPopup({ card, isOpen, onClose, onDeleteCard, isEn, loading }) {

  function handleSubmit(e) {
    e.preventDefault();
    onDeleteCard(card);
  }

  return (
    <PopupWithForm 
      title={(isEn ? EN : RU).confirmQuestion} name='delete-place' 
      submitBtn={loading ? (isEn ? EN : RU).removing : (isEn ? EN : RU).confirm}
      onClose={onClose} isOpen={isOpen} 
      onSubmit={handleSubmit}/>
  )
}

export default ConfirmPopup;