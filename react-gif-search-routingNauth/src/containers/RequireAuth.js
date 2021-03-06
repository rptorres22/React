import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

/*
Here, instead of exporting a class like we would with a normal component, we're
exporting a function that takes a component as an argument. In this instance,
since we're trying to protect our Favorites component, that is what we are going
to pass in as our WrappedComponent in a few paragraphs.

    componentWillMount() {
      if (!this.props.authenticated) {
        browserHistory.push('/login');
      }                                                                                                                                                                                                                                                                                                                                                                                                                               

componentWillMount() is a lifecycle method that runs immediately before a
component is rendered: essentially, it functions like a constructor method.                                                                                                                                                       

Here, when our component renders, we check Redux's store to see if the user
is currently authenticated. If not, we use browserHistory to redirect them
to the login screen.
*/
export default function(WrappedComponent) {
  class Auth extends React.Component {
    componentWillMount() {
      if (!this.props.authenticated) {
        browserHistory.push('/login');
      }
    }

    /*
    If the user is authenticated, we simply return the WrappedComponent (which,
    once again, will be Favorites), including any props that may have been
    passed to it from a parent component.                                                                                                                                                                                          
    */
    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
  }

  return connect(mapStateToProps)(Auth);

}


/*
Notes:
We've got one more major piece left here before we start actually authenticating
users. Even though users can only see the My Favorites link in the header when
they're signed in, there's nothing to stop them from navigating to it when
they're not authenticated. We need a way to redirect them to the login page if
they're trying to access a page only logged in user should be able to see.

To do this, we need to use a Higher-Order Component, sometimes known as a
decorator.

While this term sounds intimidating, it's actually rather straightforward: a
higher-order component is a function that takes an existing component and then
wraps it in another component in order to add some new functionality.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   

Confused? We've actually been using higher-order components for awhile without
giving them a name! A good example is react-redux's connect()() function:
instead of just returning the component, we wrap it in connect in order to give
it access to our store.                                                                                                                                                                                                                                                                  
*/
