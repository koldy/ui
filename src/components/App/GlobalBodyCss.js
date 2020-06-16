import React from 'react';
import {createPortal} from 'react-dom';
import PropTypes from 'prop-types';
import {css} from 'styled-components';

const GlobalBodyCss = function({bodyCss}) {
	return createPortal(
		<style id="koldy-ui-body-css">
			body {'{'}
			{css(bodyCss)}
			{'}'}
		</style>,
		document.head
	);
};

GlobalBodyCss.propTypes = {
	bodyCss: PropTypes.object
};

export default GlobalBodyCss;
