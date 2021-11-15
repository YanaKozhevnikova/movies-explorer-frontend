import { useLocation } from 'react-router-dom';
import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import MoreMovies from './MoreMovies/MoreMovies';
import { INITIAL_CARDS_NUMBER, MORE_CARDS_NUMBER, WINDOW_SIZE, EMPTY_BLOCK_INFO } from '../../utils/constants';


function MoviesCardList({movies, saveMovie, deleteMovie, isSearched}) {
    const location = useLocation();
    const [cardsNumber, setCardsNumber] = React.useState(0);
    const [nextCardsNumber, setNextCardsNumber] = React.useState(0);
    const [cards, setCards] = React.useState([]);
    const [windowSize, setWindowSize] = React.useState(window.innerWidth);
    const [emptyBlockInfo, setEmptyBlockInfo] = React.useState('');

    function checkWindowSize() {
        setTimeout(() => setWindowSize(window.innerWidth), 1000);
    }

    React.useEffect(() => {
        if (location.pathname === '/movies') {
            window.addEventListener('resize', checkWindowSize);    
        } else {
            window.removeEventListener('resize', checkWindowSize);    
        }
    }, [location.pathname])

    React.useEffect(() => {
        if (windowSize > WINDOW_SIZE.large) {
            if (cardsNumber < INITIAL_CARDS_NUMBER.large) {
                setCardsNumber(INITIAL_CARDS_NUMBER.large);
            }
            setNextCardsNumber(MORE_CARDS_NUMBER.large);
        } else if (windowSize > WINDOW_SIZE.small && windowSize <= WINDOW_SIZE.large) {
            if (cardsNumber < INITIAL_CARDS_NUMBER.medium) {
                setCardsNumber(INITIAL_CARDS_NUMBER.medium);
            }
            setNextCardsNumber(MORE_CARDS_NUMBER.medium);
        } else {
            if (cardsNumber < INITIAL_CARDS_NUMBER.small) {
                setCardsNumber(INITIAL_CARDS_NUMBER.small);
            }
            setNextCardsNumber(MORE_CARDS_NUMBER.small);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [windowSize, movies])

    React.useEffect(() => {
        if (location.pathname === '/movies') {
            setCards(movies.slice(0, cardsNumber));
        } else {
            setCards(movies);
        }
    }, [location.pathname, movies, cardsNumber]);

    React.useEffect(() => {
        if (!isSearched && location.pathname === '/movies') {
            setEmptyBlockInfo(EMPTY_BLOCK_INFO.movies);
        } else if (!isSearched && location.pathname === '/saved-movies') {
            setEmptyBlockInfo(EMPTY_BLOCK_INFO.savedMovies);
        } else if (isSearched) {
            setEmptyBlockInfo(EMPTY_BLOCK_INFO.noResult);
        }
    }, [isSearched, location.pathname, movies])

    function showMoreCards() {
        setCardsNumber(cardsNumber + nextCardsNumber);
    }

    if (movies.length === 0) {
        return (
            <div className="movies__section movies-list movies-list_no-movies">
                {emptyBlockInfo}
            </div>
        )
    } else {
        return (
            <>
                <ul className="movies-list movies__section">
                    {cards.map((movie) => (
                        <MoviesCard
                            key={movie.movieId}
                            card={movie}
                            onMovieDelete={deleteMovie}
                            onMovieSave={saveMovie}
                        />
                    ))}
                </ul>
                {(location.pathname === '/movies' && movies.length > cardsNumber) && (<MoreMovies onClick={showMoreCards} />)}
            </>
        );
    }
}

export default MoviesCardList;