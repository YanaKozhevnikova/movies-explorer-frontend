import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';


function Movies({getMovies, isLoading, movies, saveMovie, deleteMovie}) {
    return (
        <main className="movies">
            <SearchForm onSearch={getMovies} />
            {isLoading ? (
                <Preloader />
            ) : (
                <MoviesCardList saveMovie={saveMovie} deleteMovie={deleteMovie} movies={movies} />
            )}
        </main>
    );
}

export default Movies;