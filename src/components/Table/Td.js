import React from 'react';
import PropTypes from 'prop-types';

import Cell from './Cell';
import {omit} from '../../util/helpers';

const Td = function(props) {
	const {
		children = null,
		onClick = null,
		onDoubleClick = null,
		width = null,
		height = null,
		textAlign = null,
		verticalAlign = null,
		colSpan = null,
		rowSpan = null,
		style = null,
		p = null,
		pt = null,
		pr = null,
		pb = null,
		pl = null
	} = props;

	const otherProps = omit(props, ['children']);

	return (
		<Cell
			onClick={onClick}
			onDoubleClick={onDoubleClick}
			width={width}
			height={height}
			textAlign={textAlign}
			verticalAlign={verticalAlign}
			colSpan={colSpan}
			rowSpan={rowSpan}
			style={style}
			p={p}
			pt={pt}
			pr={pr}
			pb={pb}
			pl={pl}
			as="td"
			{...otherProps}
		>
			{children}
		</Cell>
	);
};

Td.propTypes = {
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

	// padding:
	p: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	pt: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	pr: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	pb: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	pl: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default Td;
