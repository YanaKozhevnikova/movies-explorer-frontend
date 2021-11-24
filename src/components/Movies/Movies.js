import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';


function Movies({searchMovies, isLoading, movies, saveMovie, deleteMovie, isSearched}) {
    const hasCards = movies.length > 0 ? true : false;
    return (
        <main className="movies">
            <SearchForm onSearch={searchMovies} hasCards={hasCards} />
            {isLoading ? (
                <Preloader />
            ) : (
                <MoviesCardList saveMovie={saveMovie} deleteMovie={deleteMovie} movies={movies} isSearched={isSearched} />
            )}
        </main>
    );
}

export default Movies;