import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {omit} from '../../util/helpers';

const Tbody = function(props) {
	const {children = null, style: userStyle = null} = props;

	const style = {
		...userStyle
	};

	const otherProps = omit(props, Object.keys(Tbody.propTypes));

	return (
		<StyledTbody style={style} {...otherProps}>
			{children}
		</StyledTbody>
	);
};

Tbody.propTypes = {
	children: PropTypes.node,
	// eslint-disable-next-line
	style: PropTypes.object
};

const StyledTbody = styled.tbody`
	display: table-row-group;
	border-color: inherit;
`;

export default Tbody;
