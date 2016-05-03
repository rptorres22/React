/*
The next step is to combine all of our reducers into what is called the rootReducer. 
We'll pass this main reducing function in as a parameter when we create our store.

This code should be fairly easy to understand; we are using Redux's built-in 
combineReducers function to create a single object that contains a bunch of reducers. 
The key on the object—in this case, gif—is the name of the piece of the state, and 
the value is the reducer itself (or, more accurately, what is being returned by the 
reducer).

Any other reducers we build should simply be added to the object in the same way.
*/
import { combineReducers } from 'redux';
import GifsReducer from './gifs';
import ModalReducer from './modal';

const rootReducer = combineReducers({
	gifs: GifsReducer,
	modal: ModalReducer
});

export default rootReducer;