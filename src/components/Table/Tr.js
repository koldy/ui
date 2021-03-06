import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import RowContext from './RowContext';
import {isFunction} from '../../util/helpers';

const Tr = function (props) {
	const {children = null, onClick: userOnClick = null, onDoubleClick: userOnDoubleClick = null, ...otherProps} = props;

	const onClick = useCallback(() => {
		if (isFunction(userOnClick)) {
			userOnClick();
		}
	}, [userOnClick]);

	const onDoubleClick = useCallback(() => {
		if (isFunction(userOnDoubleClick)) {
			userOnDoubleClick();
		}
	}, [userOnDoubleClick]);

	const rowContext = {
		onClick,
		onDoubleClick,
		hasClick: isFunction(userOnClick),
		hasDoubleClick: isFunction(userOnDoubleClick)
	};

	return (
		<StyledTr {...otherProps}>
			<RowContext.Provider value={rowContext}>{children}</RowContext.Provider>
		</StyledTr>
	);
};

Tr.propTypes = {
	children: PropTypes.node,
	onClick: PropTypes.func,
	onDoubleClick: PropTypes.func
};

const StyledTr = styled.tr`
	display: table-row;

	.on-row-hover {
		display: none;
	}

	&:hover {
		> th,
		> td {
			> .on-row-hover {
				display: block;
			}
		}
	}
`;

export default Tr;
