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
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import Toggle from 'material-ui/Toggle';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import ClearFix from 'material-ui/internal/ClearFix';
import spacing from 'material-ui/styles/spacing';
import {Grid, Row, Col} from 'react-flexbox-grid';
import isNumeric from 'isnumeric';
import _ from 'lodash';

const styles = {
	container: {
	},
}

class PageContents extends React.Component {
	constructor(props, context) {
		super(props, context);
	}

	render() {
		return (
			<div style={{ paddingTop: spacing.desktopKeylineIncrement }}>{this.props.children}</div>
		);
	}
}

class PaddedPaper extends React.Component {
	constructor(props, context) {
		super(props, context);
	}

	render() {
		return (
			<Paper style={{padding: 20, marginBottom: 10}}>
				<ClearFix />
				{this.props.children}
			</Paper>
		);
	}
}

class HeroInfo extends React.Component {
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
	onChange: (event, info) => {}
};

class EnemyInfo extends React.Component {
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

class Result extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			damage: 0,
			criticalDamage: 0,
			averageDamage: 0
		}
	}

	componentWillReceiveProps(props) {
		this.setState({
			damage: props.damage,
			criticalDamage: props.criticalDamage,
			averageDamage: props.averageDamage
		});
	}

	render() {
		return (
			<PaddedPaper>
				<h2>Result</h2>
				<List>
					<ListItem
						primaryText="Damage"
						secondaryText={this.state.damage.toString()}
					/>
					<ListItem
						primaryText="Critical Damage"
						secondaryText={this.state.criticalDamage.toString()}
					/>
					<ListItem
						primaryText="Average Damage (evasion included)"
						secondaryText={this.state.averageDamage.toString()}
					/>
				</List>
			</PaddedPaper>
		);
	}
}

Result.propTypes = {
	damage: React.PropTypes.number,
	criticalDamage: React.PropTypes.number,
	averageDamage: React.PropTypes.number
};

Result.defaultProps = {
	damage: 0,
	criticalDamage: 0,
	averageDamage: 0
}

class DamageCalculator extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			heroInfo: null,
			enemyInfo: null,
			result: {
				damage: 0,
				criticalDamage: 0,
				averageDamage: 0
			}
		}

		this.attributeScaleInPvP = {
			atk: 1.0,
			hp: 1.0,
			armor: 1.75,
			resist: 1.75
		}
	}

	calcResult(heroInfo, enemyInfo) {
		if (heroInfo === null || enemyInfo === null) {
			return Result.defaultProps;
		}

		let result = {};
		let damageScale = 0.0;
		let isPvP = heroInfo.isPvP;

		if (heroInfo.damageType == 'physical') {
			damageScale =
				1.0/(Math.max(enemyInfo.armor * (isPvP ? this.attributeScaleInPvP.armor : 1.0) - heroInfo.armorPenetration, 0) * 0.0034 + 1.0);
		} else if (heroInfo.damageType == 'magic') {
			damageScale =
				1.0/(Math.max(enemyInfo.resist * (isPvP ? this.attributeScaleInPvP.resist : 1.0) - heroInfo.resistPenetration, 0) * 0.0034 + 1.0);
		} else if (heroInfo.damageType == 'neutral') {
			damageScale = 1.0;
		}

		damageScale *= (1.0 - enemyInfo.damageReduced / 100.0);

		result.damage =
			(isPvP ? (this.attributeScaleInPvP[heroInfo.basis] * heroInfo.value) : heroInfo.value)
			* heroInfo.skill / 100.0
			* damageScale
			* (isPvP ? 0.6 : 1.0);

		result.criticalDamage = result.damage * (1.0 + heroInfo.criticalDamage / 100.0);

		result.averageDamage =
			(heroInfo.criticalChance / 100.0 * result.criticalDamage)
			+ (1.0 - heroInfo.criticalChance / 100.0) * result.damage;

		if (heroInfo.damageType != 'neutral') {
			let missRate = Math.max(enemyInfo.evasion - heroInfo.accuracy, 0) / 100.0;
			let hitRate = 1.0 - missRate;
			result.averageDamage *= hitRate;
		}

		return result;
	}

	handleChange(who, event, info) {
		let state = this.state;
		state[who] = info;
		state['result'] = this.calcResult(state.heroInfo, state.enemyInfo);
		console.log(state);
		this.setState(state);
	}

	render() {
		return (
			<MuiThemeProvider muiTheme={getMuiTheme()}>
				<div style={styles.container}>
					<AppBar
						title="CQ Damage Calculator"
						iconClassNameRight="muidocs-icon-navigation-expand-more"
						style={{ position: "fixed", top: 0, left: 0 }}
					/>
					<PageContents>
						<Grid>
							<Row>
								<Col xs={12} sm={6} md={6} lg={6}>
									<HeroInfo onChange={this.handleChange.bind(this, 'heroInfo')} />
								</Col>
								<Col xs={12} sm={6} md={6} lg={6}>
									<EnemyInfo onChange={this.handleChange.bind(this, 'enemyInfo')}/>
									<Result
										damage={this.state.result.damage}
										criticalDamage={this.state.result.criticalDamage}
										averageDamage={this.state.result.averageDamage}
									/>
								</Col>
							</Row>
							<Row>
								<Col xs={12} sm={12} md={12} lg={12}>
									<p style={{textAlign: 'right'}}>Created by Dimo Tsai (綿綿糖)</p>
								</Col>
							</Row>
						</Grid>
					</PageContents>
				</div>
			</MuiThemeProvider>
		);
	}
}

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


