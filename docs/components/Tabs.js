import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {preventDefaultAndStopPropagation} from '../../src/util/helpers';

const Tabs = function(props) {
	const {children} = props;
	return <StyledTabs>{children}</StyledTabs>;
};

Tabs.propTypes = {
	children: PropTypes.node.isRequired
};

const StyledTabs = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
`;

const Tab = function(props) {
	const {children, active, onClick} = props;

	const handleClick = useCallback(
		(e) => {
			e.preventDefault();

			if (onClick) {
				onClick();
			}
		},
		[onClick]
	);

	return (
		<StyledTab active={active} onClick={handleClick} onDoubleClick={preventDefaultAndStopPropagation}>
			{children}
		</StyledTab>
	);
};

Tab.propTypes = {
	children: PropTypes.string.isRequired,
	active: PropTypes.bool.isRequired,
	onClick: PropTypes.func.isRequired
};

const StyledTab = styled.div`
	display: block;
	width: auto;
	border: none;
	border-bottom: 2px solid ${({active}) => (active ? '#ea8786' : 'transparent')};
	margin: 0.25em 0;
	padding: 0.2rem 0.5rem;
	cursor: ${({active}) => (active ? 'default' : 'pointer')};

	&:hover {
		border-bottom-color: #a81817;
	}
`;

Tabs.Tab = Tab;

export default Tabs;
