import AuthForm from '../AuthForm/AuthForm';
function Login({onLogin}) {
    return (
        <AuthForm
            heading='Рады видеть!'
            buttonText='Войти'
            redirectText='Ещё не зарегистрированы?'
            linkText='Регистрация'
            linkPath='/signup'
            onButtonClick={onLogin}

        />
    );
}

export default Login;