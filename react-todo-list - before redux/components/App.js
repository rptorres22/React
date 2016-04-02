import React, { Component } from 'react';
import TextInput from './TextInput';  //don't need the extension



// same as Var App = React.createClass({ redner() {} })
class App extends Component {
	
	render() {
		return ( 
			<div>
				<h1>This is the App Component</h1>
				<TextInput />
			</div>
		);
	}
}

// exporting this App class allows us to use/import it in ../client/client.js
export default App;