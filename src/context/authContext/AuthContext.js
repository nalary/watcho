import AuthReducer from "./AuthReducer";
import { createContext, useEffect, useReducer } from 'react';

const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
};

let localUser = JSON.parse(localStorage.getItem("cineUser"));

if (localUser) {
    const decodedJwt = parseJwt(localUser.accessToken);

    if (decodedJwt.exp * 1000 < Date.now()) {
        localUser = null;
    }
}

const INITIAL_STATE = {
    // user: JSON.parse(localStorage.getItem("cineUser")) || null,
    user: localUser,
    isFetching: false,
    error: false
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    useEffect(() => {
        localStorage.setItem("cineUser", JSON.stringify(state.user));
    }, [state.user]);

    return(
        <AuthContext.Provider
            value={{ 
                user: state.user, 
                isFetching: state.isFetching, 
                error: state.error,
                dispatch
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};