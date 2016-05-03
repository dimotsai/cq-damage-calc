import React from 'react'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import Popover from 'material-ui/Popover';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import {Grid, Row, Col} from 'react-flexbox-grid';
import { translate } from 'react-i18next';
import queryString from 'query-string';
import base64 from 'base64it';
import URL from 'url';

import PageContents from './PageContents';
import PaddedPaper from './PaddedPaper';
import HeroInfo from './HeroInfo';
import EnemyInfo from './EnemyInfo';
import Result from './Result';

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
			},
            helpDialogOpen: false,
            sharePopoverOpen: false,
            initialData: {
                heroInfo: null,
                enemyInfo: null
            }
		}

		this.attributeScaleInPvP = {
			atk: 1.0,
			hp: 1.0,
			armor: 1.75,
			resistance: 1.75
		}

        window.addEventListener('hashchange', this.handleHashChange.bind(this), false);
	}

    componentWillMount() {
        this.handleHashChange();
    }

    handleHashChange() {
        let urlParams = queryString.parse(window.location.hash);

        if (urlParams && urlParams.d) {
            try {
                let decodedData = JSON.parse(base64.urlSafeDecode(urlParams.d));
                this.setState({initialData: decodedData});
            } catch (e) {
                console.error('Parameter "d" is invalid');
            }
        }

        console.log('hashchange');
    }

    getCurrentURL() {
        let data = {
            heroInfo: this.state.heroInfo,
            enemyInfo: this.state.enemyInfo
        }

        let url = window.location.href;

        try {
            let encodedData = base64.urlSafeEncode(JSON.stringify(data));
            let urlParams = {d: encodedData};
            url = URL.resolve(url, '#' + queryString.stringify(urlParams));
        } catch (e) {
            console.error('Cannot encode parameter "d"');
        }

        return url;
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
				1.0/(Math.max(enemyInfo.resistance * (isPvP ? this.attributeScaleInPvP.resistance : 1.0) - heroInfo.resistancePenetration, 0) * 0.0034 + 1.0);
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

    handleChangeLanguage(lang, e) {
        this.context.i18n.changeLanguage(lang);
    };

    openHelpDialog() {
        this.setState({
            helpDialogOpen: true
        });
    }

    closeHelpDialog() {
        this.setState({
            helpDialogOpen: false
        });
    }

	openSharePopover(event) {
        this.setState({
            sharePopoverOpen: true,
            shareAnchorEl: event.currentTarget
        });
	}

    closeSharePopover() {
        this.setState({
            sharePopoverOpen: false
        });
    }

	render() {

        const t = this.context.i18n.getFixedT();

		const helpDialogActions = [
		  <FlatButton
			label="Ok"
			primary={true}
			keyboardFocused={true}
			onTouchTap={this.closeHelpDialog.bind(this)}
		  />
		];
		return (
			<MuiThemeProvider muiTheme={getMuiTheme()}>
				<div>
					<AppBar
						title="CQ Damage Calculator"
						style={{ position: "fixed", top: 0, left: 0 }}
						iconElementRight={
							<IconMenu
								iconButtonElement={
									<IconButton><MoreVertIcon /></IconButton>
								}
								targetOrigin={{horizontal: 'right', vertical: 'top'}}
								anchorOrigin={{horizontal: 'right', vertical: 'top'}}
							>
								<MenuItem
                                    primaryText="Help" onTouchTap={this.openHelpDialog.bind(this)}
                                />
								<MenuItem
                                    primaryText="GitHub" onTouchTap={() => {window.open('https://github.com/dimotsai/cq-damage-calc/')}}
                                />
                                <Divider />
								<MenuItem
                                    primaryText="English" onTouchTap={this.handleChangeLanguage.bind(this, 'en')}
                                />
								<MenuItem
                                    primaryText="繁體中文" onTouchTap={this.handleChangeLanguage.bind(this, 'zh-TW')}
                                />
							</IconMenu>
						}
					/>
					<PageContents>
						<Grid>
							<Row>
								<Col xs={12} sm={6} md={6} lg={6}>
									<HeroInfo onChange={this.handleChange.bind(this, 'heroInfo')} initialData={this.state.initialData.heroInfo} />
								</Col>
								<Col xs={12} sm={6} md={6} lg={6}>
									<EnemyInfo onChange={this.handleChange.bind(this, 'enemyInfo')} initialData={this.state.initialData.enemyInfo} />
									<Result
										damage={this.state.result.damage}
										criticalDamage={this.state.result.criticalDamage}
										averageDamage={this.state.result.averageDamage}
									/>
                                    <RaisedButton
                                        style={{float: 'right'}} primary={true} label="Share" onTouchTap={this.openSharePopover.bind(this)}
                                    />
									<Popover
									  open={this.state.sharePopoverOpen}
									  anchorEl={this.state.shareAnchorEl}
									  anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
									  targetOrigin={{horizontal: 'left', vertical: 'top'}}
									  onRequestClose={this.closeSharePopover.bind(this)}
									>
									  <div style={{padding: '10px 20px'}}>
										<TextField id="currentURL" defaultValue={this.getCurrentURL()} onFocus={(event) => {event.currentTarget.select()}} />
									  </div>
									</Popover>
								</Col>
							</Row>
							<Row>
								<Col xs={12} sm={12} md={12} lg={12}>
									<p style={{textAlign: 'right'}}>Created by Dimo Tsai (綿綿糖)</p>
								</Col>
							</Row>
						</Grid>
					</PageContents>
					<Dialog
					  title="Help"
					  actions={helpDialogActions}
					  modal={false}
					  open={this.state.helpDialogOpen}
					  onRequestClose={this.closeHelpDialog.bind(this)}
					>
						<p>{t('common:helpMessage')}</p>
                        <ul>
                            <li>29 + 2 &#9166;</li>
                            <li>29 - 2 &#9166;</li>
                            <li>29 * 0.5 &#9166;</li>
                            <li>29 / 2 &#9166;</li>
                            <li>29 * 3 - 5 &#9166;</li>
                            <li>abs(-29) &#9166;</li>
                        </ul>
					</Dialog>
				</div>
			</MuiThemeProvider>
		);
	}
}

DamageCalculator.contextTypes = {
	i18n: React.PropTypes.object.isRequired
};

export default DamageCalculator;
