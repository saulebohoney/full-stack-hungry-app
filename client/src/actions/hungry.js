// Action here
export const SET_LOCATION = 'SET_LOCATION';
export const setLocation = location => ({
  type: SET_LOCATION ,
  location
});

export const UPDATE_USER='UPDATE_USER';
export const updateUser=never=>({
    type:UPDATE_USER,
    never
});

export const UPDATE_USER_SUCCESS='UPDATE_USER_SUCCESS';
export const updateUserSuccess=resId =>({
    type:UPDATE_USER_SUCCESS,
    resId
});


export const UPDATE_USER_ERROR='UPDATE_USER_ERROR';
export const updateUserError=resId =>({
    type:UPDATE_USER_ERROR,
    resId
});


export const updateUserNevers= (id) =>dispatch => {
    dispatch(updateUser());
    fetch('/api/users/596904448f832140bbd165e5/nevers', {
      method: 'post',
      body: JSON.stringify({nevers: id}),
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      }
    })
   .then(res=>{
        if (!res.ok) {
           return res.json().then(Promise.reject);
        }
        return res.json();
    }).then(user => {
        dispatch(updateUserSuccess(user.restaurants.id));
        console.log(user);
        console.log(user.restaurants.id);
    }).catch(err => {
        dispatch(updateUserError(err));
    });
};


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
    fetch(`/api/restaurants?categories=restaurants&location=${city}`).then (res => {
        if (!res.ok) {
            return Promise.reject(res.statusText);
        }
        return res.json();
    }).then(restaurant => {
        dispatch(fetchRestaurantSuccess(restaurant));
    }).catch(err => {
        dispatch(fetchRestaurantError(err));
    });

};
