
import AltContainer from 'alt-container';
import React from 'react';

//import Notes from './Notes.jsx';
//import NoteActions from '../actions/NoteActions';
//import NoteStore from '../stores/NoteStore';

import Lanes from './Lanes.jsx';
import LaneActions from '../actions/LaneActions';
import LaneStore from '../stores/LaneStore';

import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

@DragDropContext(HTML5Backend)
export default class App extends React.Component {

	//Commented out to use Alt Container now
	/*
	constructor(props) {
		super(props);

		this.state = NoteStore.getState();
	}
	

	componentDidMount() {
		NoteStore.listen(this.storeChanged);
	}

	componentWillUnmount() {
		NoteStore.unlisten(this.storeChanged);
	}

	storeChanged = (state) => {
		// Without a property initializer `this` wouldn't
    	// point at the right context because it defaults to
    	// `undefined` in strict mode.
    	this.setState(state);
	}
	*/

	render() {

		//Commented out to use Alt Container now
		/*
		const notes = this.state.notes;

		return (
			<div>
				<button className="add-note" onClick={this.addNote}>+</button>
				<Notes notes={notes} onEdit={this.editNote} onDelete={this.deleteNote} />
			</div>
		);
		*/
		/*
		return (
			<div>
				<button className="add-note" onClick={this.addNote}>+</button>
				<AltContainer
					stores={[NoteStore]}
					inject={{
						notes: () => NoteStore.getState().notes
					}}>
					<Notes onEdit={this.editNote} onDelete={this.deleteNote} />
				</AltContainer>
			</div>
		)
		*/
		return (
			<div>
				<button className="add-lane" onClick={this.addLane}>+</button>
				<AltContainer
					stores={[LaneStore]}
					inject={{
						lanes: () => LaneStore.getState().lanes || []
					}}>
					<Lanes />
				</AltContainer>
			</div>
		)
	}

	/*
	deleteNote = (id, e) => {
		// Avoid bubblign to edit
		e.stopPropagation();

		this.setState({
			notes: this.state.notes.filter(note => note.id !== id)
		});
	};
	*/
	/*
	deleteNote(id, e) {
		// Avoid bubblign to edit
		e.stopPropagation();

		NoteActions.delete(id);
	}
	*/


	// We are using an experimental feature known as property
  	// initializer here. It allows us to bind the method `this`
  	// to point at our *App* instance.
  	//
  	// Alternatively we could `bind` at `constructor` using
  	// a line, such as this.addNote = this.addNote.bind(this);

  	/*
  	addNote = () => {
		// It would be possible to write this in an imperative style.
	    // I.e., through `this.state.notes.push` and then
	    // `this.setState({notes: this.state.notes})` to commit.
	    //
	    // I tend to favor functional style whenever that makes sense.
	    // Even though it might take more code sometimes, I feel
	    // the benefits (easy to reason about, no side effects)
	    // more than make up for it.
	    //
	    // Libraries, such as Immutable.js, go a notch further.
	    	this.setState({
	      		notes: this.state.notes.concat([{
	        	id: uuid.v4(),
	        	task: 'New task'
	      	}])
		});
	};
	*/
	/*
	addNote() {
		NoteActions.create({ task: 'New task' });
	}
	*/
	/*
	editNote = (id, task) => {
	  	// Don't modify if trying to set an empty value
	  	if(!task.trim()) {
	  		return;
	  	}

	  	const notes = this.state.notes.map(note => {
	  		if(note.id === id && task) {
	  			note.task = task;
	  		}

	  		return note;
	  	});

	  	this.setState({notes});
	};
	*/
	/*
	editNote(id, task) {
		// Don't modify if trying to set an empty value
		if(!task.trim()) {
			return;
		}

		NoteActions.update({id, task});
	}
	*/

	addLane() {
		LaneActions.create({name: 'New lane'});
	}
}