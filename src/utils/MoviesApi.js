import { MOVIES_API_URL } from "./constants";
class MoviesApi {
    constructor(baseUrl) {
        this._baseUrl = baseUrl;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(res.status);
        }
    }

    getMovies() {
        return fetch(`${this._baseUrl}/beatfilm-movies`, {
            method: 'GET',
        })
        .then(this._checkResponse)
    }
}

const moviesApi = new MoviesApi(MOVIES_API_URL);
export default moviesApi;
