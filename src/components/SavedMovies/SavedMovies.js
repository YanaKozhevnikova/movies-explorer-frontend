import React from 'react';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from '../Preloader/Preloader';


function SavedMovies({movies, deleteMovie, searchMovies, isSearched, isLoading}) {
    return (
        <main className="movies">
            <SearchForm onSearch={searchMovies} />
            {isLoading ? (
                <Preloader />
            ) : (
                <MoviesCardList movies={movies} deleteMovie={deleteMovie} isSearched={isSearched} />
            )}

        </main>
    );
}

export default SavedMovies;