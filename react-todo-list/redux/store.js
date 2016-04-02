
import { applyMiddleware, compose, createStore } from 'redux';
//import reducer from './reducer'
//updated to use combined reducers
import rootReducer from './reducers' //automatically looks for index

// TODO: add middleware
import logger from 'redux-logger';

//for doing async calls
import thunk from 'redux-thunk'


let finalCreateStore = compose(
	applyMiddleware(thunk, logger())
)(createStore);


// will get initialState but if not, default to an empty state with an empty todos array
export default function configureStore(initialState = { todos: [], user: {} }) {
	// initialState = initialState || { todos: [] }	// prior to es6 syntax above
	
	//updated to use combined reducers now
	return finalCreateStore(rootReducer, initialState);
}