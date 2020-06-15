import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Paragraph = function(props) {
	const {children} = props;
	return <StyledParagraph>{children}</StyledParagraph>;
};

Paragraph.propTypes = {
	children: PropTypes.node
};

const StyledParagraph = styled.p`
	display: block;
	width: 100%;
	line-height: 1.75;
	margin: 0.9rem 0;
	font-size: 1rem;
	color: #f5e5e5;
	text-align: start;

	a {
		border-bottom: 2px solid #f5e5e5;
		color: #f5e5e5;
		transition: border-bottom-color 100ms ease;

		&:hover {
			border-bottom-color: #a81817;
		}
	}
	
	code {
	  color: #ea8786;
	  font-size: 1.06em;
	}
`;

export default Paragraph;
