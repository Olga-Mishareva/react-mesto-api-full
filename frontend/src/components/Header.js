import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import closeBtn from '../images/close-icon.svg';
import burgerBtn from '../images/burger-menu.svg';

function Header({ loggedIn, email,  lang, resetValidation, onSignOut }) {
  const [isInvisible, setIsInvisible] = useState(true);
  const mobileButton = isInvisible ? burgerBtn : closeBtn;

  function handleBurgerButton() {
    isInvisible ? setIsInvisible(false): setIsInvisible(true);
  }

  useEffect(() => {
    if(!loggedIn) setIsInvisible(true);
  }, [loggedIn])

  return (
    <header className='header'>
      <div className={`header__container header__container${loggedIn ? '_logged' : ''}`}>
        <div className={`header__logo-container header__logo-container${loggedIn ? '_logged' : ''}`}>
          <span className='logo-word'>Mesto</span>
          <button className={`header__burger-btn header__burger-btn${loggedIn ? '' : '_invisible'}}`} type='button' 
            style={{ backgroundImage: `url(${loggedIn ? mobileButton : ''})` }}
            onMouseDown={handleBurgerButton}></button>
        </div>
        <div className={`header__auth-container 
            header__auth-container${isInvisible && loggedIn ? '_hidden' : ''} 
            header__auth-container${loggedIn ? '_logged' : ''}`}>
          <p className='header__email'>{email}</p>
          <button onMouseDown={onSignOut} 
            className={`header__logout header__logout${loggedIn ? '_active' : ''}`}>
            {lang.logout}
          </button>
          <nav className={`header__nav header__nav${!loggedIn ? '_active' : ''}`}>
            <NavLink to='/sign-up'
              activeClassName='header__link'
              className='header__link_visible' 
              onClick={resetValidation}>
                {lang.register}
            </NavLink>
            <NavLink to='/sign-in' 
              activeClassName='header__link' 
              className='header__link_visible' 
              onClick={resetValidation}>
                {lang.login}
            </NavLink>
          </nav>  
        </div>
      </div>
    </header>
  )
}

export default Header;
