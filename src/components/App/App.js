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
import { filterMovies, parseMoviesInfo } from '../../utils/moviesFiltration';


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
    const [isFormLoading, setIsFormLoading] = React.useState(false);
    const [areMoviesSearched, setAreMoviesSearched] = React.useState(false);
    const [areSavedMoviesSearched, setAreSavedMoviesSearched] = React.useState(false);
    const [loginError, setLoginError] = React.useState(0);
    const [registerError, setRegisterError] = React.useState(0);
    const [updateUserStatus, setUpdateUserStatus] = React.useState(0);


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
            setIsLoading(true);
            setLoginError(0);
            setRegisterError(0);
            Promise.all([mainApi.getUserInfo(), moviesApi.getMovies(), mainApi.getSavedMovies()])
            .then(([userInfo, initialMovies, initialSavedMovies]) => {
                const moviesInfo = parseMoviesInfo(initialMovies);
                setCurrentUser(userInfo);
                setMovies(moviesInfo);
                setSavedMovies(initialSavedMovies);
                setSavedMoviesFiltered(initialSavedMovies);
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setIsLoading(false);
            })
        }
    }, [loggedIn]);

    React.useEffect(() => {
        const searchedMovies = JSON.parse(localStorage.getItem('movies-filtered'));
        if (searchedMovies) {
            setMoviesFiltered(searchedMovies);
        }
    }, []);

    function handleRegister(name, email, password) {
        setIsFormLoading(true);
        mainApi.register(name, email, password)
        .then(userInfo => {
            if (userInfo) {
                setLoggedIn(true);
                setCurrentUser(userInfo);
            }
        })
        .catch((errStatus) => {
            setRegisterError(errStatus);
        })
        .finally(() => {
            setIsFormLoading(false);
        })
    }

    function handleLogin(email, password) {
        setIsFormLoading(true);
        mainApi.login(email, password)
        .then((res) => {
            if (res) {
                setLoggedIn(true);
            }
        })
        .catch((errStatus) => {
            setLoginError(errStatus);
        })
        .finally(() => {
            setIsFormLoading(false);
        })
    }
    
    function handleSignOut() {
        setIsFormLoading(true);
        mainApi.signOut()
        .then((res) => {
            if (res) {
                setMovies([]);
                setMoviesFiltered([]);
                setSavedMovies([]);
                setSavedMoviesFiltered([]);
                setAreMoviesSearched(false);
                setAreSavedMoviesSearched(false);
                setCurrentUser({name: '', email: '', _id: ''});
                setUpdateUserStatus(0);
                localStorage.clear();
                setLoggedIn(false);
                history.push('/');
            }
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            setIsFormLoading(false);
        })
    }

    function updateUserInfo(userInfo) {
        setIsFormLoading(true);
        mainApi.updateUserInfo(userInfo)
        .then(updatedInfo => {
            if (updatedInfo) {
                setCurrentUser(updatedInfo);
                setUpdateUserStatus(200);
            }
        })
        .catch((err) => {
            setUpdateUserStatus(err);
        })
        .finally(() => {
            setIsFormLoading(false);
        })
    }

    function saveMovie(movie) {
        const movieToSave = movies.find(m => m.movieId.toString() === movie.id);
        if (!savedMovies.some(m => m.movieId === movieToSave.movieId)) {
            mainApi.saveMovie(movieToSave)
            .then(res => {
                setSavedMovies([...savedMovies, res]);
                setSavedMoviesFiltered([...savedMovies, res]);
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
            if (newSavedMovies.length === 0) {
                setAreSavedMoviesSearched(false);
            }
        })
        .catch(err => {
            console.log(err);
        }) 
    }

    function searchMovies(keyword, isShortMovies) {
        const filteredMovies = filterMovies(movies, keyword, isShortMovies);
        setMoviesFiltered(filteredMovies);
        localStorage.setItem('movies-filtered', JSON.stringify(filteredMovies));
        setAreMoviesSearched(true);
    }

    function searchSavedMovies(keyword, isShort) {
        const filteredSavedMovies = filterMovies(savedMovies, keyword, isShort);
        setSavedMoviesFiltered(filteredSavedMovies);
        setAreSavedMoviesSearched(true);
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
                    searchMovies={searchMovies}
                    saveMovie={saveMovie}
                    deleteMovie={deleteMovie}
                    isLoading={isLoading}
                    movies={moviesFiltered}
                    isSearched={areMoviesSearched}
                />
                <ProtectedRoute
                    path="/saved-movies"
                    component={SavedMovies}
                    movies={savedMoviesFiltered}
                    deleteMovie={deleteMovie}
                    searchMovies={searchSavedMovies}
                    isSearched={areSavedMoviesSearched}
                    isLoading={isLoading}
                />
                <ProtectedRoute
                    path="/profile"
                    component={Profile}
                    onUpdateUser={updateUserInfo}
                    onSignOut={handleSignOut}
                    isLoading={isLoading}
                    isFormLoading={isFormLoading}
                    updateStatus={updateUserStatus}
                />
                <Route path="/signin">
                    {loggedIn ? (
                        <Redirect to="/movies" />
                    ) : (
                        <Login onLogin={handleLogin} error={loginError} isFormLoading={isFormLoading} />
                    )}
                </Route>
                <Route path="/signup">
                    {loggedIn ? (
                        <Redirect to="/movies" />
                    ) : (
                        <Register onRegister={handleRegister} error={registerError} isFormLoading={isFormLoading} />
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
