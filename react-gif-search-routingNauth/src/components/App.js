import React from 'react';
import Header from '../containers/Header';


/*
This new main App component, along with the Header component,
will be rendered in every view. It serves as a master template of
sorts, and if we wanted to add a footer or any other component
that will render on every page, we would add it here as well.                                                                                                                                                                                                                                                              
*/
export default class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    );
  }
}
