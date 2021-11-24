import React from 'react';
import AuthForm from '../AuthForm/AuthForm';
function Login({onLogin, error, isFormLoading}) {
    return (
        <AuthForm
            heading='Рады видеть!'
            buttonText='Войти'
            redirectText='Ещё не зарегистрированы?'
            linkText='Регистрация'
            linkPath='/signup'
            onButtonClick={onLogin}
            error={error}
            isFormLoading={isFormLoading}
        />
    );
}

export default Login;