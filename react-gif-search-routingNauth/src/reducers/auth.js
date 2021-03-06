import { SIGN_IN_USER, SIGN_OUT_USER } from '../actions';

const initialState = {
  authenticated: false
};

export default function gifs(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN_USER:
      return {
        ...state, authenticated: true
      };
    case SIGN_OUT_USER:
      return {
        ...state, authenticated: false
      };
    default:
      return state;
  }
}

/*
Notes:

There aren't any new concepts going on here: we're setting our initialState for
the user to be signed out, but if the SIGN_IN_USER is fired, a new copy of the
state is created with authenticated set to true (remember how our reducer should
act as "Save-As" functionality instead of mutating the state directly!)
If SIGN_OUT_USER is fired, a new copy is created and authenticated is set to 
false. Simple enough.                                                                                                                                                                                                                                                                                                                                                                                                                            
*/
