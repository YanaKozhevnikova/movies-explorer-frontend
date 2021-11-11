import AuthForm from '../AuthForm/AuthForm';
function Register({onRegister}) {
    return (
        <AuthForm
            heading='Добро пожаловать!'
            buttonText='Зарегистрироваться'
            redirectText='Уже зарегистрированы?'
            linkText='Войти'
            linkPath='/signin'
            onButtonClick={onRegister}
        />
    );
}

export default Register;