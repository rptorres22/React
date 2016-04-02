// this is the starting point of react

// same as
// var React = require('react');
import React from 'react';

// same as
// var render = require('react-dom').render;
import { render } from 'react-dom';

//importing from a file
import App from '../components/App.js';


// configure and create our store
// createStore(reducers, initialState) // empty [] array of todos
import configureStore from '../redux/store';
import { Provider } from 'react-redux';

let initialState = {
	todos: [{
		id: 0,
		completed: false,
		text: 'Initial todo for demo purpsoes'
	}],

	user: {
		username: 'rowell',
		id: 13
	}
};

let store = configureStore(initialState);



render(
	// define the encompassing component,
	// DOM element we want to mount it to
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('app')
);


