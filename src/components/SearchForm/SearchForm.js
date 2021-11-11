import React from 'react';
import './SearchForm.css';
import searchIconPath from '../../images/search-grey.svg';

function SearchForm() {
    const [movie, setMovie] = React.useState('');

    function handleMovieChange(e) {
        setMovie(e.target.value);
    }  

    return (
        <div className="search movies__section">
            <form className="search__form">
                <div className="search__input-container">
                    <div className="search__text-field">
                        <img className="search__icon" src={searchIconPath} alt="Поиск" />
                        <input name="movie" value={movie} onChange={handleMovieChange} className="search__input" type="text" placeholder="Фильм" required />
                    </div>
                    <button type="submit" className="search__button"></button>
                </div>
                <div className="search__checkbox-container">
                    <label className="search__checkbox-label">
                        <input className="search__hidden-checkbox" type="checkbox" name="short-film" value="true" />
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