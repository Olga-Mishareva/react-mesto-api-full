import PopupWithForm from './PopupWithForm';

function ConfirmPopup({ card, isOpen, onClose, onDeleteCard, lang, loading }) {

  function handleSubmit(e) {
    e.preventDefault();
    onDeleteCard(card);
  }

  return (
    <PopupWithForm 
      title={lang.confirmQuestion} name='delete-place' 
      submitBtn={loading ? lang.removing : lang.confirm}
      onClose={onClose} isOpen={isOpen} 
      onSubmit={handleSubmit}/>
  )
}

export default ConfirmPopup;