import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {omit} from '../../util/helpers';

const Foot = function(props) {
	const {children = null, style: userStyle = null} = props;

	const style = {
		...userStyle
	};

	const otherProps = omit(props, Object.keys(Foot.propTypes));

	return (
		<StyledTfoot style={style} {...otherProps}>
			{children}
		</StyledTfoot>
	);
};

Foot.propTypes = {
	children: PropTypes.node,
	// eslint-disable-next-line
	style: PropTypes.object
};

const StyledTfoot = styled.tfoot`
	display: table-footer-group;
	border-color: inherit;
`;

export default Foot;
