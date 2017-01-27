import React from 'react'
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';

import PaddedPaper from './PaddedPaper';

export default class Result extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            damage: 0,
            criticalDamage: 0,
            averageDamage: 0,
            dealtDamage: 100
        }

        context.i18n.on('languageChanged', (lng) => {this.forceUpdate()});
    }

    componentWillReceiveProps(props) {
        this.setState({
            damage: props.damage,
            criticalDamage: props.criticalDamage,
            averageDamage: props.averageDamage,
            dealtDamage: props.dealtDamage
        });
    }

    render() {

        const t = this.context.i18n.getFixedT();

        return (
            <PaddedPaper>
                <h2>{t('common:result')}</h2>
                <List>
                    <ListItem
                        primaryText={t('common:damage')}
                        secondaryText={this.state.damage.toFixed(2).toString()}
                    />
                    <ListItem
                        primaryText={t('common:criticalDamage')}
                        secondaryText={this.state.criticalDamage.toFixed(2).toString()}
                    />
                    <ListItem
                        primaryText={t('common:averageDamageWithEvasion')}
                        secondaryText={this.state.averageDamage.toFixed(2).toString()}
                    />
                    <ListItem
                        primaryText={t('common:dealtDamage')}
                        secondaryText={this.state.dealtDamage.toFixed(2).toString() + '%'}
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

Result.contextTypes = {
    i18n: React.PropTypes.object.isRequired
};
