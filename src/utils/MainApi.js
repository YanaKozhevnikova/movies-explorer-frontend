import { MAIN_API_URL } from "./constants";

class MainApi {
    constructor(baseUrl) {
        this._baseUrl = baseUrl;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            Promise.reject(res.status);
        }
    }

    login(email, password) {
        return fetch(`${this._baseUrl}/signin`, {
            method: 'POST',
            credentials: 'include',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({"email": email, "password": password})
        })
        .then(this._checkResponse)
    }

    register(name, email, password) {
        return fetch(`${this._baseUrl}/signup`, {
            method: 'POST',
            credentials: 'include',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({"name": name, "email": email, "password": password}),
        })
        .then(this._checkResponse)
    }

    signOut() {
        return fetch(`${this._baseUrl}/signout`, {
            method: 'DELETE',
            credentials: 'include',
        })
        .then(this._checkResponse)

    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            credentials: 'include',
        })
        .then(this._checkResponse)
    }

    updateUserInfo(userInfo) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        })
        .then(this._checkResponse)
    }

    getSavedMovies() {
        return fetch(`${this._baseUrl}/movies`, {
            credentials: 'include',
        })
        .then(this._checkResponse)
    }

    saveMovie(movieInfo) {
        return fetch(`${this._baseUrl}/movies`, {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(movieInfo)
        })
        .then(this._checkResponse)
    }

    deleteMovie(movieId) {
        return fetch(`${this._baseUrl}/movies/${movieId}`, {
            method: 'DELETE',
            credentials: 'include',
        })
        .then(this._checkResponse)
    }
}

const mainApi = new MainApi(MAIN_API_URL);
export default mainApi;
