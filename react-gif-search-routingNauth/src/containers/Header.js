import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Header extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link className="navbar-brand" to="/">React2Gifs</Link>
          </div>
          <ul className="nav navbar-nav navbar-right">
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/signup">SignUp</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps)(Header);



/*
Notes:

Router:
By replacing our <a> tags with <Link>, we let react-router know it should just
swap out the component passed into App instead of refreshing the page. Now, if
you click on the "Login" and "Sign Up" links, switching between them should be 
almost instantaneous.


*/
