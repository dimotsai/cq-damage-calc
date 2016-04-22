import React from 'react'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import {Grid, Row, Col} from 'react-flexbox-grid';

import PageContents from './PageContents';
import PaddedPaper from './PaddedPaper';
import HeroInfo from './HeroInfo';
import EnemyInfo from './EnemyInfo';
import Result from './Result';

export default class DamageCalculator extends React.Component {
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
		this.setState(state);
	}

	render() {
		return (
			<MuiThemeProvider muiTheme={getMuiTheme()}>
				<div>
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

