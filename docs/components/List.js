import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const List = function(props) {
	const {children} = props;

	return <StyledList>{children}</StyledList>;
};

List.propTypes = {
	children: PropTypes.node
};

const StyledList = styled.ul`
	display: block;
	list-style: disc outside;
	margin: 1rem 0;
	padding: 0 0 0 1rem;
`;

List.Item = function({children}) {
	return <StyledItem>{children}</StyledItem>;
};

List.Item.propTypes = {
	children: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.node])
};

const StyledItem = styled.li`
	display: list-item;
	margin: 0.5rem 0;
	line-height: 1.33;

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
		font-size: inherit;
	}
`;

export default List;
