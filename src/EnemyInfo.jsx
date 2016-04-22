import React from 'react'
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import MenuItem from 'material-ui/MenuItem';

import PaddedPaper from './PaddedPaper';

export default class EnemyInfo extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			armor: 0,
			resist: 0,
			damageReduced: 0,
			evasion: 0
		}
	}

	componentWillMount() {
		this.props.onChange(null, this.state);
	}

	handleChange(name, event, value) {
		let state = {};
		state[name] = value;
		this.setState(state, () => {this.props.onChange(event, this.state)});
	}

	render() {
		return (
			<PaddedPaper>
				<h2>Enemy</h2>
				<TextField
				  floatingLabelText="Armor"
				  onChange={this.handleChange.bind(this, 'armor')}
				  value={this.state.armor}
				/><br/>
				<TextField
				  floatingLabelText="Resist"
				  onChange={this.handleChange.bind(this, 'resist')}
				  value={this.state.resist}
				/><br/>
				<TextField
				  floatingLabelText="Damage Reduced by"
				  onChange={this.handleChange.bind(this, 'damageReduced')}
				  value={this.state.damageReduced}
				/>%<br/>
				<TextField
				  floatingLabelText="Evasion"
				  onChange={this.handleChange.bind(this, 'evasion')}
				  value={this.state.evasion}
				/><br/>
			</PaddedPaper>
		);
	}
}

EnemyInfo.propTypes = {
	onChange: React.PropTypes.func
};

EnemyInfo.defaultProps = {
	onChange: (event, info) => {}
};

