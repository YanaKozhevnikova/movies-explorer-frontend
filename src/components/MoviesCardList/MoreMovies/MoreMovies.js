import './MoreMovies.css';


function MoreMovies({onClick}) {
    return (
        <div className="more-movies">
            <button onClick={onClick} className="more-movies__button" type="button">Ещё</button>
        </div>
    );
}

export default MoreMovies;