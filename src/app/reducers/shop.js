import * as ActionType from '../actions/shops';

const initialState = {
  items: []
};

export default function shop(state = initialState, action) {
  switch(action.type) {

  case ActionType.REQUEST_SHOPS:
    return state;

  case ActionType.RECEIVE_SHOPS:
    return Object.assign({}, state, {
      items: action.shops
    });

  default:
    return state;
  }
}
