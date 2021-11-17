import React from 'react';
import AuthForm from '../AuthForm/AuthForm';
function Register({onRegister, error, isFormLoading}) {

    return (
        <AuthForm
            heading='Добро пожаловать!'
            buttonText='Зарегистрироваться'
            redirectText='Уже зарегистрированы?'
            linkText='Войти'
            linkPath='/signin'
            onButtonClick={onRegister}
            error={error}
            isFormLoading={isFormLoading}
        />
    );
}

export default Register;