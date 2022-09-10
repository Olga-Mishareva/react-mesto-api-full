import { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import Validation from './Validation';

function AddPlacePopup({ onClose, isOpen, loading, loggedIn, isValid, errorMessage, lang, onAddCard }) {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');

  function handleTitle(e) {
    setTitle(e.target.value);
  }
  function handleImage(e) {
    setImage(e.target.value);
  }
  function handleFocus(e) {
    e.target.select();
  }

  useEffect(() => {
    setTitle('');
    setImage('');
  },[loggedIn])

  function handleSubmit(e) {
    e.preventDefault();

    onAddCard({
      place: title,
      img: image
    });
    setTitle('');
    setImage('');
  }

  return (
    <PopupWithForm 
        title={lang.addPlace} name='add-place' 
        onClose={onClose} isOpen={isOpen} isValid={isValid}
        submitBtn={loading ? lang.saving : lang.createBtn}
        onSubmit={handleSubmit}> 

        <input className='popup__input popup__input_type_place' value={title} type='text' required minLength='2'
          onFocus={handleFocus} maxLength='40' name='place' placeholder={lang.placeName} onChange={handleTitle}/>
        <Validation errorMessage={errorMessage} name='place'/>

        <input className='popup__input popup__input_type_img' value={image} type='url' required name='img'
          onFocus={handleFocus} placeholder={lang.placeLink} onChange={handleImage}/>
        <Validation errorMessage={errorMessage} name='img'/>
      </PopupWithForm>
  )
}

export default AddPlacePopup;