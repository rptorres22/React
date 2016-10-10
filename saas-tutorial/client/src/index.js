import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';
import cookie from 'react-cookie';
import routes from './routes';
import reducers from './reducers/index';
//import ReactGA from 'react-ga';
import { AUTH_USER } from './actions/types';


// Import stylesheets like this, if you choose:
//  import './public/stylesheets/base.scss';

// Initialize Google Analytics
//ReactGA.initialize('UA-000000-01');

//function logPageView() {
//    ReactGA.pageview(window.location.pathname);
//}

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = cookie.load('token');

if (token) {
    // Update application state. User has token and is probably authenticated
    store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
    </Provider>,
  document.querySelector('.wrapper')
);

/*
import Home from './components/pages/home-page';
ReactDOM.render(
    <Home></Home>,
  document.querySelector('.wrapper')
);
*/

/*
RPT NOTES:
Our createStoreWithMiddleware is allowing us to set up Redux Thunk as a
middleware and tell Redux to use our combined reducers as the store of state
for our whole application. We'll care more about that when we start building our
action creators. All you need to know about the Provider portion right now is
that it essentially connects your React views with your Redux stores. React is
great at holding state at a component level, but for bigger, more complicated
apps, Redux can help contain and notify relevant components of updates in your
application's state.

Moving down, we're telling ReactDOM to render Router, which we pass our routes
into. The routes we create and pass in as a property to Router are what map out
which path should render any given component. For example, if a visitor goes to
yourapp.com/dashboard, they should see the dashboard component. This magic is in
part accomplished by browserHistory, which listens for changes in the address
bar, parses the URL, and renders the appropriate component. Continuing to the
second argument of ReactDOM.render(), we are passing in the element we want
React to attach our app to. In this case, our app will attach to the div in our
index.html file with the wrapper class.


react-cookie is used to make sure users stay authenticated even if they refresh
and lose their state.  We also need to check if there is a JWT present in the
user's cookie.  If so, this means we shoudl update the state to an authenticated
status.
*/
