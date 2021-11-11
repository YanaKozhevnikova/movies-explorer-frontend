import React from 'react';
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Footer from '../Footer/Footer';
import PageNotFound from '../PageNotFound/PageNotFound';

function App() {
    const location = useLocation();
    const history = useHistory();
    const [loggedIn, setLoggeedIn] = React.useState(true);

    function handleSignOut() {
        setLoggeedIn(false);
        history.push('/signin');
    }

    function handleLogin() {
        setLoggeedIn(true);
        history.push('/movies');
    }

    return (
        <>
            {(location.pathname === '/' || location.pathname === '/movies' || location.pathname === '/saved-movies' || location.pathname === '/profile') && 
                (<Header loggedIn={loggedIn} />)
            }
            <Switch>
                <Route exact path="/">
                <Main />
                </Route>
                <Route path="/movies">
                <Movies />
                </Route>
                <Route path="/saved-movies">
                <SavedMovies />
                </Route>
                <Route path="/profile">
                <Profile onSignOut={handleSignOut} />
                </Route>
                <Route path="/signin">
                <Login onLogin={handleLogin} />
                </Route>
                <Route path="/signup">
                <Register onRegister={handleLogin} />
                </Route>
                <Route path="*">
                <PageNotFound />
                </Route>
            </Switch>
            {(location.pathname === '/' || location.pathname === '/movies' || location.pathname === '/saved-movies') && 
                (<Footer />)
            }
        </>
    );
}

export default App;
