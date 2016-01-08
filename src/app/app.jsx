import React from 'react';
import { render } from 'react-dom'
import "babel-polyfill";
import injectTapEventPlugin from 'react-tap-event-plugin';
import Main from './components/main.jsx';

injectTapEventPlugin();

render(<Main />, document.getElementById('app'));
