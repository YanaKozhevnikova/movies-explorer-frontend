import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import MoreMovies from './MoreMovies/MoreMovies';


function MoviesCardList({movies, onCardDelete}) {
    const location = useLocation();
    if (movies.length === 0) {
        return (
            <div className="movies__section movies-list movies-list_no-movies">{location.pathname === '/movies' ? 'Ничего не найдено' : 'Вы еще ничего не сохранили'}</div>
        )
    } else {
        return (
            <>
                <ul className="movies-list movies__section">
                    {movies.map((movie) => (
                        <MoviesCard
                            key={movie.id}
                            card={movie}
                            onCardDelete={onCardDelete}
                        />
                    ))}
                </ul>
                <MoreMovies />
            </>
        );
    }
}

export default MoviesCardList;