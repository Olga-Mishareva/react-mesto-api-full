import { useState, useRef } from "react";
import { Link } from 'react-router-dom';
import Validation from "./Validation";
import useCheckButtonState from "../utils/useCheckButtonState";

function Register({ title, onRegister, isValid, submitBtn, errorMessage, resetValidation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const authRef = useRef();

  const subminButtonState = useCheckButtonState(authRef.current ,isValid);
 
  function handleEmail(e) {
    setEmail(e.target.value);
  }
  function handlePassword(e) {
    setPassword(e.target.value);
  }
  function handleFocus(e) {
    e.target.select();
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    onRegister(password, email);
  }

  return (
    <div className="auth__container">
      <form ref={authRef} className="auth__form" noValidate name="register" action="#" method="post" id="register" 
        onChange={isValid} onSubmit={handleSubmit}>
        <h2 className="auth__title">{title}</h2>
        <input className="auth__input auth__input_type_email" value={email} type="email" required 
            onFocus={handleFocus} name="email" placeholder="Email" onChange={handleEmail}/>
        <Validation errorMessage={errorMessage} name="email"/>   

        <input className="auth__input auth__input_type_password" value={password} type="password" required minLength="4"
          onFocus={handleFocus} maxLength="20" name="password" placeholder="Пароль" onChange={handlePassword}/>
        <Validation errorMessage={errorMessage} name="password"/>
        <button className={`auth__submit-button auth__submit-button_${subminButtonState ? '' : 'disabled'}`} 
          type="submit" disabled={!subminButtonState} form="register">{submitBtn}</button>

          <div className="auth__login-offer auth__login-offer_visible">
            <Link to="/sign-in" className="auth__login-link" onClick={resetValidation}>Уже зарегистрированы? Войти</Link>
          </div>
      </form>
    </div>
  ) 
}

export default Register;