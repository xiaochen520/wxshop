import { SET_TOKEN, SET_USER } from '../actionTypes';

export const setToken = data => ({
    type: SET_TOKEN,
    data,
});

export const setUser = data => ({
    type: SET_USER,
    data,
});