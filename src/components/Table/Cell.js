import React, {useCallback, useContext} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {getPixelsOrString, getStyleForPaddings, isFunction, omit} from '../../util/helpers';
import {RowContext} from './TableContext';

const Cell = function(props) {
	const {
		children = null,
		onClick = null,
		onDoubleClick = null,
		width = null,
		height = null,
		textAlign = null,
		verticalAlign = null,
		style: userStyle = null,
		as = 'td',
		p = null,
		pt = null,
		pr = null,
		pb = null,
		pl = null
	} = props;
	const {onClick: onRowClick, onDoubleClick: onRowDoubleClick} = useContext(RowContext);

	const handleClick = useCallback(
		(e) => {
			if (isFunction(onClick)) {
				e.preventDefault();
				e.stopPropagation();
				onClick();
			} else if (isFunction(onRowClick)) {
				e.preventDefault();
				e.stopPropagation();
				onRowClick();
			}
		},
		[onClick, onRowClick]
	);

	const handleDoubleClick = useCallback(
		(e) => {
			if (isFunction(onDoubleClick)) {
				e.preventDefault();
				e.stopPropagation();
				onDoubleClick();
			} else if (isFunction(onRowDoubleClick)) {
				e.preventDefault();
				e.stopPropagation();
				onRowDoubleClick();
			}
		},
		[onDoubleClick, onRowDoubleClick]
	);

	const style = {
		width: getPixelsOrString(width),
		height: getPixelsOrString(height),
		...getStyleForPaddings({p, pt, pr, pb, pl}),
		...userStyle
	};

	const otherProps = omit(props, Object.keys(Cell.propTypes));

	return (
		<StyledCell
			onClick={handleClick}
			onDoubleClick={handleDoubleClick}
			textAlign={textAlign}
			verticalAlign={verticalAlign}
			style={style}
			{...otherProps}
			as={as}
		>
			{children}
		</StyledCell>
	);
};

Cell.propTypes = {
	children: PropTypes.node,
	onClick: PropTypes.func,
	onDoubleClick: PropTypes.func,
	width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	textAlign: PropTypes.oneOf(['left', 'center', 'right', 'justify']),
	verticalAlign: PropTypes.oneOf(['baseline', 'sub', 'super', 'text-top', 'text-bottom', 'middle', 'top', 'bottom']),
	colSpan: PropTypes.number,
	rowSpan: PropTypes.number,
	// eslint-disable-next-line
	style: PropTypes.object,
	as: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),

	// padding:
	p: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	pt: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	pr: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	pb: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	pl: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

const StyledCell = styled.td`
	display: table-cell;
	text-align: ${({textAlign}) => textAlign || 'left'};
	vertical-align: ${({verticalAlign}) => verticalAlign || 'middle'};
`;

export default Cell;
