import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledButton = styled.button`
	display: inline-block;
	vertical-align: middle;
	padding: 0.25rem 0.5rem;
	cursor: pointer;
	background: ${({theme}) => theme.primaryColor};
	color: ${({theme}) => theme.white};
	border: none;
	font-size: 0.9rem;
	border-radius: 3px;
`;

const DocsButton = function ({children, onClick}) {
	return (
		<StyledButton onClick={onClick}>
			{children}
		</StyledButton>
	);
};

DocsButton.propTypes = {
	children: PropTypes.node.isRequired,
	onClick: PropTypes.func
};

export default DocsButton;
