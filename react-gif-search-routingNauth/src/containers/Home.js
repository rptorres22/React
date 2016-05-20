/*
If we break this down step-by-step, we can see the following occuring:

-The App component renders a SearchBar, passing through the requestGifs
action creator via a prop called onTermChange

-Whenever text is added or removed from the input field, a JavaScript
event fires, and the SearchBar calls its onInputChange method

-onInputChange calls the onTermChange prop passed from App, and the
requestGifs action creator function receives the term as an argument
*/


import React from 'react';
//import GifsTemp from '../components/GifsTemp';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import GifList from '../components/GifList';
import GifModal from '../components/GifModal';
import SearchBar from '../components/SearchBar';
import '../styles/app.css';

class Home extends React.Component {
	render() {
		return (
			<div>
				<SearchBar onTermChange={this.props.actions.requestGifs} />
				<GifList gifs={ this.props.gifs } onGifSelect={ selectedGif => this.props.actions.openModal({selectedGif})} />
				<GifModal 	modalIsOpen={ this.props.modalIsOpen }
							selectedGif={ this.props.selectedGif }
							onRequestClose={ () => this.props.actions.closeModal() }/>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		gifs: state.gifs.data,
		modalIsOpen: state.modal.modalIsOpen,
		selectedGif: state.modal.selectedGif
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(Actions, dispatch)
	};
}

/*
mapDispatchToProps is the second, optional argument you can pass to react-redux's
connect()() method. It can be easy to confuse it with mapStateToProps, but they
actually do two nearly-opposite things:

-mapDispatchToProps passes data from our container to the store. It provides the
ability for the container to tell the store that it needs to change and enables
this by adding action creators to our container as props.

-mapStateToProps passes data to our container from our store. It makes the result
of reducers available to our container as props.
In our mapDispatchToProps method, we are setting this.props.actions on our App by
calling Redux's bindActionCreators method.

bindActionCreators takes a single object whose values are action creators (in this
case, our Actions object that we imported from src/actions/index.js) and wraps
every action creator in a dispatch call so that they can be invoked within our
container. This is how our app is notified that there is a state change.
*/
export default connect(mapStateToProps, mapDispatchToProps)(Home);
