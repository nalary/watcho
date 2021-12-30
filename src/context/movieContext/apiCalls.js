import { createMovieFailure, createMovieStart, createMovieSuccess, deleteMovieFailure, deleteMovieStart, deleteMovieSuccess, getMoviesFailure, getMoviesStart, getMoviesSuccess, updateMovieFailure, updateMovieStart, updateMovieSuccess } from "./MovieActions";
import axios from 'axios';

// get movies
export const getMovies = async (dispatch) => {
    dispatch(getMoviesStart());
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/movies`, {
            headers: { 
                token: "Bearer " + JSON.parse(localStorage.getItem("cineUser")).accessToken
            },
        });
        dispatch(getMoviesSuccess(res.data));
    } catch (err) {
        dispatch(getMoviesFailure());
    }
};


// create a movie
export const createMovie = async (movie, dispatch) => {
    dispatch(createMovieStart());
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/movies`, movie, {
            headers: { 
                token: "Bearer " + JSON.parse(localStorage.getItem("cineUser")).accessToken
            },
        });
        dispatch(createMovieSuccess(res.data));
    } catch (err) {
        dispatch(createMovieFailure());
    }
};


// update movie
export const updateMovie = async (movie, dispatch) => {
    dispatch(updateMovieStart());
    try {
        const res = await axios.put(`${process.env.REACT_APP_API_URL}/movies/` + movie._id, movie, {
            headers: { 
                token: "Bearer " + JSON.parse(localStorage.getItem("cineUser")).accessToken
            },
        });
        dispatch(updateMovieSuccess(res.data));
    } catch (err) {
        dispatch(updateMovieFailure());
    }
};


// delete movie
export const deleteMovie = async (movieId, dispatch) => {
    dispatch(deleteMovieStart());
    try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/movies/` + movieId, {
            headers: { 
                token: "Bearer " + JSON.parse(localStorage.getItem("cineUser")).accessToken
            },
        });
        dispatch(deleteMovieSuccess(movieId));
    } catch (err) {
        dispatch(deleteMovieFailure());
    }
};