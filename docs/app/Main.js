import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import styled from 'styled-components';

import ScrollToTop from '../components/ScrollToTop';
import Footer from './Footer';
import NotFound from '../components/NotFound';

// documentation
import GettingStartedDocs, {route as gettingStartedRoute} from '../pages/GettingStarted.docs';
import ColorsDocs, {route as colorsRoute} from '../pages/Colors.docs';
import GlobalRulesForProps, {route as globalRulesForPropsRoute} from '../pages/GlobalRulesForProps.docs';
import ThemeDocs, {route as themeDocsRoute} from '../pages/Theme.docs';
import ThemeManagerDocs, {route as themeManagerDocsRoute} from '../pages/ThemeManager.docs';

// components
import AppDocs, {route as appRoute} from '../../src/components/App/App.docs';
import BadgeDocs, {route as badgeRoute} from '../../src/components/Badge/Badge.docs';
import BoxDocs, {route as boxRoute} from '../../src/components/Box/Box.docs';
import ButtonDocs, {route as buttonRoute} from '../../src/components/Button/Button.docs';
import ColumnLayoutDocs, {route as columnLayoutRoute} from '../../src/components/ColumnLayout/ColumnLayout.docs';
import DrawerDocs, {route as drawerRoute} from '../../src/components/Drawer/Drawer.docs';
import FlexboxDocs, {route as flexboxRoute} from '../../src/components/Flexbox/Flexbox.docs';
import OverlayDocs, {route as overlayRoute} from '../../src/components/Overlay/Overlay.docs';
import ProgressBarDocs, {route as progressBarRoute} from '../../src/components/ProgressBar/ProgressBar.docs';
import TableDocs, {route as tableRoute} from '../../src/components/Table/Table.docs';
import TextDocs, {route as textRoute} from '../../src/components/Text/Text.docs';
import ToastDocs, {route as toastRoute} from '../../src/components/Toast/Toast.docs';

// input components
import CheckboxDocs, {route as checkboxRoute} from '../../src/components/Checkbox/Checkbox.docs';
import FileFieldDocs, {route as fileFieldRoute} from '../../src/components/FileField/FileField.docs';
import DateInputDocs, {route as dateInputRoute} from '../../src/components/DateInput/DateInput.docs';
import DatePickerDocs, {route as datePickerRoute} from '../../src/components/DatePicker/DatePicker.docs';
import MenuDocs, {route as menuRoute} from '../../src/components/Menu/Menu.docs';
import RadioDocs, {route as radioRoute} from '../../src/components/Radio/Radio.docs';
import SelectDocs, {route as selectRoute} from '../../src/components/Select/Select.docs';
import TextAreaDocs, {route as textAreaRoute} from '../../src/components/TextArea/TextArea.docs';
import TextFieldDocs, {route as textFieldRoute} from '../../src/components/TextField/TextField.docs';
import TimeFieldDocs, {route as timeFieldRoute} from '../../src/components/TimeField/TimeField.docs';

// hooks
import useBooleanDocs, {route as useBooleanRoute} from '../../src/hooks/useBoolean/useBoolean.docs';
import useColorDocs, {route as useColorRoute} from '../../src/hooks/useColor/useColor.docs';
import useMediaQueriesDocs, {route as useMediaQueriesRoute} from '../../src/hooks/useMediaQueries/useMediaQueries.docs';
import useOutsideClickDocs, {route as useOutsideClickRoute} from '../../src/hooks/useOutsideClick/useOutsideClick.docs';
import useToastDocs, {route as useToastRoute} from '../../src/hooks/useToast/useToast.docs';

const Main = function () {
	return (
		<StyledMain>
			<ScrollToTop />
			<article>
				<Switch>
					<Redirect exact from="/" to={gettingStartedRoute} />
					{/* Documentation */}
					<Route path={gettingStartedRoute} component={GettingStartedDocs} />
					<Route path={colorsRoute} component={ColorsDocs} />
					<Route path={globalRulesForPropsRoute} component={GlobalRulesForProps} />
					<Route path={themeDocsRoute} component={ThemeDocs} />
					<Route path={themeManagerDocsRoute} component={ThemeManagerDocs} />
					{/* Components */}
					<Route path={appRoute} component={AppDocs} />
					<Route path={badgeRoute} component={BadgeDocs} />
					<Route path={boxRoute} component={BoxDocs} />
					<Route path={buttonRoute} component={ButtonDocs} />
					<Route path={columnLayoutRoute} component={ColumnLayoutDocs} />
					<Route path={drawerRoute} component={DrawerDocs} />
					<Route path={flexboxRoute} component={FlexboxDocs} />
					<Route path={overlayRoute} component={OverlayDocs} />
					<Route path={progressBarRoute} component={ProgressBarDocs} />
					<Route path={tableRoute} component={TableDocs} />
					<Route path={textRoute} component={TextDocs} />
					<Route path={toastRoute} component={ToastDocs} />
					{/* Input Components */}
					<Route path={checkboxRoute} component={CheckboxDocs} />
					<Route path={fileFieldRoute} component={FileFieldDocs} />
					<Route path={dateInputRoute} component={DateInputDocs} />
					<Route path={datePickerRoute} component={DatePickerDocs} />
					<Route path={menuRoute} component={MenuDocs} />
					<Route path={radioRoute} component={RadioDocs} />
					<Route path={selectRoute} component={SelectDocs} />
					<Route path={textAreaRoute} component={TextAreaDocs} />
					<Route path={textFieldRoute} component={TextFieldDocs} />
					<Route path={timeFieldRoute} component={TimeFieldDocs} />
					{/* Hooks */}
					<Route path={useBooleanRoute} component={useBooleanDocs} />
					<Route path={useColorRoute} component={useColorDocs} />
					<Route path={useMediaQueriesRoute} component={useMediaQueriesDocs} />
					<Route path={useOutsideClickRoute} component={useOutsideClickDocs} />
					<Route path={useToastRoute} component={useToastDocs} />
					<Route component={NotFound} />
				</Switch>
			</article>
			<Footer />
		</StyledMain>
	);
};

const StyledMain = styled.main`
	display: block;
	width: 100%;
	box-sizing: border-box;

	> article {
		max-width: 992px;
		padding: 3rem 3rem 0 3rem;
		box-sizing: border-box;
		margin: 0 auto;
	}

	@media (min-width: 992px) {
		padding-left: 240px;
	}
`;

export default Main;
