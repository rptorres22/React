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

		/*
		Implementing a Getter for NoteStore
		One neat way to resolve lane notes to actual data is to implement a 
		public method NoteStore.getNotesByIds(notes). It accepts an array of 
		Note ids, and returns the corresponding objects.

		Just implementing the method isn't enough. We also need to make it 
		public. In Alt, this can be achieved using this.exportPublicMethods. 
		It takes an object that describes the public interface of the store 
		in question. Consider the implementation below:
		*/
		this.exportPublicMethods({
			getNotesByIds: this.getNotesByIds.bind(this)
		});
	}

	create(note) {
		const notes = this.notes;

		note.id = uuid.v4();

		this.setState({
			notes: notes.concat(note)
		});

		return note;
	}

	update(updatedNote) {
		const notes = this.notes.map(note => {
			if(note.id === updatedNote.id) {
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

	getNotesByIds(ids) {
		// 1. Make sure we are operating on an array and
		// map over the ids
		// [id, id, id, ...] -> [[Note], [], [Note], ...]
		return (ids || []).map(
			// 2. Extract matching notes
			// [Note, Note, Note] -> [Note, ...] (match) or [] (no match)
			id => this.notes.filter(note => note.id === id)

		// 3. Filter out possible empty arrays and get notes
		// [[Note], [], [Note]] => [[Note], [Note]] -> [Note, Note]
		).filter(a => a.length).map(a => a[0]);
	}
}

export default alt.createStore(NoteStore, 'NoteStore');