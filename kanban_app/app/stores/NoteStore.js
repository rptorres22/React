import uuid from 'node-uuid';
import alt from '../libs/alt';
import NoteActions from '../actions/NoteActions';

/*
It is recommended that you use setState with Alt to keep things clean and 
easy to understand. Manipulating this.notes directly would work, but that 
would miss the intent and could become problematic in larger scale as 
mutation is difficult to debug. setState provides a nice analogue to the 
way React works so it's worth using.
*/

class NoteStore {
	constructor() {
		this.bindActions(NoteActions);

		this.notes = [];
	}

	create(note) {
		const notes = this.notes;

		note.id = uuid.v4();

		this.setState({
			notes: notes.concat(note)
		});
	}

	update(updatedNote) {
		const notes = this.notes.map(note => {
			if(note.id === updateNote.id) {
				// Object.assign is used to patch the note data here. It
		        // mutates target (first parameter). In order to avoid that,
		        // I use {} as its target and apply data on it.
		        //
		        // Example: {}, {a: 5, b: 3}, {a: 17} -> {a: 17, b: 3}
		        //
		        // You can pass as many objects to the method as you want.
		        return Object.assign({}, note, updatedNote);
			}

			return note;
		});

		// This is the same as `this.setState({ notes: notes })`
		// {notes} is known as a an ES6 feature known as property shorthand.
		this.setState({notes});
	}

	delete(id) {
		this.setState({
			notes: this.notes.filter(note => note.id !== id)
		});
	}
}

export default alt.createStore(NoteStore, 'NoteStore');