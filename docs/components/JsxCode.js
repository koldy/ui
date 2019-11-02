import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Jsx = styled.code`
	display: block;
	width: 100%;
	overflow: auto;
	background: #262626;
	color: #ddd;
	font-weight: 400;
	font-size: 1rem;
	padding: 1rem;
`;

const JsxCode = function({children}) {
	return <Jsx>{children}</Jsx>;
};

JsxCode.propTypes = {
	children: PropTypes.node.isRequired
};

export default JsxCode;
