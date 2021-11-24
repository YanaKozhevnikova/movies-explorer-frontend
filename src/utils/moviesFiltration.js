import { MOVIES_API_URL, SHORT_FILM_DURATION } from "./constants";
export function getDuration(time) {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    if (hours === 0) {
        return `${minutes}м`;
    } else if (minutes === 0) {
        return `${hours}ч`;
    } else {
        return `${hours}ч ${minutes}м`;
    }
}

export function filterMovies(movies, keyword, isShortMovies) {
    const string = keyword.toLowerCase();
    const filteredMovies = movies.filter(movie => {
        const isShort = movie.duration <= SHORT_FILM_DURATION;
        const hasKeyword = (movie.nameRU && movie.nameRU.toLowerCase().includes(string)) ||
        (movie.nameEN && movie.nameEN.toLowerCase().includes(string)) ||
        (movie.director && movie.director.toLowerCase().includes(string)) ||
        (movie.country && movie.country.toLowerCase().includes(string)) ||
        (movie.description && movie.description.toLowerCase().includes(string)) ||
        (movie.year && movie.year.toLowerCase().includes(string));
        return isShortMovies ? (hasKeyword && isShort) : (hasKeyword);
    });
    return filteredMovies;
}

export function parseMoviesInfo(movies) {
    const newMoviesArray = movies.map(movie => {
        return {
            country: movie.country || 'страна не указана',
            director: movie.director || 'режиссер не указан',
            duration: movie.duration,
            year: movie.year,
            description: movie.description,
            image: `${MOVIES_API_URL}${movie.image.url}`,
            trailer: movie.trailerLink || 'https://www.youtube.com',
            thumbnail: `${MOVIES_API_URL}${movie.image.formats.thumbnail.url}`,
            movieId: movie.id,
            nameRU: movie.nameRU,
            nameEN: movie.nameEN || 'название на английском не указано',
        }
    })
    return newMoviesArray;
}