import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {omit} from '../../util/helpers';

const Thead = function(props) {
	const {children = null, style: userStyle = null} = props;

	const style = {
		...userStyle
	};

	const otherProps = omit(props, Object.keys(Thead.propTypes));

	return (
		<StyledThead style={style} {...otherProps}>
			{children}
		</StyledThead>
	);
};

Thead.propTypes = {
	children: PropTypes.node,
	// eslint-disable-next-line
	style: PropTypes.object
};

const StyledThead = styled.thead`
	display: table-header-group;
	border-color: inherit;
`;

export default Thead;
