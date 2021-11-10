import React from 'react';
import './SavedMovies.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import savedMovies from '../../utils/savedMovies';


function SavedMovies() {
  const [cards, setCards] = React.useState(savedMovies);
  
  function handleDeleteCard(card) {
      setCards((initialCards) => initialCards.filter((c) => c.id !== card.id));
  }

  return (
        <section className="movies">
            <SearchForm />
            <MoviesCardList movies={cards} onCardDelete={handleDeleteCard} />
        </section>
    );
}

export default SavedMovies;