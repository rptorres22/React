import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import cookie from 'react-cookie';
import { protectedTest } from '../../actions/auth';


class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.props.protectedTest();
    }

    isRole(roleToCheck, toRender) {
        let userRole = cookie.load('user').role;

        if (userRole == roleToCheck) {
            return toRender;
        }

        return false;
    }

    adminMenu() {
        return (
            <div className="admin-menu">
                <Link to="/admin">Admin</Link>
            </div>
        );
    }

    ownerMenu() {
        return (
            <div className="trainer-menu">
                Owner menu coming soon.
            </div>
        );
    }

    clientMenu() {
        return (
            <div className="client-menu">
                Client menu coming soon.
            </div>
        );
    }

    render() {
        return (
            <div>
                <Link to="/dashboard/inbox">Inbox</Link> | <Link to="/profile/edit">Profile</Link> | <Link to="/billing/settings">Inbox</Link>
                {this.isRole("Admin", this.adminMenu())}
                {this.isRole("Owner", this.ownerMenu())}
                {this.isRole("Client", this.clientMenu())}
                <p>{this.props.content}</p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { content: state.auth.content };
}

export default connect(mapStateToProps, { protectedTest })(Dashboard);

/*
RPT NOTES:

In this snippet, there are several key things to mention and come to understand.
We are using connect to connect our React component to our Redux store. By
encapsulating our router, and therefore contained components, within the
Provider, we made our Redux store available to be connected. Our mapStateToProps
function is how we subscribe our component to specific state updates from our
Redux store. In that function, we are making state.auth.content accessible to
our component at this.props.content. We are also injecting our action creators.
In this instance, we injected all of our action creators, but you can inject
select action creators by calling them specifically (e.g., { protectedTest } in
this instance). To better explain what's happening in this component, without
having built our action creators or reducers, let's start in our constructor. We
are calling our protectedTest() function to run when the component is first
called. This function (which we will soon write) will send an HTTP GET request
to our API's protected test route. We wrote a function, renderContent(), which
will return this.props.content if it exists, otherwise it will do nothing. We
mapped state.auth.content (a piece of our Redux state) to this.props.content.
After our protectedTest() request returns, it will dispatch the payload, or
response, from that request to our auth reducer, which will map the response to
the appropriate piece of state and send back the updated state. Our component,
which is subscribed to updates in this piece of state, will then be updated with
the new state.
*/
