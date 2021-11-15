import React from 'react';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies({movies, deleteMovie, filterMovies}) {
  return (
        <main className="movies">
            <SearchForm onSearch={filterMovies} />
            <MoviesCardList movies={movies} deleteMovie={deleteMovie}  />
        </main>
    );
}

export default SavedMovies;