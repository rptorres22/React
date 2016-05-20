/*
Here, we're using Redux's createStore function to—you guessed it—create our store. 
Notice that we're passing in the rootReducer we created before so that we can 
update the state tree of our application.

We are also adding some code to allow the Redux Dev Tools Chrome extension to 
access our store. If you chose not to install this extension, having this extra 
code won't hurt anything, but feel free to remove that line.

Finally, there's some boilerplate code to make Webpack's hot module replacement 
play nice with reducers, but you don't have to worry too much about that right 
now.

all Redux actions are synchronous by default, so we don't have a superagent result 
to pass to our reducer. The action dispatches as soon as the call is made.

There are multiple ways to solve this issue, but my favorite is by adding a 
library called redux-promise. This allows you to add a middleware function to your 
store, and if it receives a promise as a payload from an action, it will dispatch 
the resolved value of that promise.
*/

import { createStore, compose, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
	const store = createStore(
		rootReducer,
		initialState,

		/*
			The biggest change we're seeing here is the addition of Redux's compose 
			method. We need to use this if we're using multiple function 
			transformations to enhance a store—in this case, Redux's applyMiddleware 
			(to which we're passing the imported ReduxPromise) along with our code to 
			enable Redux DevTools.
			*/
		compose (
			applyMiddleware(ReduxPromise),
			window.devToolsExtension ? window.devToolsExtension() : undefined
		)
	);

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('../reducers', () => {
			const nextRootReducer = require('../reducers').default;
			store.replaceReducer(nextRootReducer);
		});
	}

	return store;
}