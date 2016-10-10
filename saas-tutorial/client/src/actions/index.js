import axios from 'axios';
// Axios will allow us to make HTTP requests. There are several other libraries
// available for this (a lot of people like Fetch, for example).
import cookie from 'react-cookie';
import { logoutUser } from './auth';
import { STATIC_ERROR, FETCH_USER } from './types';
export const API_URL = 'http://localhost:3000/api';
export const CLIENT_ROOT_URL = 'http://localhost:8080';


//=========================
// Utility actions
//=========================

export function fetchUser(uid) {
    return function(dispatch) {
        axios.get(`${API_URL}/user/${uid}`, {
            headers: { 'Authorization': cookie.load('token') }
        })
        .then(response => {
            dispatch({
                type: FETCH_USER,
                payload: response.data.user
            });
        })
        .catch(response => dispatch(errorHandler(response.data.error)))
    }
}

export function errorHandler(dispatch, error, type) {
    let errorMessage = (error.data.error) ? error.data.error : error.data;

    // NOT AUTHENTICATED ERROR
    if(error.status === 401) {
        errorMessage = 'You are not authorized to do this.';
    }

    dispatch({
        type: type,
        payload: errorMessage
    });
    //logoutUser();
}

// Post request
export function postData(action, errorType, isAuthReq, url, dispatch, data) {
    const requestUrl = API_URL + url;
    let headers = {};

    if(isAuthReq) {
        headers = {headers: { 'Authorization': cookie.load('token') }};
    }

    axios.post(requestUrl, data, headers)
         .then((response) => {
             dispatch({
                 type: action,
                 payload: response.data
             });
         })
         .catch((error) => {
             errorHandler(dispatch, error.response, errorType)
         });
}

// Get request
export function getData(action, errorType, isAuthReq, url, dispatch) {
    const requestUrl = API_URL + url;
    let headers = {};

    if(isAuthReq) {
        headers = {headers: { 'Authorization': cookie.load('token') }};
    }

    axios.get(requestUrl, headers)
         .then((response) => {
             dispatch({
                 type: action,
                 payload: response.data
             });
         })
         .catch((error) => {
             errorHandler(dispatch, error.response, errorType)
         });
}

// Put request
export function putData(action, errorType, isAuthReq, url, dispatch, data) {
    const requestUrl = API_URL + url;
    let headers = {};

    if(isAuthReq) {
        headers = {headers: { 'Authorization': cookie.load('token') }};
    }

    axios.put(requestUrl, data, headers)
         .then((response) => {
             dispatch({
                 type: action,
                 payload: response.data
             });
         })
         .catch((error) => {
             errorHandler(dispatch, error.response, errorType)
         });
}

// Delete request
export function deleteData(action, errorType, isAuthReq, url, dispatch) {
    const requestUrl = API_URL + url;
    let headers = {};

    if(isAuthReq) {
        headers = {headers: { 'Authorization': cookie.load('token') }};
    }

    axios.delete(requestUrl, data, headers)
         .then((response) => {
             dispatch({
                 type: action,
                 payload: response.data
             });
         })
         .catch((error) => {
             errorHandler(dispatch, error.response, errorType)
         });
}

//=========================
// Static Page actions
//=========================
export function sendContactForm({ name, emailAddress, message }) {
    return function(dispatch) {
        axios.post(`${API_URL}/communication/contact`, { name, emailAddress, message })
             .then(resopnse => {
                 dispatch({
                     type: SEND_CONTACT_FORM,
                     payload: response.data.message
                 });
             })
             .catch((error) => {
                 errorHandler(dispatch, error.response, STATIC_ERROR)
             });
    }
}

/*
RPT NOTES:
We set up an error handler, which will dispatch our authentication error
messages to our store and even log our user out on a 401 response
(unauthorized). Since most HTTP requests are structured similarly, I'm just
going to break two of them down for demonstration. Our registerUser() action
creator takes an object as an argument. If you're not familiar with this syntax,
just note it is identical to:

{ email: email, firstName: firstName, lastName: lastName, password: password }

We just used some slightly cleaner ES6. We are using axios to send a POST
request to our API, with the request body being the form inputs
(in object form). Since axios is promise-based, we have access to .then() in the
result of a successful response and .catch() in the result of an error. We tie
our errorHandler to the .catch(), and we save the JSON Web Token response we get
from our API in a cookie in the event that we have a successful request and
reach our .then(). We also dispatch an action with the type AUTH_USER, which
will tell our reducer to update our state, saying the user is now authenticated.
Then we redirect the user to the dashboard.


auth.js
Our protectedTest() action creator is sending a GET request to our API's
/protected endpoint, which requires a valid JWT to be sent in the authorization
header in order to send back a response. Note how we send the authorization
header with this request. Additionally, the response is being dispatched in the
payload. Keep in mind, our protected route is sending a JSON response. The key
we set it up to send was content. You will be able to access your API responses
in other requests in the same way (response.data.yourKeyName).

Note: In the event of a POST request that needs to send headers, the headers are
the third argument, behind the data being sent in the body of the request.
*/
