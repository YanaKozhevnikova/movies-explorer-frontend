export const NAME_PATTERN = "^[a-zA-Zа-яА-ЯЁё\\s-]*$";
export const MOVIES_API_URL = 'https://api.nomoreparties.co';
export const MAIN_API_URL = 'https://api.yana.movies.nomoredomains.monster';

export const INFO_MESSAGES = {
    emailExistsError: "Пользователь с таким email уже существует.",
    incorrectAuth: "Вы ввели неправильный логин или пароль.",
    incorrectData: "Вы заполнили поля формы в неверном формате.",
    registrationError: "При регистрации пользователя произошла ошибка.",
    loginError: "При авторизации произошла ошибка.",
    serverError: "500 На сервере произошла ошибка.",
    updateUserError: "При обновлении профиля произошла ошибка.",
    successfulUpdate: "Данные успешно сохранены."
}

export const STATUS_CODES = {
    success: 200,
    incorrectData: 400,
    incorrectAuth: 401,
    emailExistsError: 409,
    serverError: 500,
}

export const INITIAL_CARDS_NUMBER = {
    large: 12,
    medium: 8,
    small: 5,
}

export const MORE_CARDS_NUMBER = {
    large: 3,
    medium: 2,
    small: 2,
}

export const WINDOW_SIZE = {
    large: 1000,
    small: 600,
}

export const EMPTY_BLOCK_INFO = {
    movies: 'Начните поиск фильмов',
    savedMovies: 'Вы еще ничего не сохранили',
    noResult: 'Ничего не найдено',
}
