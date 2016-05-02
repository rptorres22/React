/*
Once again, we are creating a stateless functional component here. Our GifItem 
takes the image object passed as props from the GifList and passes the URL into 
an image element.
*/

import React from 'react';

const GifItem = ({gif, onGifSelect}) => {
	return (
		<div className="gif-item" onClick={() => onGifSelect(gif)}>
			<img src={gif.images.downsized.url} />
		</div>
	)
};

export default GifItem;