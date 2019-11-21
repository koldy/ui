import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Head = function(props) {
	const {children = null, style: userStyle = null, ...otherProps} = props;

	const style = {
		...userStyle
	};

	return (
		<StyledThead style={style} {...otherProps}>
			{children}
		</StyledThead>
	);
};

Head.propTypes = {
	children: PropTypes.node,
	// eslint-disable-next-line
	style: PropTypes.object
};

const StyledThead = styled.thead`
	display: table-header-group;
	border-color: inherit;
`;

export default Head;
