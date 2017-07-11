import *  as actions  from '../actions/hungry';

export const initialState = {
    restaurants: [],
    loading: false,
    error: null
};

export const reducer = (state=initialState, action) => {
    switch(action.type) {

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