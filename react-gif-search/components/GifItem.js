/*
Once again, we are creating a stateless functional component here. Our GifItem 
takes the image object passed as props from the GifList and passes the URL into 
an image element.
*/

import React from 'react';

const GifItem = (image) => {
	return (
		<li>
			<img src={image.gif.images.downsized.url} />
		</li>
	)
};

export default GifItem;