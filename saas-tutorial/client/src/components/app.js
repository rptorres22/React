import React, { Component } from 'react';
import HeaderTemplate from './template/header';
import FooterTemplate from './template/footer';

class App extends Component {
    render() {
        return (
          <div>
              <HeaderTemplate logo="Your Site" />
              <div className="container">
                  {this.props.children}
              </div>
              <FooterTemplate />
          </div>
      );
    }
}

export default App;

/*
RPT NOTES:
Firstly, we imported React itself, and Component from React. Next, we put the
App component together by extending the Component class. Finally, we wrap
{this.props.children} in a container div. This is where our components from the
routes will be placed. On the root route, this is where our HomePage component
will load, for example. The "Header/Footer here" text will appear on every route
nested within the App route definition.
*/
