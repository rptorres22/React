/*
An action is a plain JavaScript object that sends data from our application 
to our store. Actions are fired whenever the state needs to change, and the 
switch statement in our reducers "catch" these actions so that they can 
update the store.

Whenever you write an action, there are generally three main pieces that 
should exist:

The action itself. This is a plain JavaScript object with up to two pieces: a 
type (required) and a payload (only required if you want to pass data along 
with your action)

The action type. In Redux, this is almost always expressed as a const in all 
caps so that it can be exported for use in other parts of our application 
(such as our reducers). You can just use regular strings, but it makes it 
that much more likely that you'll introduce bugs via typos or if your action 
names change.

The action creator. Action creators are simply functions that create actions. 
We can import these into our containers and pass them into child components 
via props
*/

import request from 'superagent';

//Action Type:
export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const REQUEST_GIFS = 'REQUEST_GIFS';

const API_URL = 'http://api.giphy.com/v1/gifs/search?q=';
const API_KEY = '&api_key=dc6zaTOxFJmzC';

//Action Creator:
export function requestGifs(term = null) {
	const data = request.get(`${API_URL}${term.replace(/\s/g, '+')}${API_KEY}`);

	//Action:
	return {
		type: REQUEST_GIFS,
		payload: data
	}
}

export function openModal(gif) {
	return {
		type: OPEN_MODAL,
		gif
	}
}

export function closeModal() {
	return {
		type: CLOSE_MODAL
	}
}