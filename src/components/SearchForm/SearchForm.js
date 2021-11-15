import React from 'react';
import './SearchForm.css';
import searchIconPath from '../../images/search-grey.svg';

function SearchForm({onSearch}) {
    const [keyword, setKeyword] = React.useState('');
    const [isShortMovie, setIsShortMovie] = React.useState(false);
    const [isKeywordEmpty, setIsKeywordEmpty] = React.useState(false);

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
                        <input name="keyword" value={keyword} onChange={handleMovieChange} className={`search__input ${isKeywordEmpty ? 'search__input_error' : ''}`} type="text" placeholder={isKeywordEmpty ? 'Нужно ввести ключевое слово' : 'Фильм'} required />
                    </div>
                    <button type="submit" className="search__button"></button>
                </div>
                <div className="search__checkbox-container">
                    <label className="search__checkbox-label">
                        <input className="search__hidden-checkbox" type="checkbox" name="short-film" value={isShortMovie} onChange={handleCheckboxChange} />
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