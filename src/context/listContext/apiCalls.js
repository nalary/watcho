import { createListFailure, createListStart, createListSuccess, deleteListFailure, deleteListStart, deleteListSuccess, getListsFailure, getListsStart, getListsSuccess, updateListFailure, updateListStart, updateListSuccess } from "./ListActions";
import axios from 'axios';

// get lists
export const getLists = async (dispatch) => {
    dispatch(getListsStart());
    try {
        const res = await axios.get("/lists", {
            headers: { 
                token: "Bearer " + JSON.parse(localStorage.getItem("cineUser")).accessToken
            },
        });
        dispatch(getListsSuccess(res.data));
    } catch (err) {
        dispatch(getListsFailure());
    }
};


// create a list
export const createList = async (list, dispatch) => {
    dispatch(createListStart());
    try {
        const res = await axios.post("/lists", list, {
            headers: { 
                token: "Bearer " + JSON.parse(localStorage.getItem("cineUser")).accessToken
            },
        });
        dispatch(createListSuccess(res.data));
    } catch (err) {
        dispatch(createListFailure());
    }
};


// update a list
export const updateList = async (list, dispatch) => {
    dispatch(updateListStart());
    try {
        const res = await axios.put("/lists/" + list._id, list, {
            headers: { 
                token: "Bearer " + JSON.parse(localStorage.getItem("cineUser")).accessToken
            },
        });
        dispatch(updateListSuccess(res.data));
    } catch (err) {
        dispatch(updateListFailure());
    }
};


// delete list
export const deleteList = async (listId, dispatch) => {
    dispatch(deleteListStart());
    try {
        await axios.delete("/lists/" + listId, {
            headers: { 
                token: "Bearer " + JSON.parse(localStorage.getItem("cineUser")).accessToken
            },
        });
        dispatch(deleteListSuccess(listId));
    } catch (err) {
        dispatch(deleteListFailure());
    }
};