import React from 'react';
import { reduxForm } from 'redux-form';
import * as Actions from '../actions';

const validate = values => {
  const errors = {};

  if(!values.email) {
    errors.email = "Please enter an email.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  if(!values.password) {
    errors.password = "Please enter a password.";
  }

  return errors;
};


class Login extends React.Component {

  /*
    Within redux-form's handleSubmit method, we're also calling our own
    handleFormSubmit method that we define here
  */
  handleFormSubmit = (values) => {
    //console.log(values);
    this.props.signInUser(values);
  };

  render() {

    /*
      Here, we're pulling redux-form's property this.props.handleSubmit, along
      with the two fields we just defined in our configuration object
      this.props.fields.email and this.props.fields.password, in order to
      automatically assign them to their own variables.
    */
    const { handleSubmit, fields: { email, password }} = this.props;

    return (
      <div className="container">
        <div className="col-md-6 col-md-offset-3">
          <h2 className="text-center">Log In</h2>
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

            <button action="submit" className="btn btn-primary">Sign In</button>
          </form>
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: 'login',
  fields: ['email', 'password'],
  validate
}, null, Actions)(Login);

/*
Notes:

reduxForm:

Normally, React components become containers when connecting to the Redux store
via the connect()() decorator. redux-form, though, uses a reduxForm wrapper that
replaces connect()() and adds config options as the first argument.

So instead of this:

  connect(mapStateToProps, mapDispatchToProps)(Component);
We have this:

  reduxForm({config}, mapStateToProps, mapDispatchToProps)(Component);
However, we're not currently doing anything with mapStateToProps or
mapDispatchToProps, so both of these arguments are currently null. (At least
until next section, when we'll create some actions to handle authentication.)

The config object itself is pretty simple and has two required fields. The first
argument is simply a unique name for the form; this will be set as a key on the
store object returned from the FormReducer. The second object is an array of
fields included in the form itself; these will be made available to our form
component via this.props.fields.

It's possible to pass in additional arguments to handle validation, failure,
sub-forms, etc., but we don't need to worry about that right now.




{...email} explained:

When you create a field object via redu-form, it automatiacally creates a bunch
of different handlers (onBlur, onFocus, etc.) along with code to check whether
the input has been touched ("dirty") or untouched ("pristine").  By adding this
object to our input with {...email}, we are "destructuring" the object and
making the keys and values available directly on the input.

This means that instead of passing this object in like this:

<input fieldProps={email} type="text" placeholder="Email" className="form-control" />
which would make these keys available through this.props.fieldProps, we are
instead adding them directly to the object. In essence, we are doing this with
every property on our email object:

<input active={email.active} dirty={email.dirty} onBlur={email.onBlur} type="text" placeholder="Email" className="form-control" />
This way, redux-form knows exactly how to access these properties.



Notes: auth
Like in our other containers, we're importing all of our exported modules from
the actions/index.js file as a single object.

However, you may be wondering why we're not using mapDispatchToProps and
bindActionCreators to add our actions to props. Won't we need our action
creators on our Login and Signup containers in order to sign users in and out?

bindActionCreators actually only needs to be used when you're passing action
creators down as props from a container to a component that's not aware of
Redux. Since Login and Signup don't have any child components, we can just pass
our action creators into reduxForm()() directly!                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              

*/
