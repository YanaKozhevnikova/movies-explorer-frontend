import React from 'react';
import { useLocation } from 'react-router';
import './SearchForm.css';
import searchIconPath from '../../images/search-grey.svg';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';


function SearchForm({onSearch}) {
    const location = useLocation();
    const context = React.useContext(CurrentUserContext);
    const [keyword, setKeyword] = React.useState('');
    const [isShortMovie, setIsShortMovie] = React.useState(false);
    const [isKeywordEmpty, setIsKeywordEmpty] = React.useState(false);
    const isDisabled = location.pathname === '/saved-movies' && context.savedMovies.length === 0;

    function handleMovieChange(e) {
        setKeyword(e.target.value);
    }

    function searchMovies(e) {
        e.preventDefault();
        if (!keyword) {
            setIsKeywordEmpty(true);
        } else {
            setIsKeywordEmpty(false);
            onSearch(keyword, isShortMovie);
        }
    }

    function handleCheckboxChange(e) {
        setIsShortMovie(!isShortMovie);
    }

    return (
        <div className="search movies__section">
            <form className='search__form' onSubmit={searchMovies} noValidate>
                <div className="search__input-container">
                    <div className="search__text-field">
                        <img className="search__icon" src={searchIconPath} alt="Поиск" />
                        <input 
                            name="keyword"
                            value={keyword}
                            onChange={handleMovieChange}
                            className={`search__input ${isKeywordEmpty ? 'search__input_error' : ''}`}
                            type="text"
                            placeholder={isKeywordEmpty ? 'Нужно ввести ключевое слово' : 'Фильм'}
                            required
                            disabled={isDisabled}
                        />
                    </div>
                    <button type="submit" className="search__button" disabled={isDisabled}></button>
                </div>
                <div className="search__checkbox-container">
                    <label className="search__checkbox-label">
                        <input
                            name="short-film"
                            value={isShortMovie}
                            onChange={handleCheckboxChange}
                            className="search__hidden-checkbox"
                            type="checkbox"
                            disabled={isDisabled}
                        />
                        <span className="search__visible-checkbox"></span>
                        <p className="search__checkbox-text">Короткометражки</p>
                    </label>
                </div>
            </form>
            <div className="search__border"></div>
        </div>
    );
}

export default SearchForm;