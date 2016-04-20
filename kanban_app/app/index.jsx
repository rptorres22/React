//import './main.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';


import alt from './libs/alt';
import storage from './libs/storage';
import persist from './libs/persist';
/*
Trigger the persistency logic at initialization. We will need to 
pass the relevant data to it (Alt instance, storage, storage name) 
and off we go.
*/
persist(alt, storage, 'app');

ReactDOM.render(<App />, document.getElementById('app'));