import React from 'react'
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import Toggle from 'material-ui/Toggle';
import MenuItem from 'material-ui/MenuItem';
import isNumeric from 'isnumeric';
import { translate } from 'react-i18next';
import math from './math';
import _ from 'lodash';

import PaddedPaper from './PaddedPaper';

class HeroInfo extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.state = Object.assign({
			basis: 'atk',
			value: 1000,
			criticalChance: 10,
			criticalDamage: 50,
			accuracy: 0,
			armorPenetration: 0,
			resistancePenetration: 0,
			damageType: 'physical',
			skill: 200,
			isPvP: true
		}, props.initialData);

		this.fieldTypes = {
			basis: 'string',
			value: 'number',
			criticalChance: 'number',
			criticalDamage: 'number',
			accuracy: 'number',
			armorPenetration: 'number',
			resistancePenetration: 'number',
			damageType: 'string',
			skill: 'number',
			isPvP: 'boolean'
		}

        context.i18n.on('languageChanged', (lng) => {this.forceUpdate()});
	}

	componentWillMount() {
		this.props.onChange(null, this.state);
	}

    componentWillReceiveProps(props) {
        if (!_.isEqual(props.initialData, this.props.initialData))
            this.setState(Object.assign(this.state, props.initialData));
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

    handleKeyDown(name, event) {
        switch(event.keyCode) {
            case 13:
                return this.handleEnterKeyDown(name, event);
        }
    }

    handleEnterKeyDown(name, event) {
        let expression = this.state[name];
        let value = expression;
        try {
            value = math.eval(expression);
        } catch (e) {
            console.warn(e);
            return;
        }
        let state = {};
        state[name] = value;

        if (value != expression) {
            this.setState(state, () => {this.props.onChange(event, this.state)});
        }
    }

	render() {
        const t = this.context.i18n.getFixedT();

		return (
			<PaddedPaper>
				<h2>{t('common:hero')}</h2>
				<SelectField
				  value={this.state.basis}
				  onChange={this.handleSelectFieldChange.bind(this, 'basis')}
				  floatingLabelText={t('common:basis')}
				>
					<MenuItem key={1} value={"atk"} primaryText={t('common:attackPower')} />
					<MenuItem key={2} value={"hp"} primaryText={t('common:hp')} />
					<MenuItem key={3} value={"armor"} primaryText={t('common:armor')} />
					<MenuItem key={4} value={"resist"} primaryText={t('common:resistance')} />
				</SelectField><br />
				<TextField
				  floatingLabelText={t('common:value')}
				  onChange={this.handleChange.bind(this, 'value')}
				  value={this.state.value}
                  onKeyDown={this.handleKeyDown.bind(this, 'value')}
				/><br/>
				<SelectField
				  value={this.state.damageType}
				  onChange={this.handleSelectFieldChange.bind(this, 'damageType')}
				  floatingLabelText={t('common:damageType')}
				>
					<MenuItem key={1} value={"physical"} primaryText={t('common:physical')} />
					<MenuItem key={2} value={"magic"} primaryText={t('common:magic')} />
					<MenuItem key={3} value={"neutral"} primaryText={t('common:neutral')} />
				</SelectField><br />
				<TextField
				  floatingLabelText={t('common:criticalChance')}
				  onChange={this.handleChange.bind(this, 'criticalChance')}
				  value={this.state.criticalChance}
                  onKeyDown={this.handleKeyDown.bind(this, 'criticalChance')}
				/>%<br/>
				<TextField
				  floatingLabelText={t('common:criticalDamage')}
				  onChange={this.handleChange.bind(this, 'criticalDamage')}
				  value={this.state.criticalDamage}
                  onKeyDown={this.handleKeyDown.bind(this, 'criticalDamage')}
				/>%<br/>
				<TextField
				  floatingLabelText={t('common:accuracy')}
				  onChange={this.handleChange.bind(this, 'accuracy')}
				  value={this.state.accuracy}
                  onKeyDown={this.handleKeyDown.bind(this, 'accuracy')}
				/><br/>
				<TextField
				  floatingLabelText={t('common:armorPenetration')}
				  onChange={this.handleChange.bind(this, 'armorPenetration')}
				  value={this.state.armorPenetration}
                  onKeyDown={this.handleKeyDown.bind(this, 'armorPenetration')}
				/><br/>
				<TextField
				  floatingLabelText={t('common:resistancePenetration')}
				  onChange={this.handleChange.bind(this, 'resistancePenetration')}
				  value={this.state.resistancePenetration}
                  onKeyDown={this.handleKeyDown.bind(this, 'resistancePenetration')}
				/><br/>
				<TextField
				  floatingLabelText={t('common:skillPower')}
				  onChange={this.handleChange.bind(this, 'skill')}
				  value={this.state.skill}
                  onKeyDown={this.handleKeyDown.bind(this, 'skill')}
				/>%<br/>
				<Toggle
					  label={t('common:isPvP')}
					  defaultToggled={this.state.isPvP}
					  onToggle={this.handleChange.bind(this, 'isPvP')}
					  style={{marginTop: 16, marginBottom: 16, maxWidth: 250}}
				/>
			</PaddedPaper>
		);
	}
}

HeroInfo.propTypes = {
	onChange: React.PropTypes.func,
    initialData: React.PropTypes.object
};

HeroInfo.defaultProps = {
	onChange: () => {},
	initialData: {}
};

HeroInfo.contextTypes = {
	i18n: React.PropTypes.object.isRequired
};

export default HeroInfo;
