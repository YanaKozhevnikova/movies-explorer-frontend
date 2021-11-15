import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';
import { getDuration } from '../../utils/moviesFiltration';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function MoviesCard({card, onMovieDelete, onMovieSave}) {
    const location = useLocation();
    const context = React.useContext(CurrentUserContext);
    const [savedMovie, setSavedMovie] = React.useState(false);
    const saveButtonClass = `movie-card__button ${savedMovie ? 'movie-card__button_active' : ''}`;
    const duration = getDuration(card.duration);

    function handleSaveMovie(e) {
        onMovieSave(e.target.closest('.movie-card'));
    }

    function handleDeleteMovie(e) {
        onMovieDelete(e.target.closest('.movie-card'));
    }

    React.useEffect(() => {
        if (context.savedMovies && context.savedMovies.some(movie => {return movie.movieId === card.movieId})) {
            setSavedMovie(true);
        } else {
            setSavedMovie(false);           
        }
    }, [card.movieId, context.savedMovies])

    return (
        <li className="movie-card" id={card.movieId}>
            <a className="movie-card__trailer-link" href={card.trailer} target="_blank" rel="noreferrer">
                <img className="movie-card__image" src={card.image} alt={card.nameRU} />
            </a>
            {location.pathname === '/movies' ? (
                <button onClick={savedMovie ? handleDeleteMovie : handleSaveMovie} className={saveButtonClass} type="button">{!savedMovie ? 'Сохранить' : ''}</button>
            ) : (
                <button onClick={handleDeleteMovie} className='movie-card__button movie-card__button_delete' type="button"></button>
            )
            }
            <div className="movie-card__text-wrapper">
                <p className="movie-card__title">{card.nameRU}</p>
                <p className="movie-card__duration">{duration}</p>
            </div>
        </li>
    );
}

export default MoviesCard;