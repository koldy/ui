import React from 'react';
import {NavLink} from 'react-router-dom';
import styled from 'styled-components';

// documentation
import {route as gettingStartedRoute, title as gettingStartedTitle} from '../pages/GettingStarted.docs';
import {route as colorsRoute, title as colorsTitle} from '../pages/Colors.docs';
import {route as globalRulesForPropsRoute, title as globalRulesForPropsTitle} from '../pages/GlobalRulesForProps.docs';
import {route as themeRoute, title as themeTitle} from '../pages/Theme.docs';
import {route as themeManagerRoute, title as themeManagerTitle} from '../pages/ThemeManager.docs';

// components
import {route as appRoute, title as appTitle} from '../../src/components/App/App.docs';
import {route as badgeRoute, title as badgeTitle} from '../../src/components/Badge/Badge.docs';
import {route as boxRoute, title as boxTitle} from '../../src/components/Box/Box.docs';
import {route as buttonRoute, title as buttonTitle} from '../../src/components/Button/Button.docs';
import {route as columnLayoutRoute, title as columnLayoutTitle} from '../../src/components/ColumnLayout/ColumnLayout.docs';
import {route as drawerRoute, title as drawerTitle} from '../../src/components/Drawer/Drawer.docs';
import {route as flexboxRoute, title as flexboxTitle} from '../../src/components/Flexbox/Flexbox.docs';
import {route as overlayRoute, title as overlayTitle} from '../../src/components/Overlay/Overlay.docs';
import {route as progressBarRoute, title as progressBarTitle} from '../../src/components/ProgressBar/ProgressBar.docs';
import {route as tableRoute, title as tableTitle} from '../../src/components/Table/Table.docs';
import {route as textRoute, title as textTitle} from '../../src/components/Text/Text.docs';
import {route as toastRoute, title as toastTitle} from '../../src/components/Toast/Toast.docs';

// input components
import {route as checkboxRoute, title as checkboxTitle} from '../../src/components/Checkbox/Checkbox.docs';
import {route as fileFieldRoute, title as fileFieldTitle} from '../../src/components/FileField/FileField.docs';
import {route as datePickerRoute, title as datePickerTitle} from '../../src/components/DatePicker/DatePicker.docs';
import {route as radioRoute, title as radioTitle} from '../../src/components/Radio/Radio.docs';
import {route as selectRoute, title as selectTitle} from '../../src/components/Select/Select.docs';
import {route as textAreaRoute, title as textAreaTitle} from '../../src/components/TextArea/TextArea.docs';
import {route as textFieldRoute, title as textFieldTitle} from '../../src/components/TextField/TextField.docs';
import {route as timeFieldRoute, title as timeFieldTitle} from '../../src/components/TimeField/TimeField.docs';

// hooks
import {route as useBooleanRoute, title as useBooleanTitle} from '../../src/hooks/useBoolean/useBoolean.docs';
import {route as useMediaQueriesRoute, title as useMediaQueriesTitle} from '../../src/hooks/useMediaQueries/useMediaQueries.docs';
import {route as useOutsideClickRoute, title as useOutsideClickTitle} from '../../src/hooks/useOutsideClick/useOutsideClick.docs';
import {route as useToastRoute, title as useToastTitle} from '../../src/hooks/useToast/useToast.docs';

const logo = require('../images/logo-white-horizontal-small.png').default;
const {version, description} = require('../../package.json');

const Nav = function() {
	return (
		<StyledNav>
			<div>
				<img src={logo} alt={description} />
				<var>{version}</var>
			</div>
			<nav>
				<aside>
					<strong>Documentation</strong>
					<NavLink activeClassName="active" to={gettingStartedRoute}>
						{gettingStartedTitle}
					</NavLink>
					<NavLink activeClassName="active" to={colorsRoute}>
						{colorsTitle}
					</NavLink>
					<NavLink activeClassName="active" to={globalRulesForPropsRoute}>
						{globalRulesForPropsTitle}
					</NavLink>
					<NavLink activeClassName="active" to={themeRoute}>
						{themeTitle}
					</NavLink>
					<NavLink activeClassName="active" to={themeManagerRoute}>
						{themeManagerTitle}
					</NavLink>
					<strong>Components</strong>
					<NavLink activeClassName="active" to={appRoute}>
						{appTitle}
					</NavLink>
					<NavLink activeClassName="active" to={badgeRoute}>
						{badgeTitle}
					</NavLink>
					<NavLink activeClassName="active" to={boxRoute}>
						{boxTitle}
					</NavLink>
					<NavLink activeClassName="active" to={buttonRoute}>
						{buttonTitle}
					</NavLink>
					<NavLink activeClassName="active" to={columnLayoutRoute}>
						{columnLayoutTitle}
					</NavLink>
					<NavLink activeClassName="active" to={drawerRoute}>
						{drawerTitle}
					</NavLink>
					<NavLink activeClassName="active" to={flexboxRoute}>
						{flexboxTitle}
					</NavLink>
					<NavLink activeClassName="active" to={overlayRoute}>
						{overlayTitle}
					</NavLink>
					<NavLink activeClassName="active" to={progressBarRoute}>
						{progressBarTitle}
					</NavLink>
					<NavLink activeClassName="active" to={tableRoute}>
						{tableTitle}
					</NavLink>
					<NavLink activeClassName="active" to={textRoute}>
						{textTitle}
					</NavLink>
					<NavLink activeClassName="active" to={toastRoute}>
						{toastTitle}
					</NavLink>
					<strong>Input Components</strong>
					<NavLink activeClassName="active" to={checkboxRoute}>
						{checkboxTitle}
					</NavLink>
					<NavLink activeClassName="active" to={fileFieldRoute}>
						{fileFieldTitle}
					</NavLink>
					<NavLink activeClassName="active" to={datePickerRoute}>
						{datePickerTitle}
					</NavLink>
					<NavLink activeClassName="active" to={radioRoute}>
						{radioTitle}
					</NavLink>
					<NavLink activeClassName="active" to={selectRoute}>
						{selectTitle}
					</NavLink>
					<NavLink activeClassName="active" to={textAreaRoute}>
						{textAreaTitle}
					</NavLink>
					<NavLink activeClassName="active" to={textFieldRoute}>
						{textFieldTitle}
					</NavLink>
					<NavLink activeClassName="active" to={timeFieldRoute}>
						{timeFieldTitle}
					</NavLink>
					<strong>Hooks</strong>
					<NavLink activeClassName="active" to={useBooleanRoute}>
						{useBooleanTitle}
					</NavLink>
					<NavLink activeClassName="active" to={useMediaQueriesRoute}>
						{useMediaQueriesTitle}
					</NavLink>
					<NavLink activeClassName="active" to={useOutsideClickRoute}>
						{useOutsideClickTitle}
					</NavLink>
					<NavLink activeClassName="active" to={useToastRoute}>
						{useToastTitle}
					</NavLink>
				</aside>
			</nav>
		</StyledNav>
	);
};

const StyledNav = styled.div`
	display: block;
	background: #a81817;
	width: 100%;
	height: 46px;
	position: relative;

	> div:first-child {
		padding: 1rem;
		box-sizing: border-box;
		position: relative;

		> img {
			height: 28px;
		}

		> var {
			display: block;
			position: absolute;
			font-style: normal;
			font-size: 0.8rem;
			top: 24px;
			right: 6px;
			font-feature-settings: normal;
			font-family: ibm-plex-mono, Menlo, Monaco, OperatorMono-Book, monospace;
			opacity: 0.8;
		}
	}

	> nav {
		display: none;

		> aside {
			display: block;
			margin: 0 0 3rem 0;

			> strong {
				display: block;
				font-size: 1.3em;
				font-weight: bold;
				padding: 0.5rem;
				margin-top: 1rem;

				&:first-of-type {
					margin-top: 0;
				}
			}

			> a {
				display: block;
				padding: 0.5rem 1rem;
				color: #ffffff;
				background: transparent;
				text-decoration: none;
				border-top-left-radius: 3rem;
				border-bottom-left-radius: 3rem;
				font-size: 0.86em;
				font-weight: bold;

				&:hover {
					background-color: #cd3937;
				}

				&.active {
					background: #280f0e;
				}
			}
		}
	}

	@media (min-width: 992px) {
		position: fixed;
		top: 0;
		left: 0;
		width: 240px;
		height: 100vh;
		overflow-y: auto;

		> img {
			position: static;
			margin: 1rem;
		}

		> nav {
			display: block;
		}
	}
`;

export default Nav;
