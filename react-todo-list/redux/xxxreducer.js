// No Longer used anymore since we broke it up in the reducers folder

function getId(state) {
	return state.todos.reduce((maxId, todo) => {
		return Math.max(todo.id, maxId);
	}, -1) + 1;


let reducer = function(state, action) {
	switch (action.type) {
		
		case 'ADD_TODO':
			return Object.assign({}, state, {
				todos: [{
					// add new todo info
					text: action.text,
					completed: false,
					id: getId(state) // pass in state to know the next id
				}, ...state.todos] //es6 - spread syntax, appends arrays
			}) // es6 - Object.assign combines multiple objects into one object - will overwrite existing

		case 'COMPLETE_TODO':
			return Object.assign({}, state, {
				todos: state.todos.map((todo) => {
					return todo.id === action.id ? 
						Object.assign({}, todo, {completed: !todo.completed}) : todo
				})
			})

		case 'DELETE_TODO':
			return Object.assign({}, state, {
				todos: state.todos.filter((todo) => {
					return todo.id !== action.id
				})
			})
	
		case 'CREATE_USER_ID':
			return Object.assign({}, state, {
				user: {
					username: state.user.username,
					id: action.id
				}
			})

		default: 
			return state; //for redux, default should just return state
	}
}

export default reducer;