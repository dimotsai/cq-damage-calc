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

