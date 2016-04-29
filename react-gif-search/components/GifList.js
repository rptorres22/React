/*
You might have noticed that this component looks different than the SearchBar and App. 
Instead of using class GifList extends React.Component like we did before, we're 
instead writing const GifList = (props) => {}.

This is called a stateless functional component. We can use these whenever our 
component does not need to actively track or modify our application's state — in fact, 
if you're writing idiomatic React code, most of your components will be written this way. 
The parent component — in this case, App — passes in all of the data our GifList needs 
via its props. The GifList only needs to worry about how to display this data.

Once again, we are seeing the new ES2015 syntax for writing functions. We are also 
seeing the new ES2015 keyword const, short for "constant", which allows you to declare 
variables that won't be reassigned.

In short, this:

const GifList = (props) => {}
is the equivalent of this:

var GifList = function(props) {}

Within this function, we are looping through the array of gifs passed down from state. 
For each gif, we are rendering a GifItem component.

Notice that we are setting a key property on each GifItem. In React, if you have 
multiple components of the same type, it is recommended that you give each a unique key.

Why do we care about this? When React manipulates the virtual DOM, it tries to update as 
few modules as it can. If it can't tell GifItem components apart, it will need to 
re-render all of them whenever an update is made.
*/

import React from 'react';
import GifItem from './GifItem';

const GifList = (props) => {
	const gifItems = props.gifs.map((image) => {
		return <GifItem key={image.id} gif={image} />
	});

	return (
		<ul>{gifItems}</ul>
	);
};

export default GifList;