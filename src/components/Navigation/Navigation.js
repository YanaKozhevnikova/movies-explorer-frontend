import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Navigation.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Navigation({isOpen, handleClose}) {
    const context = React.useContext(CurrentUserContext);
    const burgerNavigationClass = `navigation navigation_burger ${isOpen ? 'navigation_opened' : ''}`;

    return (
        <>
            {context.loggedIn ? (
                <nav className={burgerNavigationClass}>
                    <div className="navigation__container navigation__container_burger">
                        <button onClick={handleClose} className="navigation__close-button" type="button" aria-label="Закрыть"></button>
                        <div className="navigation__links">
                            <NavLink onClick={handleClose} className="navigation__link navigation__link_to_main" activeClassName="navigation__link_active" exact to='/'>Главная</NavLink>
                            <NavLink onClick={handleClose} className="navigation__link" activeClassName="navigation__link_active" to='/movies'>Фильмы</NavLink>
                            <NavLink onClick={handleClose} className="navigation__link" activeClassName="navigation__link_active" to='/saved-movies'>Сохраненные фильмы</NavLink>
                        </div>
                        <div>
                            <Link onClick={handleClose} className="navigation__profile" to='/profile'>
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