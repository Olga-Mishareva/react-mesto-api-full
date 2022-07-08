import { useState, useEffect } from "react";
import { Route, Switch, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Header from "./Header";
import Main from './Main';
import Footer from "./Footer";
import Login from "./Login";
import Register from "./Register";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmPopup from "./ConfirmPopup";
import api from "../utils/api";
import { register, authorize, getContent } from "../utils/auth";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import InfoTooltip from "./InfoTooltip";

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

  const history = useHistory();

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
        const usersCards = res.map(card => {
          return {
            name: card.name,
            link: card.link,
            _id: card._id,
            likes: card.likes,
            ownerId: card.owner._id,
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
    const isLiked = card.likes.some(like => like._id === currentUser.userId);
    api.changeLikeCardStatus(card._id, isLiked)
      .then(likedCard => {
        setCards(() => cards.map(el => {
          return el._id === likedCard._id ? likedCard : el;
        }));
        // перебираем массив cards и заменяем в стейте только одну карточку, 
        // id которой совпадает с лайкнутой картой
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
        if(res.data._id) {
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
        setSignupError(err.message);
        setIsSignup(false);
        setIsRegisterPopupOpen(true);
      })
      .finally(() => setLoading(false));
  }

  function handleLogin(password, email) {
    setLoading(true);
    return authorize(password, email)
      .then(data => {
        if(data.token) {
          localStorage.setItem('jwt', data.token);
          checkToken();
        }
      })
      .catch(err => {
        console.log(err.message);
        setSignupError('Некорректный email или пароль');
        setIsSignup(false);
        setIsRegisterPopupOpen(true);
      })
      .finally(() => setLoading(false));
  }

  function checkToken() {
    if(localStorage.getItem('jwt')) {
      let token = localStorage.getItem('jwt');
      getContent(token)
        .then(res => {
          setEmail(res.data.email);
          setLoggedIn(true);
        })
        .catch(err => console.log(err.message)); 
    }
  }

  useEffect(() => {
    checkToken();
  },[]);

  useEffect(() => {
    if(loggedIn) {
      history.push('/')
    }
  }, [loggedIn]);

  function handleSignOut() {
    localStorage.removeItem('jwt');
    setEmail('');
    setLoggedIn(false);
    history.push('/sign-in');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}> {/* значение, которое передается всем дочерним элементам */}
    <div className="page">
      <Header 
        loggedIn={loggedIn} email={email} 
        onSignOut={handleSignOut} resetValidation={resetValidation}>
      </Header>

      <Switch>
        <ProtectedRoute exact path="/" loggedIn={loggedIn}>
          <Main
          cards={cards}
          onEditAvatar={handleEditAvatarClick} 
          onEditProfile={handleEditProfileClick} 
          onAddPlace={handleAddPlaceClick} 
          onCardClick={handleCardClick}
          onCardLike={handleCardLike} 
          onConfirmDelete={handleDeleteClick}/>
        </ProtectedRoute>

        <Route path="/sign-up">
          <Register title="Регистрация" errorMessage={errorMessage} 
            isValid={checkInputValidity} onRegister={handleRegister} 
            resetValidation={resetValidation} 
            submitBtn={loading ? 'Регистрация...' : 'Зарегистрироваться'} />
        </Route>

        <Route path="/sign-in">
          <Login title="Вход" errorMessage={errorMessage} 
            isValid={checkInputValidity} onLogin={handleLogin} 
            submitBtn={loading ? 'Вход...' : 'Войти'} />
        </Route>
      </Switch>

      <EditAvatarPopup 
        onClose={closeAllPopups} 
        isOpen={isEditAvatarPopupOpen}
        loggedIn={loggedIn}
        onUpdateAvatar={handleUpdateAvatar}
        loading={loading}
        errorMessage={errorMessage}
        isValid={checkInputValidity}>
      </EditAvatarPopup>

      <EditProfilePopup 
        onClose={closeAllPopups} 
        isOpen={isEditProfilePopupOpen}
        onUpdateUser={handleUpdateUser}
        loading={loading}
        errorMessage={errorMessage}
        isValid={checkInputValidity}>
      </EditProfilePopup>

      <AddPlacePopup 
        onClose={closeAllPopups} 
        isOpen={isAddPlacePopupOpen}
        loggedIn={loggedIn}
        onAddCard={handleAddPlaceSubmit}
        loading={loading}
        errorMessage={errorMessage}
        isValid={checkInputValidity}>
      </AddPlacePopup>

      <ConfirmPopup 
        card={toRemove}
        onClose={closeAllPopups} 
        isOpen={isConfirmPopupOpen}
        onDeleteCard={handleCardDelete}
        loading={loading}>
      </ConfirmPopup>

      {selectedCard && 
        <ImagePopup card={selectedCard} onClose={closeAllPopups}
          isOpen={selectedCard ? 'popup_opened' : ''}/>
      }

      {isRegisterPopupOpen && 
        <InfoTooltip 
          signupError={signupError}
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
