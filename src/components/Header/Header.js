import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import './Header.css';
import logoPath from '../../images/logo.svg';

function Header({loggedIn}) {
    const location = useLocation();
    const [isNavigationOpen, setIsNavigationOpen] = React.useState(false);

    function handleOpenNavigation() {
        setIsNavigationOpen(true);
    }

    function handleCloseNavigation() {
        setIsNavigationOpen(false);
    }

    const headerClassName = `header ${location.pathname === '/' ? 'header_color_pink' : ''}`;

    return (
        <header className={headerClassName}>
            <div className="header__container">
                <Link to='/'>
                    <img src={logoPath} alt="Логотип" className="header__logo" />
                </Link>
                {loggedIn && (
                    <button type="button" onClick={handleOpenNavigation} className="header__burger-logo" aria-label="Меню"></button>
                )}
                <Navigation loggedIn={loggedIn} isOpen={isNavigationOpen} handleClose={handleCloseNavigation} />
            </div>
        </header>
    );
}

export default Header;