import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const H2 = function(props) {
	const {children, hash} = props;
	return (
		<StyledH2>
			<a id={hash} aria-hidden="true" />
			<a href={`#${hash}`} aria-hidden="true">
				#
			</a>
			<span>{children}</span>
		</StyledH2>
	);
};

H2.propTypes = {
	children: PropTypes.node,
	hash: PropTypes.string
};

const StyledH2 = styled.h2`
	display: block;
	position: relative;
	width: 100%;
	margin: 2rem 0 0 0;

	> span {
		display: block;
		line-height: 1.6;
		font-size: 2rem;
	}

	> a {
		&:first-child {
			border: none;
			width: 1px;
			height: 1px;
			position: absolute;
			top: -1.5rem;
			left: -1px;
		}

		&:nth-child(2) {
			position: absolute;
			font-size: 2rem;
			color: inherit;
			line-height: 1.6;
			left: -2rem;
			opacity: 0.5;
			top: 1px;
			display: none;
			width: 2rem;
			text-align: center;
		}
	}

	&:hover {
		> a:nth-child(2) {
			display: block;
		}
	}
`;

export default H2;
