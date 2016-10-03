import { AUTH_USER,
         AUTH_ERROR,
         UNAUTH_USER,
         PROTECTED_TEST } from './types';

const INITIAL_STATE = { error: '', message: '', content: '', authenticated: false }

export default function (state = INITIAL_STATE, action) {
  switch(action.type) {
    case AUTH_USER:
      return { ...state, error: '', message: '', authenticated: true };
    case UNAUTH_USER:
      return { ...state, authenticated: false };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    case PROTECTED_TEST:
      return { ...state, content: action.payload };
  }

  return state;
}

/*
RPT NOTES:

As you can see, when our actions are dispatched to our store, they are using the
"type" to determine which pieces of state will be updated and how they will be
updated. For example, when our protectedTest() action creator dispatches the
type PROTECTED_TEST, our reducer knows to change content to the payload we set
(in this case, response.data.content from our HTTP request).
*/
