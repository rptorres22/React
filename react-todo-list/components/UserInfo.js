import React, { Component } from 'react';
//import actions from '../redux/actions';

class UserInfo extends Component {

	handleNewId() {
		this.props.createNewUserId();
	}

	handleNewIdIfOdd() {
		this.props.createNewUserIdIfOdd();
	}

	handleNewIdAsync() {
		this.props.createNewUserIdAsync();
	}

	render() {
		return (
			<li>
				<div>username: {this.props.user.username}</div>
				<div>id: {this.props.user.id}</div>
				<button onClick={this.handleNewId.bind(this)}>Update with random ID</button>
				<button onClick={this.handleNewIdIfOdd.bind(this)}>Update only if odd</button>
				<button onClick={this.handleNewIdAsync.bind(this)}>Update async</button>
			</li>
		)
	}
}

export default UserInfo;