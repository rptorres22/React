/*
Currently, our App component is sitting in our src/index.js file. In our
Redux application, this component is instead going to live in the
containers/ directory. We are instead going to use index.js to hook our
React application up to Redux.

Why are we putting App into containers/ instead of components/? In Redux,
a container is a "smart" React component that's hooked directly into the
store, while components refer to "dumb" React components that are unaware
of Redux. We're going to have our App handle passing down state as props,
much as we did before, and leave our other components more or less
untouched.

There are two major things we're doing here:

- We're finally creating our store by calling the configureStore() method we
set up in src/store/configureStore
- We're wrapping our App container in a Redux Provider. This is what allows
us to connect React to our Redux store.

Just like in part one, we are using ReactDOM to render our application
within the div with an id of app in our index.html file.
*/

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Home from './containers/Home';
import Signup from './containers/Signup';
import Login from './containers/Login';
import Favorites from './containers/Favorites';
import RequireAuth from './containers/RequireAuth';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

const store = configureStore();

ReactDOM.render(
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={App}>
				<IndexRoute component={Home} />
				<Route path="signup" component={Signup} />
				<Route path="login" component={Login} />
			<Route path="favorites" component={RequireAuth(Favorites)} />
			</Route>
		</Router>
	</Provider>,
	document.getElementById('app')
);


/*
When our app first loads:

-The App renders as a Redux-connected container and fires an init action
-The rootReducer receives this init action and calls the GifsReducer (along
with any other reducers that might be connected to it). Since the REQUEST_GIFS
action is not being fired (which is the only action type that the GifsReducer
cares about at the moment), the GifsReducer returns its default state of an
empty array on gifs.data
-In App.js, mapStateToProps makes the empty gifs.data array available to App
under this.props.gifs
-mapDispatchToProps binds the requestGif() action creator to the App's props,
making it available under this.props.actions.requestGifs



When the user enters text:

-The user enters text into the SearchBar, triggering its onInputChange event handler
-onInputChange fires the onTermChange prop being passed from the parent App container.
onTermChange contains the this.props.actions.requestGifs action creator, and it is
fired
-requestGifs starts an API call to Giphy and returns a promise while it waits for a
result. It passes this promise to the rootReducer
-The redux-promise middleware sees that we are passing a promise and resolves it. It
passes the result of the Giphy API request to our rootReducer
-The rootReducer passes this data through each reducer linked to it
-The GifsReducer's switch statement checks the action type of REQUEST_GIFS, which
matches one of its cases. It uses the data from the REQUEST_GIFS action to create a
new version of the state with an updated data property
-Redux notifies the connected App container that the store has been updated
-The App container receives the updated gifs from store via mapStateToProps and passes
it to the GifList
-The GifList and GifItem components render the gifs
-Still feeling a little confused? No worries! We're going to run through the entire
flow again in the next step when we add our modal functionality back in. You will see
that, once you get the boilerplate/setup finished, it's pretty easy to hook things into
Redux's flow.




Router:

<Router history={browserHistory}>                                   
There are actually several types of histories you're able to use with react-router, but
browserHistory is the most recommended. (There is also hashHistory, which doesn't require
any sort of server setup, and memoryHistory which is common with React Native, but we
don't need to worry about those right now.)                                                                                                                                                                                                                                                                                                                     

How does browserHistory work? If our app's URL is http://localhost:8080/favorites, for
example, it takes everything after the first / - in this case, favorites - and uses it as
a path to render the components we say it should.                                                                                                                                                                                                                                    

<Route path="/" component={App}>                                  
We're passing in our main route that should render whenever a path contains /: in other
words, all of them! This is where our new App component comes into play. If we have code
that should render on all of our views, our App component should know about it.

However, we also want to render our new Home component whenever we visit
http://localhost:8080. This is where the IndexRoute comes into play:                                                                                                                                                                                                                                                                                                                                                                                                                   

<IndexRoute component={Home} />                                 
IndexRoute is what will load our "default" or "home" page whenever our user visits our
website. Unlike the routes we're about to look at, it doesn't require any sort of "path"
property. However, it is still considered a child component of App.                                                                                                                                                                                                                                                     

Next, we're defining our other three views — Signup, Login, and Favorites:

        <Route path="signup" component={Signup} />
        <Route path="login" component={Login} />
        <Route path="favorites" component={Favorites} />

Whenever react-router detects the path in the URL, it will pass the component we specify
to App, which will render it via this.props.children.                                                                                                                                                                                                                                                                                                                                                                                                
If you click the Login and Sign Up links in the navbar, or visit
http://localhost:8080/favorites, you should see the basic components we created render.                                                                                                                                                          
*/
