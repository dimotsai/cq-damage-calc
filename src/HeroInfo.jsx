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
            basis: HeroInfo.bases.attackPower,
            value: 1000,
            criticalChance: 10,
            criticalDamage: 50,
            accuracy: 0,
            armorPenetration: 0,
            resistancePenetration: 0,
            damageType: HeroInfo.damageTypes.physical,
            skill: 200,
            gameMode: HeroInfo.gameModes.normal
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
            gameMode: 'string'
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

    renderEvaluatedField(name) {
        let value;
        try {
            value = math.eval(this.state[name]);
        } catch(e) {
            value = NaN;
        }
        return <span>{value}</span>;
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
        const style = {textAlign: 'left', width: '3em', display: 'inline-block'};
        const noPercent = <span style={style}></span>;
        const percent = <span style={style}>%</span>;
        const equal = <span>=</span>;

        return (
            <PaddedPaper>
                <h2>{t('common:hero')}</h2>
                <SelectField
                  value={this.state.basis}
                  onChange={this.handleSelectFieldChange.bind(this, 'basis')}
                  floatingLabelText={t('common:basis')}
                >
                    <MenuItem key={1} value={HeroInfo.bases.attackPower} primaryText={t('common:attackPower')} />
                    <MenuItem key={2} value={HeroInfo.bases.healthPoint} primaryText={t('common:healthPoint')} />
                    <MenuItem key={3} value={HeroInfo.bases.armor} primaryText={t('common:armor')} />
                    <MenuItem key={4} value={HeroInfo.bases.resistance} primaryText={t('common:resistance')} />
                </SelectField><br />
                <TextField
                  floatingLabelText={t('common:value')}
                  onChange={this.handleChange.bind(this, 'value')}
                  value={this.state.value}
                  onKeyDown={this.handleKeyDown.bind(this, 'value')}
                />{noPercent}{equal}{this.renderEvaluatedField('value')}<br/>
                <SelectField
                  value={this.state.damageType}
                  onChange={this.handleSelectFieldChange.bind(this, 'damageType')}
                  floatingLabelText={t('common:damageType')}
                >
                    <MenuItem key={1} value={HeroInfo.damageTypes.physical} primaryText={t('common:physical')} />
                    <MenuItem key={2} value={HeroInfo.damageTypes.magic} primaryText={t('common:magic')} />
                    <MenuItem key={3} value={HeroInfo.damageTypes.neutral} primaryText={t('common:neutral')} />
                </SelectField><br />
                <TextField
                  floatingLabelText={t('common:criticalChance')}
                  onChange={this.handleChange.bind(this, 'criticalChance')}
                  value={this.state.criticalChance}
                  onKeyDown={this.handleKeyDown.bind(this, 'criticalChance')}
                />{percent}{equal}{this.renderEvaluatedField('criticalChance')}%<br/>
                <TextField
                  floatingLabelText={t('common:criticalDamage')}
                  onChange={this.handleChange.bind(this, 'criticalDamage')}
                  value={this.state.criticalDamage}
                  onKeyDown={this.handleKeyDown.bind(this, 'criticalDamage')}
                />{percent}{equal}{this.renderEvaluatedField('criticalDamage')}%<br/>
                <TextField
                  floatingLabelText={t('common:accuracy')}
                  onChange={this.handleChange.bind(this, 'accuracy')}
                  value={this.state.accuracy}
                  onKeyDown={this.handleKeyDown.bind(this, 'accuracy')}
                />{percent}{equal}{this.renderEvaluatedField('accuracy')}%<br/>
                <TextField
                  floatingLabelText={t('common:armorPenetration')}
                  onChange={this.handleChange.bind(this, 'armorPenetration')}
                  value={this.state.armorPenetration}
                  onKeyDown={this.handleKeyDown.bind(this, 'armorPenetration')}
                />{noPercent}{equal}{this.renderEvaluatedField('armorPenetration')}<br/>
                <TextField
                  floatingLabelText={t('common:resistancePenetration')}
                  onChange={this.handleChange.bind(this, 'resistancePenetration')}
                  value={this.state.resistancePenetration}
                  onKeyDown={this.handleKeyDown.bind(this, 'resistancePenetration')}
                />{noPercent}{equal}{this.renderEvaluatedField('resistancePenetration')}<br/>
                <TextField
                  floatingLabelText={t('common:skillPower')}
                  onChange={this.handleChange.bind(this, 'skill')}
                  value={this.state.skill}
                  onKeyDown={this.handleKeyDown.bind(this, 'skill')}
                />{percent}{equal}{this.renderEvaluatedField('skill')}%<br/>
                <SelectField
                  value={this.state.gameMode}
                  onChange={this.handleSelectFieldChange.bind(this, 'gameMode')}
                  floatingLabelText={t('common:gameMode')}
                >
                    <MenuItem key={1} value={HeroInfo.gameModes.normal} primaryText={t('common:normal')} />
                    <MenuItem key={2} value={HeroInfo.gameModes.PvC} primaryText={t('common:pvc')} />
                    <MenuItem key={3} value={HeroInfo.gameModes.PvP} primaryText={t('common:pvp')} />
                </SelectField><br />
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

HeroInfo.gameModes = {
    PvP: 'pvp',
    PvC: 'pvc',
    normal: 'normal'
};

HeroInfo.damageTypes = {
    physical: 'physical',
    magic: 'magic',
    neutral: 'neutral'
}

HeroInfo.bases = {
    attackPower: 'atk',
    healthPoint: 'hp',
    armor: 'armor',
    resistance: 'resistance'
};

export default HeroInfo;
