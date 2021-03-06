import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as Actions from '../actions';

class Header extends React.Component {

  handleSignout() {
    this.props.signOutUser();
  }




/*
Here, we're extracting away the conditional logic needed to render our links
into its own method. authenticated is being made available from our AuthReducer
via mapStateToProps, and if it's set to true, we return our links to
"My Favorites" and "Sign Out", since that's what signed-in users should see.

But why are we returning an array of <li>s? On any sort of React render()
method, we have to return a single element, which is why we're always wrapping
things in <div> tags. However, wrapping a group of <li>s within a <div> inside
of a <ul> isn't very clean markup.

We can instead return an array of comma-separated <li>s, and React will just
list them in order. The only thing we need in order to do this is to give them a
key prop so that they are unique.

Notice that our "Sign Out" link isn't a <Link> tag but instead a normal <a>
element. This is because we're not actually routing anywhere when this link is
clicked; instead, we're calling the handleSignout() method to fire our
signOutUser() action creator.

Now, when we "sign in" with any credentials that pass validation, our links
should change! In addition, when Sign Out is clicked, authentication should be
set to false.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
*/
  renderAuthLinks() {
    if (this.props.authenticated) {
      return [
        <li className="nav-item" key={1}>
          <Link className="nav-link" to="/favorites">My Favorites</Link>
        </li>,
        <li className="nav-item" key={2}>
          <a className="nav-link" href="#" onClick={() => this.handleSignout()}></a>
        </li>
      ]
    } else {
      return [
        <li className="nav-item" key={1}>
          <Link className="nav-link" to="/login">Login</Link>
        </li>,
        <li>
          <Link className="nav-link" to="/signup">Sign Up</Link>
        </li>
      ]
    }
  }

  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link className="navbar-brand" to="/">React2Gifs</Link>
          </div>
          <ul className="nav navbar-nav navbar-right">
            { this.renderAuthLinks() }
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  }
}

export default connect(mapStateToProps, Actions)(Header);



/*
Notes:

Router:
By replacing our <a> tags with <Link>, we let react-router know it should just
swap out the component passed into App instead of refreshing the page. Now, if
you click on the "Login" and "Sign Up" links, switching between them should be
almost instantaneous.



Auth:
Like we saw with Login and Signup, we don't actually need to explicitly call
mapDispatchToProps and bindActionCreators to hook our action creators into our
container. Our Header doesn't have any child components, so we can just pass in
Actions directly in order to make signOutUser() available on this.props.                                                                                                                                                                                                                                                                                                                      


*/
