// Action here

export const FETCH_RESTAURANT_SUCCESS = 'FETCH_RESTAURANT_SUCCESS';
export const fetchRestaurantSuccess = restaurant => ({
    type: FETCH_RESTAURANT_SUCCESS,
    restaurant
});

export const FETCH_RESTAURANT_ERROR = 'FETCH_RESTAURANT_ERROR';
export const fetchRestaurantError = restaurant => ({
    type: FETCH_RESTAURANT_ERROR,
    restaurant
});

export const FETCH_RESTAURANT_REQUEST = 'FETCH_RESTAURANT_REQUEST';
export const fetchRestaurantRequest = restaurant => ({
    type: FETCH_RESTAURANT_REQUEST,
    restaurant
});


export const fetchRestaurant = (city) => dispatch => {
    dispatch(fetchRestaurantRequest());
    fetch(`/api/restaurants?location=${city}`).then (res => {

        if (!res.ok) {
            return Promise.reject(res.statusText);
        }
        return res.json();
    }).then(cheese => {
        dispatch(fetchRestaurantSuccess(cheese));
    }).catch(err => {
        dispatch(fetchRestaurantError(err));
    });
};

