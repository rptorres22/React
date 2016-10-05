import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
    class Authentication extends Component {
        static contextTypes = {
            router: React.PropTypes.object
        }

        componentWillMount() {
            if(!this.props.authenticated) {
                this.context.router.push('/login');
            }
        }

        componentWillUpdate(nextProps) {
            if(!nextProps.authenticated) {
                this.context.router.push('/login');
            }
        }

        render() {
            return <ComposedComponent {...this.props} />
        }
    }

    function mapStateToProps(state) {
        return { authenticated: state.auth.authenticated };
    }

    return connect(mapStateToProps)(Authentication);
}

/*
RPT NOTES:

This is a higher order component, which will allow us pass some
functionality down to multiple other components. This component will subscribe
to authentication state. If the user is not authenticated, they will be
redirected to the login page. Otherwise, they will be allowed to proceed to
their intended route. Create src/components/auth/require-auth.js

We will wrap thsi higher order component around our dashboard in src/routes.js
*/
