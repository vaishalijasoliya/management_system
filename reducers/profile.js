import { Types } from '../constants/actionTypes';

const initialState = {
  profile: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.LOGIN:
      return {
        ...state,
        profile: action.payload.user,
        formSubmitted: false // after update user formsubmition reset
      }
    case Types.REGISTER:
      return {
        ...state,
        profile: action.payload.user,
        formSubmitted: false // after update user formsubmition reset
      }
    default:
      return state;
  }
}

export default reducer;