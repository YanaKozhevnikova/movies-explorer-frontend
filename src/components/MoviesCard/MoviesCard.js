import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';

function MoviesCard({card, onCardDelete}) {
    const location = useLocation();
    const [savedMovie, setSavedMovie] = React.useState(false);

    const saveButtonClass = `movie-card__button ${savedMovie ? 'movie-card__button_active' : ''}`;

    function handleSaveMovie() {
        setSavedMovie(true);
    }

    function handleDeleteMovie() {
        onCardDelete(card);
    }

    return (
        <li className="movie-card">
            <a className="movie-card__trailer-link" href={card.trailerLink} target="_blank" rel="noreferrer">
                <img className="movie-card__image" src={card.image.url} alt={card.image.name} />
            </a>
            {location.pathname === '/movies' ? (
                <button onClick={handleSaveMovie} className={saveButtonClass} type="button">{!savedMovie ? 'Сохранить' : ''}</button>
            ) : (
                <button onClick={handleDeleteMovie} className='movie-card__button movie-card__button_delete' type="button"></button>
            )
            }
            <div className="movie-card__text-wrapper">
                <p className="movie-card__title">{card.nameRU}</p>
                <p className="movie-card__duration">{card.duration}</p>
            </div>
        </li>
    );
}

export default MoviesCard;