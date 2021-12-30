import { deleteUserFailure, deleteUserStart, deleteUserSuccess, getUsersFailure, getUsersStart, getUsersSuccess, updateUserFailure, updateUserStart, updateUserSuccess } from "./UserActions";
import axios from 'axios';

// get users
export const getUsers = async (dispatch) => {
    dispatch(getUsersStart());
    try {
        const res = await axios.get("/users", {
            headers: { 
                token: "Bearer " + JSON.parse(localStorage.getItem("cineUser")).accessToken
            },
        });
        dispatch(getUsersSuccess(res.data));
    } catch (err) {
        dispatch(getUsersFailure());
    }
};


// create a user
// export const createUser = async (user, dispatch) => {
//     dispatch(createUserStart());
//     try {
//         const res = await axios.post("/users", user, {
//             headers: { 
//                 token: "Bearer " + JSON.parse(localStorage.getItem("cineUser")).accessToken
//             },
//         });
//         dispatch(createUserSuccess(res.data));
//     } catch (err) {
//         dispatch(createUserFailure());
//     }
// };


// update user
export const updateUser = async (user, dispatch) => {
    dispatch(updateUserStart());
    try {
        const res = await axios.put("/users/" + user._id, user, {
            headers: { 
                token: "Bearer " + JSON.parse(localStorage.getItem("cineUser")).accessToken
            },
        });
        dispatch(updateUserSuccess(res.data));
    } catch (err) {
        dispatch(updateUserFailure());
    }
};


// delete user
export const deleteUser = async (userId, dispatch) => {
    dispatch(deleteUserStart());
    try {
        await axios.delete("/users/" + userId, {
            headers: { 
                token: "Bearer " + JSON.parse(localStorage.getItem("cineUser")).accessToken
            },
        });
        dispatch(deleteUserSuccess(userId));
    } catch (err) {
        dispatch(deleteUserFailure());
    }
};