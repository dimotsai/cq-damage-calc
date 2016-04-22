import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

// Basic React component that renders a Material-UI
// raised button with the text "Default"
import React from 'react'
import ReactDOM from 'react-dom';

import DamageCalculator from './DamageCalculator'

class App extends React.Component {
	constructor(props, context) {
		super(props, context);
	}

	render() {
		return (
			<DamageCalculator />
		);
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('app')
);

