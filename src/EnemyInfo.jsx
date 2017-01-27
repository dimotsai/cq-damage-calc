import React from 'react'
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import MenuItem from 'material-ui/MenuItem';
import math from './math';
import _ from 'lodash';

import PaddedPaper from './PaddedPaper';

export default class EnemyInfo extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = Object.assign({
            armor: 0,
            resistance: 0,
            damageReduced: 0,
            evasion: 0
        }, props.initialData);

        context.i18n.on('languageChanged', (lng) => {this.forceUpdate()});
    }

    componentWillMount() {
        this.props.onChange(null, this.state);
    }

    componentWillReceiveProps(props) {
        if (!_.isEqual(props.initialData, this.props.initialData))
            this.setState(Object.assign(this.state, props.initialData));
    }

    handleChange(name, event, value) {
        let state = {};
        state[name] = value;
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
                <h2>{t('common:enemy')}</h2>
                <TextField
                  floatingLabelText={t('common:armor')}
                  onChange={this.handleChange.bind(this, 'armor')}
                  value={this.state.armor}
                  onKeyDown={this.handleKeyDown.bind(this, 'armor')}
                /><br/>
                <TextField
                  floatingLabelText={t('common:resistance')}
                  onChange={this.handleChange.bind(this, 'resistance')}
                  value={this.state.resistance}
                  onKeyDown={this.handleKeyDown.bind(this, 'resistance')}
                /><br/>
                <TextField
                  floatingLabelText={t('common:damageReducedBy')}
                  onChange={this.handleChange.bind(this, 'damageReduced')}
                  value={this.state.damageReduced}
                  onKeyDown={this.handleKeyDown.bind(this, 'damageReduced')}
                />%<br/>
                <TextField
                  floatingLabelText={t('common:evasion')}
                  onChange={this.handleChange.bind(this, 'evasion')}
                  value={this.state.evasion}
                  onKeyDown={this.handleKeyDown.bind(this, 'evasion')}
                /><br/>
            </PaddedPaper>
        );
    }
}

EnemyInfo.propTypes = {
    onChange: React.PropTypes.func,
    initialData: React.PropTypes.object
};

EnemyInfo.defaultProps = {
    onChange: (event, info) => {},
    initialData: {}
};

EnemyInfo.contextTypes = {
    i18n: React.PropTypes.object.isRequired
};
