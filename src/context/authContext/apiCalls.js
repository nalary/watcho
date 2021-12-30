import axios from 'axios';
import { loginFailure, loginStart, loginSuccess } from './AuthActions';

export const loginCall = async (user, dispatch) => {
    dispatch(loginStart());
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, user);
        dispatch(loginSuccess(res.data));
    } catch (err) {
        dispatch(loginFailure());
    }
};