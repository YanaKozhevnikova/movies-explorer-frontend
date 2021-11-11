import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './AuthForm.css';
import logoPath from '../../images/logo.svg';


function AuthForm({heading, buttonText, redirectText, linkText, linkPath, onButtonClick}) {
    const location = useLocation();
    const buttonClassName = `auth__button ${location.pathname === '/signin' ? 'auth__button_signin' : ''}`;
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const nameError = '';
    const emailError = '';
    const passwordError = '';
    const isButtonDisabled = nameError || emailError || passwordError;


    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onButtonClick();
    }

    return (
        <main className="auth">
            <Link to='/' className="auth__logo">
                <img src={logoPath} alt="Логотип" />
            </Link>
            <h1 className="auth__heading">{heading}</h1>
            <form className="auth__form" onSubmit={handleSubmit}>
                {location.pathname === '/signup' && (
                    <>
                        <label className="auth__label" htmlFor="name">Имя</label>
                        <input className={`auth__input ${nameError ? 'auth__input_error' : ''}`} type="text" minLength="2" id="name" name="name" value={name} onChange={handleNameChange} required />
                        {nameError && (
                            <span className="auth__input-error">Что-то пошло не так...</span>
                        )}
                        
                    </>
                )}
                <label className="auth__label" htmlFor="email">E-mail</label>
                <input className={`auth__input ${emailError ? 'auth__input_error' : ''}`} type="email" id="email" name="email" value={email} onChange={handleEmailChange} required />
                {emailError && (
                    <span className="auth__input-error">Что-то пошло не так...</span>
                )}
                <label className="auth__label" htmlFor="password">Пароль</label>
                <input className={`auth__input ${passwordError ? 'auth__input_error' : ''}`} type="password" minLength="8" id="password" name="password" value={password} onChange={handlePasswordChange} required />
                {passwordError && (
                    <span className="auth__input-error">Что-то пошло не так...</span>
                )}
                <button className={buttonClassName} type="submit" disabled={isButtonDisabled}>{buttonText}</button>
            </form>
            <p className="auth__text">{redirectText}<Link to={linkPath} className="auth__link">{linkText}</Link></p>
        </main>
    )
}

export default AuthForm;