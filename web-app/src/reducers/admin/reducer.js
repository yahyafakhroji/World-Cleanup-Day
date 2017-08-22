import { combineReducers } from 'redux';
import TYPES from './types';

const USERS_STATE = {
  users: [],
  loading: false,
  error: false,
};

const usersReducer = (state = USERS_STATE, action) => {
  switch (action.type) {
    case TYPES.FETCH_USERS_REQUEST:
      return { ...state, loading: true, error: false };
    case TYPES.FETCH_USERS_SUCCESS:
      return { ...state, loading: false, users: action.users, error: false };
    case TYPES.FETCH_USERS_FAILED:
      return { ...state, loading: false, error: true };
    case TYPES.SET_USER_LOCKED: {
      const users = state.users;
      const userIndex = users.findIndex(u => u.id === action.payload.userId);
      const updatedUser = {
        ...users[userIndex],
        locked: action.payload.locked,
      };
      const newUsers = [
        ...users.slice(0, userIndex),
        updatedUser,
        ...users.slice(userIndex + 1),
      ];
      return { ...state, users: newUsers };
    }
    default:
      return state;
  }
};

const USER_STATE = {
  user: undefined,
  loading: false,
  error: false,
};

const userReducer = (state = USER_STATE, action) => {
  switch (action.type) {
    case TYPES.GET_USER:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case TYPES.GET_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        loading: false,
        error: false,
      };
    case TYPES.GET_USER_ERROR:
      return {
        ...state,
        user: undefined,
        loading: false,
        error: true,
      };
    case TYPES.SET_USER_LOCKED: {
      if (!state.user || action.payload.userId !== state.user.id) {
        return state;
      }
      return {
        ...state,
        user: {
          ...state.user,
          locked: action.payload.locked,
        },
      };
    }
    default:
      return state;
  }
};

export default combineReducers({
  users: usersReducer,
  user: userReducer,
});