import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Horizontal = styled.h2`
	display: flex;
	color: ${({theme}) => theme.black};
	font-weight: 400;
	font-size: 1.2rem;
	align-items: center;
	
	> div {
		&:first-child {
			width: 25%;
			color: ${({theme}) => theme.primaryColor};
			font-size: 0.9rem;
		}
		
		&:last-child {
			width: 75%;
		}
	}
`;

const ValueShowcase = function ({variant, value, children}) {
	switch (variant) {
		default:
			return (
				<Horizontal>
					<div>{value}</div>
					<div>
						{children}
					</div>
				</Horizontal>
			);
	}
};

ValueShowcase.propTypes = {
	children: PropTypes.node.isRequired,
	value: PropTypes.node.isRequired,
	variant: PropTypes.string
};

ValueShowcase.defaultProps = {
	variant: null
};

export default ValueShowcase;
