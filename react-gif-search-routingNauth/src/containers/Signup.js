import React from 'react';
import { reduxForm } from 'redux-form';
import * as Actions from '../actions';

/* validation
  We're checking that the email, password, and passwordConfirmation fields have
  a value, checking our email value against a regex to make sure it's actually
  an email, and comparing password and passwordConfirmation to make sure they
  match.
*/
const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = "Please enter an email.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  if (!values.password) {
    errors.password = "Please enter a password.";
  }

  if (!values.passwordConfirmation) {
    errors.passwordConfirmation = "Please enter a password confirmation.";
  }

  if (values.password !== values.passwordConfirmation) {
    errors.password = 'Passwords do not match';
  }

  return errors;
};


class Signup extends React.Component {

  handleFormSubmit = (values) => {
    //console.log(values);
    this.props.signInUser(values);
  };

  render() {

    const { handleSubmit, fields: { email, password, passwordConfirmation } } = this.props;

    return (
      <div className="container">
        <div className="col-md-6 col-md-offset-3">
          <h2 className="text-center">Sign Up</h2>
          <form onSubmit={handleSubmit(this.handleFormSubmit)}>
            <fieldset className={`form-group ${email.touched && email.invalid ? 'has-error' : ''}`}>
              <label className="control-label">Email</label>
              <input {...email} type="text" placeholder="Email" className="form-control" />
              {email.touched ? <div className="help-block">{email.error}</div> : ''}
            </fieldset>
            <fieldset className={`form-group ${password.touched && password.invalid ? 'has-error' : ''}`}>
              <label className="control-label">Password</label>
              <input {...password} type="password" placeholder="Password" className="form-control" />
              {password.touched ? <div className="help-block">{password.error}</div> : ''}
            </fieldset>
            <fieldset className={`form-group ${passwordConfirmation.touched && passwordConfirmation.invalid ? 'has-error' : ''}`}>
              <label className="control-label">Password</label>
              <input {...passwordConfirmation} type="password" placeholder="Password" className="form-control" />
              {passwordConfirmation.touched ? <div className="help-block">{passwordConfirmation.error}</div> : ''}
            </fieldset>

            <button action="submit" className="btn btn-primary">Sign Up</button>
          </form>
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirmation'],
  validate
}, null, Actions)(Signup);
