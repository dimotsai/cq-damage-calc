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
import { I18nextProvider } from 'react-i18next';

import DamageCalculator from './DamageCalculator'
import i18n from './i18n';

class App extends React.Component {
	constructor(props, context) {
		super(props, context);
	}

	render() {
		return (
			<I18nextProvider i18n={ i18n }>
				<DamageCalculator />
			</I18nextProvider>
		);
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('app')
);

