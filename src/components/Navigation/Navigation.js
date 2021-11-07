import { NavLink, Link } from 'react-router-dom';
import './Navigation.css'

function Navigation({loggedIn, isOpen, onCloseClick}) {
    const burgerNavigationClass = `navigation navigation_burger ${isOpen ? 'navigation_opened' : ''}`;

    return (
        <>
            {loggedIn ? (
                <nav className={burgerNavigationClass}>
                    <div className="navigation__container navigation__container_burger">
                        <button onClick={onCloseClick} className="navigation__close-button" type="button" aria-label="Закрыть"></button>
                        <div className="navigation__links">
                            <NavLink className="navigation__link navigation__link_to_main" activeClassName="navigation__link_active" to='/'>Главная</NavLink>
                            <NavLink className="navigation__link" activeClassName="navigation__link_active" to='/movies'>Фильмы</NavLink>
                            <NavLink className="navigation__link" activeClassName="navigation__link_active" to='/saved-movies'>Сохраненные фильмы</NavLink>
                        </div>
                        <div>
                            <Link className="navigation__profile" to='/profile'>
                                <p className="navigation__profile-text">Аккаунт</p>
                                <div className="navigation__profile-image"></div>
                            </Link>
                        </div>
                    </div>             
                </nav>
            ) : (
                <nav className="navigation">
                    <div className="navigation__container">
                        <Link className="navigation__signup" to='/signup'>Регистрация</Link>
                        <Link className="navigation__signin" to='/signin'>Войти</Link>
                    </div>
                </nav>
            )}
        </>
    );
}

export default Navigation;