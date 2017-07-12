import *  as actions  from '../actions/hungry';

export const initialState = {
    restaurants: [],
    nevers:[],
    loading: false,
    error: null
};

export const reducer = (state=initialState, action) => {
    switch(action.type) {

    case actions.UPDATE_USER:
        return Object.assign({}, state, {
            loading:true});

    case actions.UPDATE_USER_SUCCESS:
        return Object.assign({}, state, {
            nevers:action.never});

    case actions.UPDATE_USER_ERROR:
        return Object.assign({}, state, {
            error:'Error!'});

    case actions.FETCH_RESTAURANT_REQUEST:
        return Object.assign({}, state, {
            loading:true});
  
    case actions.FETCH_RESTAURANT_SUCCESS:
        return Object.assign({}, state, {
            restaurants: action.restaurant});

    case actions.FETCH_RESTAURANT_ERROR:
        return Object.assign({}, state, {
            error:'Error!'});
    default:
        return state;
    }
};