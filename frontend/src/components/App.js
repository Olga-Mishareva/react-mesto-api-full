import { useState, useEffect } from 'react';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Login from './Login';
import Register from './Register';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmPopup from './ConfirmPopup';
import api from '../utils/api';
import { register, authorize, getContent, logout } from '../utils/auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import InfoTooltip from './InfoTooltip';
import { EN } from '../utils/constants';

function App() {
  const [currentUser, setCurrentUser] = useState({});

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);

  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [toRemove, setToRemove] = useState(null);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});  

  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [signupError, setSignupError] = useState('');
  const [lang, setLang] = useState({});

  const history = useHistory();

  useEffect(() => {
    setLang(EN);
  }, [])

  // ============================ AVATAR ======================================

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleUpdateAvatar(avatar) {
    setLoading(true);
    api.editUserAvatar(avatar) 
      .then(data => {
        setCurrentUser({ ...currentUser,
          userAvatar: data.avatar
        })
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
    closeAllPopups(); 
  }

  // ============================ PROFILE ======================================

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  useEffect(() => {
    if(loggedIn) {
      api.getUserData()
      .then(data => {
        setCurrentUser({ ...currentUser, 
          userName: data.name, 
          userInfo: data.about, 
          userAvatar: data.avatar,
          userId: data._id
        })
      })
      .catch(err => console.log(err));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  function handleUpdateUser(data) {
    setLoading(true);                 
    api.editUserData({ data })
      .then(data => {
        setCurrentUser({ ...currentUser,
          userName: data.name,
          userInfo: data.about
        })
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
    closeAllPopups();  
  }

  // ============================ CARD ======================================

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  useEffect(() => {
    if(loggedIn) {
      api.getUsersCards()
      .then(res => {
        const usersCards = res.reverse().map(card => {
          return {
            name: card.name,
            link: card.link,
            _id: card._id,
            likes: card.likes,
            ownerId: card.owner,
          }
        });
        setCards(usersCards);
      })
      .catch(err => console.log(err));
    }
  }, [loggedIn]);

  function handleAddPlaceSubmit(elem) {
    setLoading(true); 
    api.addNewCard({ elem })
      .then(newCard => {
        setCards([newCard, ...cards]);
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
    closeAllPopups();  
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(like => like === currentUser.userId);
    api.changeLikeCardStatus(card._id, isLiked)
      .then(likedCard => {
        setCards(() => cards.map(el => {
          return el._id === likedCard._id ? likedCard : el;
        }));
      })
      .catch(err => console.log(err));
  }

  function handleCardDelete(card) {
    setLoading(true);
    api.deleteUserCard(card._id)
      .then(res => {
        setCards(() => cards.filter(el => el._id !== card._id));
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
    closeAllPopups();  
  }

  function handleDeleteClick(card) {
    setToRemove(card);
    setIsConfirmPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

// ============================ ALL POPUPS ======================================

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setIsRegisterPopupOpen(false);
    setSelectedCard(null);
    setErrorMessage({});
  }

  // ============================ VALIDATION ======================================

  function checkInputValidity(e) {
    if(!e.currentTarget.checkValidity()) {
      setErrorMessage({...errorMessage, [e.target.name]: e.target.validationMessage}); 
    }
    else setErrorMessage({});
  }

  function resetValidation() {
    setErrorMessage({});
  }

 // ================================== AUTH =======================================================

  function handleRegister(password, email) {
    setLoading(true); 
    return register(password, email)
      .then(res => {
        if(res._id) {
          setIsSignup(true);
          setIsRegisterPopupOpen(true);
          setTimeout(() => {
            setIsRegisterPopupOpen(false);
          }, 2000);
          history.push('/sign-in');
        }
        else {
          setIsSignup(false);
          setIsRegisterPopupOpen(true);
        }                 
      })
      .catch((err) => {
        setSignupError(() => err.statusCode === 500 ? lang.serverErr : lang.conflictErr); 
        setIsSignup(false);
        setIsRegisterPopupOpen(true);
      })
      .finally(() => setLoading(false));
  }

  function handleLogin(password, email) {
    setLoading(true);
    return authorize(password, email)
      .then(data => {
        if(data.email) {
          localStorage.setItem('email', data.email);
          checkToken();
        }
        checkToken();
      })
      .catch(err => {
        setSignupError(() => err.statusCode === 500 
          ? lang.serverErr : err.code === 400 
          ? lang.badRequestErr : lang.authErr);
        setIsSignup(false);
        setIsRegisterPopupOpen(true);
      })
      .finally(() => setLoading(false));
  }

  function checkToken() {
    if(localStorage.getItem('email')) {
      getContent()
        .then(res => {
          setEmail(res.email);
          setLoggedIn(true);
        })
        .catch(err => {
          setSignupError('Authorisation is required');
          setIsSignup(false);
          setIsRegisterPopupOpen(true);
        }); 
    }
  }

  useEffect(() => {
      checkToken();
  },[]);

  useEffect(() => {
    if(loggedIn) {
      history.push('/')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  function handleSignOut() {
    return logout(email)
      .then(() => {
        localStorage.removeItem('email');
        setEmail('');
        setLoggedIn(false);
        history.push('/sign-in');
      })
      .catch(err => console.log(err.message)); 
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className='page'>
      <Header 
        loggedIn={loggedIn}
        email={email} 
        lang={lang}
        onSignOut={handleSignOut}
        resetValidation={resetValidation}>
      </Header>

      <Switch>
        <ProtectedRoute exact path='/' loggedIn={loggedIn}>
          <Main
          cards={cards}
          onEditAvatar={handleEditAvatarClick} 
          onEditProfile={handleEditProfileClick} 
          onAddPlace={handleAddPlaceClick} 
          onCardClick={handleCardClick}
          onCardLike={handleCardLike} 
          onConfirmDelete={handleDeleteClick}/>
        </ProtectedRoute>

        <Route path='/sign-up'>
          <Register 
            title={lang.register} 
            errorMessage={errorMessage}
            lang={lang} 
            isValid={checkInputValidity} 
            onRegister={handleRegister} 
            resetValidation={resetValidation} 
            submitBtn={loading ? lang.registration : lang.register} />
        </Route>

        <Route path='/sign-in'>
          <Login 
            title={lang.login} 
            errorMessage={errorMessage}
            lang={lang} 
            isValid={checkInputValidity} 
            onLogin={handleLogin} 
            submitBtn={loading ? lang.logging : lang.login} />
        </Route>
        <Route path='*'>
          {loggedIn ? <Redirect to='/' /> : <Redirect to='/sign-in' />}
        </Route>
      </Switch>

      <EditAvatarPopup 
        onClose={closeAllPopups} 
        isOpen={isEditAvatarPopupOpen}
        loggedIn={loggedIn}
        lang={lang}
        onUpdateAvatar={handleUpdateAvatar}
        loading={loading}
        errorMessage={errorMessage}
        isValid={checkInputValidity}>
      </EditAvatarPopup>

      <EditProfilePopup 
        onClose={closeAllPopups} 
        isOpen={isEditProfilePopupOpen}
        lang={lang}
        onUpdateUser={handleUpdateUser}
        loading={loading}
        errorMessage={errorMessage}
        isValid={checkInputValidity}>
      </EditProfilePopup>

      <AddPlacePopup 
        onClose={closeAllPopups} 
        isOpen={isAddPlacePopupOpen}
        loggedIn={loggedIn}
        lang={lang}
        onAddCard={handleAddPlaceSubmit}
        loading={loading}
        errorMessage={errorMessage}
        isValid={checkInputValidity}>
      </AddPlacePopup>

      <ConfirmPopup 
        card={toRemove}
        lang={lang}
        onClose={closeAllPopups} 
        isOpen={isConfirmPopupOpen}
        onDeleteCard={handleCardDelete}
        loading={loading}>
      </ConfirmPopup>

      {selectedCard && 
        <ImagePopup 
          card={selectedCard} 
          onClose={closeAllPopups}
          isOpen={selectedCard ? 'popup_opened' : ''}/>
      }

      {isRegisterPopupOpen && 
        <InfoTooltip 
          signupError={signupError}
          lang={lang}
          isSignup={isSignup}
          isOpen={isRegisterPopupOpen} 
          onClose={closeAllPopups}>
        </InfoTooltip>
      }

      <Footer />
  </div>
  </CurrentUserContext.Provider>
  );
}

export default App;
