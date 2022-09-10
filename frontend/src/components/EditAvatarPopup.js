import { useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';
import Validation from './Validation';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, loading, loggedIn, isValid, lang, errorMessage }) {
  const [avatar, setAvatar] = useState('');

  function handleAvatar(e) {
    setAvatar(e.target.value);
  }
  function handleFocus(e) {
    e.target.select();
  }

  useEffect(() => {
    setAvatar('');
  },[loggedIn])

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({ avatar });
    setAvatar('');
  }

  return (
    <PopupWithForm 
        title={lang.updateAvatar} name='edit-avatar' 
        onClose={onClose} isOpen={isOpen} isValid={isValid}
        submitBtn={loading ? lang.saving : lang.saveBtn}
        onSubmit={handleSubmit}> 

        <input className='popup__input popup__input_type_avatar' value={avatar} type='url' required 
        onFocus={handleFocus} name='avatar' placeholder={lang.avatarLink} onChange={handleAvatar}/>
        <Validation errorMessage={errorMessage} name='avatar'/>
      </PopupWithForm>
  ) 
}

export default EditAvatarPopup;
