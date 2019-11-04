import React from 'react';
import PropTypes from 'prop-types';

import lightTheme from '../themes/koldy-ui-light-theme/src';

import App from '../src/components/App/App';
import ThemeManager from '../src/theme/ThemeManager';

const TestApp = function(props) {
	const {children, onErrorOrWarning} = props;

	const theme = new ThemeManager({
		json: lightTheme,
		onWarning: onErrorOrWarning,
		onError: onErrorOrWarning,
		mode: 'strict'
	});

	return <App theme={theme}>{children}</App>;
};

TestApp.propTypes = {
	children: PropTypes.node.isRequired,
	onErrorOrWarning: PropTypes.func
};

TestApp.defaultProps = {
	onErrorOrWarning: null
};

export default TestApp;
