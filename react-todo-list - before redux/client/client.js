// this is the starting point of react

// same as
// var React = require('react');
import React from 'react';

// same as
// var render = require('react-dom').render;
import { render } from 'react-dom';

//importing from a file
import App from '../components/App.js';

render(
	// define the encompassing component,
	// DOM element we want to mount it to
	<App/>,
	document.getElementById('app')
);


