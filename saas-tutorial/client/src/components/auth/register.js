import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { registerUser } from '../../actions';

const form = reduxForm({
  form: 'register',
  validate
});

const renderField = field => (
  <div>
      <input className="form-control" {...field.input}/>
      {field.touched && field.error && <div className="error">{field.error}</div>}
  </div>
);

function validate(formProps) {
    const errors = {};

    if (!formProps.firstName) {
        errors.firstName = 'Please enter a first name';
    }

    if(!formProps.lastName) {
        errors.lastName = 'Please enter a last name';
    }

    if (!formProps.email) {
        errors.email = 'Please enter an email';
    }

    if (!formProps.password) {
        errors.password = 'Please enter a password';
    }

    return errors;
}

class Register extends Component {
    handleFormSubmit(formProps) {
        this.props.registerUser(formProps);
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
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                {this.renderAlert()}
                <div className="row">
                    <div className="col-md-6">
                        <label>First Name</label>
                        <Field name="firstName" className="form-control" component={renderField} type="text" />
                    </div>
                    <div className="col-md-6">
                        <label>Last Name</label>
                        <Field name="lastName" className="form-control" component={renderField} type="text" />
                    </div>
                </div>
                <div className="row">
                    <div fclassName="col-md-12">
                        <label>Email</label>
                        <Field name="email" className="form-control" component={renderField} type="text" />
                    </div>
                </div>
                <div className="row">
                    <div fclassName="col-md-12">
                        <label>Password</label>
                        <Field name="password" className="form-control" component={renderField} type="text" />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        );
    }
}

function mapStateToProps(state) {
    return {
        errorMessage: state.auth.error,
        message: state.auth.message
    };
}

export default connect(mapStateToProps, { registerUser })(form(Register));

/*
RPT NOTES:

Note: Make sure you have Redux-Form version 6.0.0-rc.3 or higher, otherwise this
won't work. There were large changes after React upgraded to version 15.2.0.

A lot of this should make sense. We are explicitly importing our registerUser()
action creator from our actions file, and we are importing Field and reduxForm
from Redux-Form, which is a great tool for building complex forms in your app.
We are creating and binding some simple client-side validation into our
registration form. We created a function, handleFormSubmit(), which calls our
registerUser() action creator with the form inputs (formProps) as an argument,
and we tell our form to call that function when the form is submitted.
*/
