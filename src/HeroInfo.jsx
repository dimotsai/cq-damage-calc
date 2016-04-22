import React from 'react'
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import Toggle from 'material-ui/Toggle';
import MenuItem from 'material-ui/MenuItem';
import isNumeric from 'isnumeric';

import PaddedPaper from './PaddedPaper';

export default class HeroInfo extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			basis: 'atk',
			value: 1000,
			criticalChance: 10,
			criticalDamage: 50,
			accuracy: 0,
			armorPenetration: 0,
			resistPenetration: 0,
			damageType: 'physical',
			skill: 200,
			isPvP: true
		};

		this.fieldTypes = {
			basis: 'string',
			value: 'number',
			criticalChance: 'number',
			criticalDamage: 'number',
			accuracy: 'number',
			armorPenetration: 'number',
			resistPenetration: 'number',
			damageType: 'string',
			skill: 'number',
			isPvP: 'boolean'
		}
	}

	componentWillMount() {
		this.props.onChange(null, this.state);
	}

	//validateType(name, value) {
		//if (this.fieldTypes[name] === 'number') {
			//return isNumeric(value);
		//}

		//return this.fieldTypes[name] === typeof (value);
	//}
	//

	validateType(name, value) {
		return true;
	}

	handleSelectFieldChange(name, event, index, value) {
		let state = {};
		if (this.validateType(name, value)) {
			state[name] = value;
		}
		this.setState(state, () => {this.props.onChange(event, this.state)});
	}

	handleChange(name, event, value) {
		let state = {};
		if (this.validateType(name, value)) {
			state[name] = value;
		}
		this.setState(state, () => {this.props.onChange(event, this.state)});
	}

	render() {
		return (
			<PaddedPaper>
				<h2>Hero</h2>
				<SelectField
				  value={this.state.basis}
				  onChange={this.handleSelectFieldChange.bind(this, 'basis')}
				  floatingLabelText="Basis"
				>
					<MenuItem key={1} value={"atk"} primaryText="Attack Power" />
					<MenuItem key={2} value={"hp"} primaryText="HP" />
					<MenuItem key={3} value={"armor"} primaryText="Armor" />
					<MenuItem key={4} value={"resist"} primaryText="Resist" />
				</SelectField><br />
				<TextField
				  floatingLabelText="Value"
				  onChange={this.handleChange.bind(this, 'value')}
				  value={this.state.value}
				/><br/>
				<SelectField
				  value={this.state.damageType}
				  onChange={this.handleSelectFieldChange.bind(this, 'damageType')}
				  floatingLabelText="Damage Type"
				>
					<MenuItem key={1} value={"physical"} primaryText="Physical" />
					<MenuItem key={2} value={"magic"} primaryText="Magic" />
					<MenuItem key={3} value={"neutral"} primaryText="Neutral" />
				</SelectField><br />
				<TextField
				  floatingLabelText="Critical Chance"
				  onChange={this.handleChange.bind(this, 'criticalChance')}
				  value={this.state.criticalChance}
				/>%<br/>
				<TextField
				  floatingLabelText="Critical Damage"
				  onChange={this.handleChange.bind(this, 'criticalDamage')}
				  value={this.state.criticalDamage}
				/>%<br/>
				<TextField
				  floatingLabelText="Accuracy"
				  onChange={this.handleChange.bind(this, 'accuracy')}
				  value={this.state.accuracy}
				/><br/>
				<TextField
				  floatingLabelText="Armor Penetration"
				  onChange={this.handleChange.bind(this, 'armorPenetration')}
				  value={this.state.armorPenetration}
				/><br/>
				<TextField
				  floatingLabelText="Resist Penetration"
				  onChange={this.handleChange.bind(this, 'resistPenetration')}
				  value={this.state.resistPenetration}
				/><br/>
				<TextField
				  floatingLabelText="Skill"
				  onChange={this.handleChange.bind(this, 'skill')}
				  value={this.state.skill}
				/>%<br/>
				<Toggle
					  label="Is PvP?"
					  defaultToggled={this.state.isPvP}
					  onToggle={this.handleChange.bind(this, 'isPvP')}
					  style={{marginTop: 16, marginBottom: 16, maxWidth: 250}}
				/>
			</PaddedPaper>
		);
	}
}

HeroInfo.propTypes = {
	onChange: React.PropTypes.func
};

HeroInfo.defaultProps = {
	onChange: () => {}
};

