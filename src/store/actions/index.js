import { SET_TOKEN, SET_USER, Add_CAR } from '../actionTypes';

export const setToken = data => ({
    type: SET_TOKEN,
    data,
});

export const setUser = data => ({
    type: SET_USER,
    data,
});

export const addCar = data => ({
    type: Add_CAR,
    data,
});