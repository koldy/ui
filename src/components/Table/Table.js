import React, {useContext, useMemo} from 'react';
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';

import {getStyleForMargins, isObject, omit} from '../../util/helpers';

import Head from './Thead';
import Body from './Tbody';
import Foot from './Tfoot';
import Tr from './Tr';
import Th from './Th';
import Td from './Td';

import ThemeContext from '../../theme/ThemeContext';

/**
 * @param props
 * @return {*}
 * @constructor
 */
const Table = function(props) {
	const {
		children = null,
		tableLayout = null,
		size = null,
		color = null,
		style: userStyle = null,
		m = null,
		mt = null,
		mr = null,
		mb = null,
		ml = null
	} = props;

	const {theme} = useContext(ThemeContext);

	// TODO: use one useMemo instead of one per each prop

	/**
	 * ******************************** Calculate table sizes **************************************
	 */
	const tableSizeCss = useMemo(() => {
		// see what we have in theme and return some values that should be passed to styled component
		const defaults = theme.json('table.defaults');
		const sizes = theme.json('table.size');

		const defaultSize = size || defaults.size || null;

		if (defaultSize === null) {
			theme.warning("Table component didn't detect default table size so no size will be applied to the table");
		} else {
			const themeSize = sizes[defaultSize] || null;

			if (themeSize === null || !isObject(themeSize)) {
				theme.warning(`<Table size="${defaultSize}"/> not found in theme.table.size or not an object`);
			} else {
				return themeSize;
			}
		}

		return {};
	}, [theme, size]);

	/**
	 * ******************************** Calculate table colors **************************************
	 */
	const tableColorCss = useMemo(() => {
		// see what we have in theme and return some values that should be passed to styled component
		const defaults = theme.json('table.defaults');
		const colors = theme.json('table.color');

		const defaultColor = color || defaults.color || null;

		if (defaultColor === null) {
			theme.warning("Table component didn't detect default table color so no color will be applied to the table");
		} else {
			const themeColor = colors[defaultColor] || null;

			if (themeColor === null || !isObject(themeColor)) {
				theme.warning(`<Table color="${defaultColor}"/> not found in theme.table.color or not an object`);
			} else {
				return theme.processColors(themeColor);
			}
		}

		return {};
	}, [theme, color]);

	if (theme.inDebug()) {
		// TODO: Check the children in debug mode
		React.Children.forEach(children, (child) => {
			if (React.isValidElement(child)) {
				if (!(child instanceof Head) && !(child instanceof Body) && !(child instanceof Foot)) {
					//throw new ThemeError('Table component expected children of Thead, Tbody or Tfoot, but got none of them');
				}
			}
		});
	}

	const style = {
		...getStyleForMargins({m, mt, mr, mb, ml}),
		...userStyle
	};

	const otherProps = omit(props, Object.keys(Table.propTypes));

	return (
		<StyledTable
			tableLayout={tableLayout}
			tableSizeCss={tableSizeCss}
			tableColorCss={tableColorCss}
			style={style}
			{...otherProps}
		>
			{children}
		</StyledTable>
	);
};

Table.propTypes = {
	children: PropTypes.node,
	tableLayout: PropTypes.oneOf(['auto', 'fixed']),
	size: PropTypes.string,
	color: PropTypes.string,
	// eslint-disable-next-line
	style: PropTypes.object,

	// margins:
	m: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	mt: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	mr: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	mb: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	ml: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

const StyledTable = styled.table`
	display: table;
	table-layout: ${({tableLayout}) => tableLayout || 'auto'};
	${({tableSizeCss}) => css(tableSizeCss)};
	${({tableColorCss}) => css(tableColorCss)};
`;

Table.Thead = Head;
Table.Tbody = Body;
Table.Tfoot = Foot;

Table.Tr = Tr;
Table.Th = Th;
Table.Td = Td;

export default Table;
