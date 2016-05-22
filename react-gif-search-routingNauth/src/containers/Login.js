import React from 'react';
import { reduxForm } from 'redux-form';

class Login extends React.Component {

  /*
    Within redux-form's handleSubmit method, we're also calling our own
    handleFormSubmit method that we define here
  */
  handleFormSubmit = (values) => {
    console.log(values);
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
            <fieldset className="form-group">
              <label>Email</label>
              <input {...email} type="text" placeholder="Email" className="form-control" />
            </fieldset>

            <fieldset className="form-group">
              <label>Password</label>
              <input {...password} type="password" placeholder="Password" className="form-control" />
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
  fields: ['email', 'password']
})(Login);

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

*/
