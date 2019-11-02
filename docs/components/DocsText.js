import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Text = styled.div`
	display: block;
	color: ${({theme}) => theme.black};
	font-weight: normal;
	font-size: 1rem;
	line-height: 1.75;
	margin: 1rem 0;

	> code,
	> p > code,
	> ul > li > code {
		border: 1px solid #efefef;
		color: ${({theme}) => theme.primaryColor};
		font-feature-settings: normal;
		font-family: ibm-plex-mono, Menlo, Monaco, OperatorMono-Book, monospace;
		background-color: rgb(243, 244, 243);
		padding: 2px 4px;
		display: inline-block;
		line-height: normal;
		overflow-wrap: normal;
		border-radius: 3px;
		font-size: 0.88em;
		margin: 2px;

		&:hover {
			border: 1px solid #bfbfbf;
		}
	}

	a {
		color: ${({theme}) => theme.black};
		border-bottom: 1px dashed #cfcfcf;

		&:visited {
			opacity: 0.8;
		}
	}
`;

const DocsText = function(props) {
	const {children} = props;
	return <Text>{children}</Text>;
};

DocsText.propTypes = {
	children: PropTypes.node.isRequired
};

export default DocsText;
