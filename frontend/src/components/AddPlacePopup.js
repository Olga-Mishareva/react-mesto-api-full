import { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { EN, RU }  from '../utils/constants';
import Validation from './Validation';

function AddPlacePopup({ onClose, isOpen, loading, loggedIn, isValid, errorMessage, isEn, onAddCard }) {
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
        title={(isEn ? EN : RU).addPlace} name='add-place' 
        onClose={onClose} isOpen={isOpen} isValid={isValid}
        submitBtn={loading ? (isEn ? EN : RU).saving : (isEn ? EN : RU).createBtn}
        onSubmit={handleSubmit}> 

        <input className='popup__input popup__input_type_place' value={title} type='text' required minLength='2'
          onFocus={handleFocus} maxLength='40' name='place' placeholder={(isEn ? EN : RU).placeName} onChange={handleTitle}/>
        <Validation errorMessage={errorMessage} name='place'/>

        <input className='popup__input popup__input_type_img' value={image} type='url' required name='img'
          onFocus={handleFocus} placeholder={(isEn ? EN : RU).placeLink} onChange={handleImage}/>
        <Validation errorMessage={errorMessage} name='img'/>
      </PopupWithForm>
  )
}

export default AddPlacePopup;