import React, { Component } from 'react';
import TodoInput from './TodoInput';  //don't need the extension
import TodoList from './TodoList';
import { connect } from 'react-redux'; //to connect our state 
import { bindActionCreators } from 'redux'; //to wrap dispatcher
import actions from '../redux/actions';
import UserInfo from './UserInfo'

// same as Var App = React.createClass({ render() {} })
class App extends Component {
	
	render() {
		return ( 
			<div>
				<h1>Todo List</h1>
				<UserInfo user={this.props.user} createNewUserId={this.props.actions.createNewUserId} createNewUserIdIfOdd={this.props.actions.createNewUserIdIfOdd} createNewUserIdAsync={this.props.actions.createNewUserIdAsync}/>
				<TodoInput addTodo={this.props.actions.addTodo} />
				<TodoList actions={this.props.actions} todos={this.props.todos}/>
			</div>
		);
	}
}


//passing whole state, we can also pass a certain portion (i.e. state.todos) also attaches dispatch function
function mapStateToProps(state) {
	return state; 
}

//passing dispatcher to just App so we don't have to keep passing down the dispatcher to all components that need it
//just passing actions from dipsatcher as well
//can pass specific actions as well
function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(actions, dispatch) //so we don't have to use this.props.dispatch(actionName())
	}
}

// exporting this App class allows us to use/import it in ../client/client.js
export default connect(mapStateToProps, mapDispatchToProps)(App);