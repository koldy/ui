import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {preventDefaultAndStopPropagation} from '../../src/util/helpers';

const H2 = styled.h2`
	display: block;
	color: ${({theme}) => theme.black};
	font-weight: 600;
	font-size: 1.2rem;
	margin: 1.5rem 0 0.5rem 0;
	padding-bottom: 0.5rem;
	position: relative;
	cursor: pointer;
	border-bottom: 1px solid #efefef;

	> a {
		&:first-child {
			position: absolute;
			top: -70px;
			width: 1px;
			height: 1px;
		}

		&:nth-child(2) {
			position: absolute;
			left: -0.9rem;
			color: #5d88d0;
			visibility: hidden;
		}
	}

	&:hover {
		> a {
			&:nth-child(2) {
				visibility: visible;
			}
		}
	}
`;

const DocsSubTitle = function(props) {
	const {children, hash} = props;

	const handleClick = useCallback(
		(e) => {
			e.preventDefault();
			e.stopPropagation();
			window.location.hash = hash;
		},
		[hash]
	);

	return (
		<H2 onClick={handleClick}>
			<a id={hash} aria-hidden="true" />
			<a href={`#${hash}`} aria-hidden="true" onClick={preventDefaultAndStopPropagation}>
				#
			</a>
			{children}
		</H2>
	);
};

DocsSubTitle.propTypes = {
	children: PropTypes.node.isRequired,
	hash: PropTypes.string.isRequired
};

export default DocsSubTitle;
