import * as ActionType from '../actions/ActionTypes';

const initialState = {
  selected: {},
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

  case ActionType.REQUEST_SHOP_DETAIL:
    return Object.assign({}, state, {
      selected: action.selected
    });

  case ActionType.RECEIVE_SHOP_DETAIL:
    return Object.assign({}, state, {
      selected: action.selected
    });

  case ActionType.INIT_SHOP_DETAIL:
    return Object.assign({}, state, {
      selected: {}
    });

  default:
    return state;
  }
}
