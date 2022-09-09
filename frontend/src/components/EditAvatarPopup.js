import { useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';
import { EN, RU }  from '../utils/constants';
import Validation from './Validation';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, loading, loggedIn, isValid, isEn, errorMessage }) {
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
        title={(isEn ? EN : RU).updateAvatar} name='edit-avatar' 
        onClose={onClose} isOpen={isOpen} isValid={isValid}
        submitBtn={loading ? (isEn ? EN : RU).saving : (isEn ? EN : RU).saveBtn}
        onSubmit={handleSubmit}> 

        <input className='popup__input popup__input_type_avatar' value={avatar} type='url' required 
        onFocus={handleFocus} name='avatar' placeholder={(isEn ? EN : RU).avatarLink} onChange={handleAvatar}/>
        <Validation errorMessage={errorMessage} name='avatar'/>
      </PopupWithForm>
  ) 
}

export default EditAvatarPopup;
