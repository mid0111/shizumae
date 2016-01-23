import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

function shops(state = {}, action) {
  return state;
}

import { combineReducers } from 'redux';
const rootReducer = combineReducers({
  shops
});


const createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore);

export default function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState);
}
