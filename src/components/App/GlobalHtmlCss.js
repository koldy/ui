import React from 'react';
import {createPortal} from 'react-dom';
import PropTypes from 'prop-types';
import {css} from 'styled-components';

const GlobalHtmlCss = function({htmlCss}) {
	return createPortal(
		<style id="koldy-ui-html-css">
			html {'{'}
			{css(htmlCss)}
			{'}'}
		</style>,
		document.head
	);
};

GlobalHtmlCss.propTypes = {
	htmlCss: PropTypes.object
};

export default GlobalHtmlCss;
