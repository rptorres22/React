import React from 'react';
import ReactDOM from 'react-dom';
import GifList from './components/GifList';
import GifModal from './components/GifModal';
import SearchBar from './components/SearchBar';
import request from 'superagent';
import './styles/app.css';

class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			gifs: [],
			selectedGif: null,
			modalIsOpen: false
		};
	}

	openModal(gif) {
		this.setState({
			modalIsOpen: true,
			selectedGif: gif
		});
	}

	closeModal() {
		this.setState({
			modalIsOpen: false,
			selectedGif: null
		});
	}

	handleTermChange(term) {

		/*
		If we are searching for multiple terms, they will probably be separated by a space; 
		however, if we are passing them to the Giphy API, they will need to be separated by 
		a + character. Instead of passing just term to our url const, let's write a regex 
		to replace all spaces with +'s, like so: term.replace(/\s/g, '+').
		*/
		const url = `http://api.giphy.com/v1/gifs/search?q=${term.replace(/\s/g, '+')}&api_key=dc6zaTOxFJmzC`;

		request.get(url, (err, res) => {
			this.setState({ gifs: res.body.data });
		});
	}


	render() {
		return (
			<div>
				<SearchBar onTermChange={term => this.handleTermChange(term)} />
				<GifList 	gifs={this.state.gifs} 
							onGifSelect={selectedGif => this.openModal(selectedGif) }/>
				<GifModal 	modalIsOpen={this.state.modalIsOpen}
							selectedGif={this.state.selectedGif}
							onRequestClose={ () => this.closeModal() } />
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('app'));