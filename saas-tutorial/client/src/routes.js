import React from 'react';
import { Route, IndexRoute } from 'react-router';

// Import miscellaneous routes and other requirements
import App from './components/app';
import NotFoundPage from './components/pages/not-found-page';

// Import static pages
import HomePage from './components/pages/home-page';
import ContactPage from './components/pages/contact-page';
import ComponentSamplesPage from './components/pages/component-samples';

// Import authentication related pages
import Register from './components/auth/register';
import Login from './components/auth/login';
import Logout from './components/auth/logout';
import ForgotPassword from './components/auth/forgot_password';
import ResetPassword from './components/auth/reset_password';

// Import dashboard pages
import Dashboard from './components/dashboard/dashboard';
import ViewProfile from './components/dashboard/profile/view-profile';
import Inbox from './components/dashboard/messaging/inbox';
import ConversationMessage from './components/dashboard/messaging/compose-message';
//import BillingSettings from './components/billing/settings';

// Import billing pages
//import InitialCheckout from './components/billing/initial-checkout';

// Import admin pages
import AdminDashboard from './components/admin/dashboard';

// Import higher order components
import RequireAuth from './components/auth/require-auth';

export default(
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="contact-us" component={ContactPage} />
    <Route path="component-samples" component={ComponentSamplesPage} />
    <Route path="register" component={Register} />
    <Route path="login" component={Login} />
    <Route path="logout" component={Logout} />
    <Route path="forgot-password" component={ForgotPassword} />
    <Route path="reset-password/:resetToken" component={ResetPassword} />

    //<Route path="checkout/:plan" component={RequireAuth(ForgotPassword)} />
    //<Route path="billing/settings" component={RequireAuth(BillingSettings)} />

    <Route path="profile" component={RequireAuth(ViewProfile)} />

    <Route path="admin" component={RequireAuth(AdminDashboard)} />

    <Route path="dashboard">
        <IndexRoute component={RequireAuth(Dashboard)} />
        <Route path="inbox" component={RequireAuth(Inbox)} />
        <Route path="conversation/new" component={RequireAuth(Inbox)} />
        <Route path="conversation/view/:conversationId" component={RequireAuth(Conversation)} />
    </Route>

    <Route path="*" component={NotFoundPage} />
  </Route>
);

/*
RPT NOTES:

Here, we are bringing in React Router, which will handle navigation between our
different components. Specifically, we're importing Route and IndexRoute, which
allow us to actually define our routes. Then we import the components we will be
building, and finally, we export our route definitions. We are starting out by
setting the root route ("/") to the App component. This component will allow us
to create sort of a layout that the other components will fit in. We will, for
example, add a header and footer to this file. They will appear when visiting
any of the nested routes. The IndexRoute is the main component that will display
when visiting the root route, but it will also be wrapped in the App component's
header and footer that we will be building. Next, we defined all of our other
routes and set up a catch all, which we will create a little 404 page for to let
users know they have reached a page that does not exist.
*/
