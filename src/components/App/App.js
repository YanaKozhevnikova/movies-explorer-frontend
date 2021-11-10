import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Footer from '../Footer/Footer';

function App() {
  // const [loggedIn, setLoggedIn] = React.useState(true);
  const location = useLocation();
  const loggedIn = true;

  return (
    <div className="app">
      {(location.pathname === '/' || location.pathname === '/movies' || location.pathname === '/saved-movies') && 
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
          <Profile />
        </Route>
        <Route path="/signin">
          <Login />
        </Route>
        <Route path="/signup">
          <Register />
        </Route>
      </Switch>
      {(location.pathname === '/' || location.pathname === '/movies' || location.pathname === '/saved-movies') && 
        (<Footer />)
      }
    </div>
  );
}

export default App;
