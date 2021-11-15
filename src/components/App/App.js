import React from 'react';
import { Route, Switch, useLocation, Redirect, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Footer from '../Footer/Footer';
import PageNotFound from '../PageNotFound/PageNotFound';
import { filterMovies, setMoviesInfo } from '../../utils/moviesFiltration';


function App() {
    const location = useLocation();
    const history = useHistory();
    const [currentUser, setCurrentUser] = React.useState({name: '', email: '', _id: ''});
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [movies, setMovies] = React.useState([]);
    const [moviesFiltered, setMoviesFiltered] = React.useState([]);
    const [savedMovies, setSavedMovies] = React.useState([]);
    const [savedMoviesFiltered, setSavedMoviesFiltered] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    
    React.useEffect(() => {
        mainApi.getUserInfo()
        .then(userInfo => {
            if (userInfo) {
                setLoggedIn(true);
                setCurrentUser(userInfo);
                history.push(location.pathname);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [history]);

    React.useEffect(() => {
        if (loggedIn) {
            mainApi.getUserInfo()
            .then((userInfo) => {
                setCurrentUser(userInfo);
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }, [loggedIn])
    
    function handleRegister(name, email, password) {
        mainApi.register(name, email, password)
        .then(userInfo => {
            if (userInfo) {
                setLoggedIn(true);
                setCurrentUser(userInfo);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    function handleLogin(email, password) {
        mainApi.login(email, password)
        .then((res) => {
            if (res) {
                setLoggedIn(true);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }
    
    function handleSignOut() {
        mainApi.signOut()
        .then((res) => {
            if (res) {
                setMovies([]);
                setMoviesFiltered([]);
                setSavedMovies([]);
                setSavedMoviesFiltered([]);
                localStorage.clear();
                setLoggedIn(false);
                history.push('/');
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    function updateUserInfo(userInfo) {
        mainApi.updateUserInfo(userInfo)
        .then(updatedInfo => {
            if (updatedInfo) {
                setCurrentUser(updatedInfo);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    React.useEffect(() => {
        const searchedMovies = JSON.parse(localStorage.getItem('movies-filtered'));
        if (searchedMovies) {
            setMoviesFiltered(searchedMovies);
        }
    }, []);

    React.useEffect(() => {
        if(loggedIn) {
            moviesApi.getMovies()
            .then(res => {
                const moviesInfo = setMoviesInfo(res);        
                setMovies(moviesInfo);
                localStorage.setItem('movies', JSON.stringify(moviesInfo));
            })
            .catch(err => {
                console.log(err);
            })    
        }
    }, [loggedIn]);

    React.useEffect(() => {
        if (loggedIn) {
            mainApi.getSavedMovies()
            .then((res) => {
                setSavedMovies(res);
                setSavedMoviesFiltered(res);
                localStorage.setItem('saved-movies', JSON.stringify(res));
            })  
            .catch(err => {
                console.log(err);
            })  
        }
    }, [loggedIn]);

    function getMovies(keyword, isShortMovies) {
        setIsLoading(true);
        const filteredMovies = filterMovies(movies, keyword, isShortMovies);
        setMoviesFiltered(filteredMovies);
        localStorage.setItem('movies-filtered', JSON.stringify(filteredMovies));
        setIsLoading(false);
    }

    function saveMovie(movie) {
        const movieToSave = movies.find(m => m.movieId.toString() === movie.id);
        if (!savedMovies.some(m => m.movieId === movieToSave.movieId)) {
            mainApi.saveMovie(movieToSave)
            .then(res => {
                setSavedMovies([...savedMovies, res]);
                setSavedMoviesFiltered([...savedMovies, res]);
                localStorage.setItem('saved-movies', JSON.stringify([...savedMovies, res]));
            })
            .catch(err => {
                console.log(err);
            })    
        }
    }

    function deleteMovie(movie) {
        const movieToDelete = savedMovies.find(m => m.movieId.toString() === movie.id);
        mainApi.deleteMovie(movieToDelete._id)
        .then((res) => {
            const newSavedMovies = savedMovies.filter((m) => m._id !== res._id)
            setSavedMovies(newSavedMovies);
            setSavedMoviesFiltered(newSavedMovies);
            localStorage.setItem('saved-movies', JSON.stringify(newSavedMovies));
        })
        .catch(err => {
            console.log(err);
        }) 
    }

    function filterSavedMovies(keyword, isShort) {
        const filteredSavedMovies = filterMovies(savedMovies, keyword, isShort);
        setSavedMoviesFiltered(filteredSavedMovies);
        localStorage.setItem('saved-movies-filtered', JSON.stringify(filteredSavedMovies));
    }

    return (
        <CurrentUserContext.Provider value={{currentUser: currentUser, loggedIn:loggedIn, savedMovies: savedMovies}}>
            {(location.pathname === '/' || location.pathname === '/movies' || location.pathname === '/saved-movies' || location.pathname === '/profile') && 
                (<Header />)
            }
            <Switch>
                <Route exact path="/">
                    <Main />
                </Route>
                <ProtectedRoute
                    path="/movies"
                    component={Movies}
                    getMovies={getMovies}
                    saveMovie={saveMovie}
                    deleteMovie={deleteMovie}
                    isLoading={isLoading}
                    movies={moviesFiltered}
                />
                <ProtectedRoute
                    path="/saved-movies"
                    component={SavedMovies}
                    movies={savedMoviesFiltered}
                    deleteMovie={deleteMovie}
                    filterMovies={filterSavedMovies}
                />
                <ProtectedRoute
                    path="/profile"
                    component={Profile}
                    onUpdateUser={updateUserInfo}
                    onSignOut={handleSignOut}
                />
                <Route path="/signin">
                    {loggedIn ? (
                        <Redirect to="/movies" />
                    ) : (
                        <Login onLogin={handleLogin} />
                    )}
                </Route>
                <Route path="/signup">
                    {loggedIn ? (
                        <Redirect to="/movies" />
                    ) : (
                        <Register onRegister={handleRegister} />
                    )}
                </Route>
                <Route path="*">
                    <PageNotFound />
                </Route>
            </Switch>
            {(location.pathname === '/' || location.pathname === '/movies' || location.pathname === '/saved-movies') && 
                (<Footer />)
            }
        </CurrentUserContext.Provider>
    );
}

export default App;
