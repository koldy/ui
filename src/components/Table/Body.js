import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Body = function(props) {
	const {children = null, style: userStyle = null, ...otherProps} = props;

	const style = {
		...userStyle
	};

	return (
		<StyledTbody style={style} {...otherProps}>
			{children}
		</StyledTbody>
	);
};

Body.propTypes = {
	children: PropTypes.node,
	style: PropTypes.object
};

const StyledTbody = styled.tbody`
	display: table-row-group;
	border-color: inherit;
`;

export default Body;
