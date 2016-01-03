import React from 'react';
import { render } from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Router, Route, IndexRoute, Link } from 'react-router';

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

// router settings
import routes from './routes.js';
import history from './history.js';
render(<Router history={history} routes={routes} />, document.getElementById('app'));
