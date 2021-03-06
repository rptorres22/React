import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router';
import { loginUser } from '../../actions';

const form = reduxForm({
  form: 'login'
});

class Login extends Component {
  handleFormSubmit(formProps) {
    this.props.loginUser(formProps);
  }

  renderAlert() {
    if(this.props.errorMessage) {
        return (
            <div>
                <span><strong>Error!</strong> {this.props.errorMessage}</span>
            </div>
        );
    }
  }

  render() {
      const { handleSubmit } = this.props;

      return (
          <div>
              <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                  {this.renderAlert()}
                  <div>
                      <label>Email</label>
                      <Field name="email" className="form-control" component="input" type="text" />
                  </div>
                  <div>
                      <label>Password</label>
                      <Field name="password" className="form-control" component="input" type="pasword" />
                  </div>
                  <button type="submit" className="btn btn-primary">Login</button>
              </form>
          </div>
      );
  }
}

function mapStateToProps(state) {
    return {
        errorMessage: state.auth.error,
        message: state.auth.message,
        authenticated: state.auth.authenticated
    };
}

export default connect(mapStateToProps, { loginUser })(form(Login));

/*
RPT NOTES:
Our login page is going to call our loginUser() action creator with the inputs
from our form. It is listening for an error response, which the renderAlert()
function will display if an error is received.
*/
