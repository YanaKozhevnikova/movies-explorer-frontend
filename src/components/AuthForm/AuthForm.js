import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './AuthForm.css';
import logoPath from '../../images/logo.svg';
import { useFormWithValidation } from '../../utils/useFormWithValidation';
import { NAME_PATTERN } from '../../utils/constants';


function AuthForm({heading, buttonText, redirectText, linkText, linkPath, onButtonClick}) {
    const location = useLocation();
    const buttonClassName = `auth__button ${location.pathname === '/signin' ? 'auth__button_signin' : ''}`;
    const { values, errors, isValid, handleValuesChange } = useFormWithValidation({
        initialValues: {name: '', email: '', password: ''},
        initialErrors: {name: '', email: '', password: ''},
        formSelector: '.auth__form',
    })

    function handleRegister(e) {
        e.preventDefault();
        onButtonClick(values.name, values.email, values.password);
    }

    function handleLogin(e) {
        e.preventDefault();
        onButtonClick(values.email, values.password);
    }

    return (
        <main className="auth">
            <Link to='/' className="auth__logo">
                <img src={logoPath} alt="Логотип" />
            </Link>
            <h1 className="auth__heading">{heading}</h1>
            <form className="auth__form" onSubmit={location.pathname === '/signup' ? handleRegister : handleLogin} noValidate>
                {location.pathname === '/signup' && (
                    <>
                        <label className="auth__label" htmlFor="name">Имя</label>
                        <input className={`auth__input ${errors.name ? 'auth__input_error' : ''}`} type="text" minLength="2" pattern={NAME_PATTERN} id="name" name="name" value={values.name} onChange={handleValuesChange} required />
                        {errors.name && (
                            <span className="auth__input-error">{errors.name}</span>
                        )}
                        
                    </>
                )}
                <label className="auth__label" htmlFor="email">E-mail</label>
                <input className={`auth__input ${errors.email ? 'auth__input_error' : ''}`} type="email" id="email" name="email" value={values.email} onChange={handleValuesChange} required />
                {errors.email && (
                    <span className="auth__input-error">{errors.email}</span>
                )}
                <label className="auth__label" htmlFor="password">Пароль</label>
                <input className={`auth__input ${errors.password ? 'auth__input_error' : ''}`} type="password" minLength="8" id="password" name="password" value={values.password} onChange={handleValuesChange} required />
                {errors.password && (
                    <span className="auth__input-error">{errors.password}</span>
                )}
                <button className={buttonClassName} type="submit" disabled={!isValid}>{buttonText}</button>
            </form>
            <p className="auth__text">{redirectText}<Link to={linkPath} className="auth__link">{linkText}</Link></p>
        </main>
    )
}

export default AuthForm;