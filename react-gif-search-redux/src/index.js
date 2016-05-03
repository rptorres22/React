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
import App from './containers/App';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

const store = configureStore();

ReactDOM.render(
	<Provider store={store}>
		<App />
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
*/