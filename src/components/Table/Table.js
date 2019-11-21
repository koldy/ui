import React, {useContext, useMemo} from 'react';
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';

import {getPixelsOrString, getStyleForMargins, isObject} from '../../util/helpers';

import Head from './Head';
import Body from './Body';
import Foot from './Foot';
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
	const {theme} = useContext(ThemeContext);
	const {
		size: defaultSize = null,
		color: defaultColor = null,
		border: defaultBorder = null,
		hover: defaultHover = null,
		striped: defaultStriped = false,
		tableLayout: defaultTableLayout = 'auto'
	} = theme.json('table.defaults');

	const {
		children = null,
		tableLayout = defaultTableLayout,
		borderCollapse = 'collapse',
		size = defaultSize,
		width = '100%',
		color = defaultColor,
		border = defaultBorder,
		hover = defaultHover,
		striped = defaultStriped,
		style: userStyle = null,
		m = null,
		mt = null,
		mr = null,
		mb = null,
		ml = null,
		...otherProps
	} = props;

	/**
	 * ******************************** STYLE PARSER **************************************
	 */

	const {tableCss, tableStyle} = useMemo(() => {
		// get the size
		const sizes = theme.json('table.size');
		const colors = theme.json('table.color');

		const c = {};

		const thead = {
			' > tr': {
				' > th': {
					'&:last-child': {}
				},
				' > td': {
					'&:last-child': {}
				},
				'&:last-child': {
					' > th': {},
					' > td': {}
				}
			}
		};

		const tbody = {
			' > tr': {
				' > th': {
					'&:last-child': {}
				},
				' > td': {
					'&:last-child': {}
				},
				'&:last-child': {
					' > th': {},
					' > td': {}
				},
				'&:nth-child(even)': {
					' > th': {},
					' > td': {}
				}
			}
		};

		const tfoot = {
			' > tr': {
				' > th': {
					'&:last-child': {}
				},
				' > td': {
					'&:last-child': {}
				},
				'&:last-child': {
					' > th': {},
					' > td': {}
				}
			}
		};

		if (sizes[size] === undefined) {
			theme.warning(`<Table size="${size}"/>  is not set in theme.table.size.${size} so it's ignored`);
		} else {
			const {body} = sizes[size];
			const {head = body, foot = body} = sizes[size];

			if (isObject(head)) {
				const {th, td} = head;
				thead[' > tr'][' > th'] = {
					...thead[' > tr'][' > th'],
					...th
				};
				thead[' > tr'][' > td'] = {
					...thead[' > tr'][' > td'],
					...td
				};
			}

			if (isObject(body)) {
				const {th, td} = body;
				tbody[' > tr'][' > th'] = {
					...tbody[' > tr'][' > th'],
					...th
				};
				tbody[' > tr'][' > td'] = {
					...tbody[' > tr'][' > td'],
					...td
				};
			}

			if (isObject(foot)) {
				const {th, td} = foot;
				tfoot[' > tr'][' > th'] = {
					...tfoot[' > tr'][' > th'],
					...th
				};
				tfoot[' > tr'][' > td'] = {
					...tfoot[' > tr'][' > td'],
					...td
				};
			}
		}

		if (colors[color] === undefined) {
			theme.warning(`<Table color="${color}"/>  is not set in theme.table.color.${color} so it's ignored`);
		} else {
			const {borderColor, body} = colors[color];
			const {head = body, foot = body} = colors[color];

			// go through borders and apply style(s)
			if (borderColor) {
				// color definition depends on border and hover settings
				// borders can be: table, all, rows, head, foot -> or any combination with "|" in it
				const borders = typeof border === 'string' ? border.split('|') : [];

				borders.forEach((b) => {
					switch (b) {
						case 'table':
							c.border = `1px solid ${theme.processColor(borderColor)}`;
							break;

						case 'column':
							// column means vertical borders across all columns including head, body and foot
							thead[' > tr'][' > th'] = {
								...thead[' > tr'][' > th'],
								borderRight: `1px solid ${theme.processColor(borderColor)}`
							};
							thead[' > tr'][' > th']['&:last-child'] = {
								...thead[' > tr'][' > th']['&:last-child'],
								borderRight: 'none'
							};
							thead[' > tr'][' > td'] = {
								...thead[' > tr'][' > td'],
								borderRight: `1px solid ${theme.processColor(borderColor)}`
							};
							thead[' > tr'][' > td']['&:last-child'] = {
								...thead[' > tr'][' > td']['&:last-child'],
								borderRight: 'none'
							};

							tbody[' > tr'][' > th'] = {
								...tbody[' > tr'][' > th'],
								borderRight: `1px solid ${theme.processColor(borderColor)}`
							};
							tbody[' > tr'][' > th']['&:last-child'] = {
								...tbody[' > tr'][' > th']['&:last-child'],
								borderRight: 'none'
							};
							tbody[' > tr'][' > td'] = {
								...tbody[' > tr'][' > td'],
								borderRight: `1px solid ${theme.processColor(borderColor)}`
							};
							tbody[' > tr'][' > td']['&:last-child'] = {
								...tbody[' > tr'][' > td']['&:last-child'],
								borderRight: 'none'
							};

							tfoot[' > tr'][' > th'] = {
								...tfoot[' > tr'][' > th'],
								borderRight: `1px solid ${theme.processColor(borderColor)}`
							};
							tfoot[' > tr'][' > th']['&:last-child'] = {
								...tfoot[' > tr'][' > th']['&:last-child'],
								borderRight: 'none'
							};
							tfoot[' > tr'][' > td'] = {
								...tfoot[' > tr'][' > td'],
								borderRight: `1px solid ${theme.processColor(borderColor)}`
							};
							tfoot[' > tr'][' > td']['&:last-child'] = {
								...tfoot[' > tr'][' > td']['&:last-child'],
								borderRight: 'none'
							};
							break;

						case 'row':
							tbody[' > tr'][' > th'] = {
								...tbody[' > tr'][' > th'],
								borderBottom: `1px solid ${theme.processColor(borderColor)}`
							};
							tbody[' > tr'][' > td'] = {
								...tbody[' > tr'][' > td'],
								borderBottom: `1px solid ${theme.processColor(borderColor)}`
							};

							tbody[' > tr']['&:last-child'][' > th'] = {
								...tbody[' > tr']['&:last-child'][' > th'],
								borderBottom: 'none'
							};
							tbody[' > tr']['&:last-child'][' > td'] = {
								...tbody[' > tr']['&:last-child'][' > td'],
								borderBottom: 'none'
							};
							break;

						case 'head':
							thead[' > tr'][' > th'] = {
								...thead[' > tr'][' > th'],
								borderBottom: `1px solid ${theme.processColor(borderColor)}`
							};
							thead[' > tr'][' > td'] = {
								...thead[' > tr'][' > td'],
								borderBottom: `1px solid ${theme.processColor(borderColor)}`
							};
							break;

						case 'foot':
							tfoot[' > tr'][' > th'] = {
								...tfoot[' > tr'][' > th'],
								borderTop: `1px solid ${theme.processColor(borderColor)}`
							};
							tfoot[' > tr'][' > td'] = {
								...tfoot[' > tr'][' > td'],
								borderTop: `1px solid ${theme.processColor(borderColor)}`
							};
							break;

						default:
							theme.warning(`Unknown table border setting: ${b}; check the prop of your <Table border="${border}"/> `);
					}
				});
			}

			// apply head color
			if (isObject(head)) {
				const {backgroundColor = null, textColor = null /* backgroundHoverColor = null, textHoverColor = null */} = head;

				thead[' > tr'][' > th'] = {
					...thead[' > tr'][' > th'],
					backgroundColor: theme.processColor(backgroundColor),
					color: theme.processColor(textColor)
				};
				thead[' > tr'][' > td'] = {
					...thead[' > tr'][' > td'],
					backgroundColor: theme.processColor(backgroundColor),
					color: theme.processColor(textColor)
				};
			}

			// apply body color
			if (isObject(body)) {
				const {backgroundColor = null, backgroundHoverColor = null, textColor = null /* , textHoverColor = null */} = body;
				const {backgroundStripeColor = backgroundHoverColor} = body;

				tbody[' > tr'][' > th'] = {
					...tbody[' > tr'][' > th'],
					backgroundColor: theme.processColor(backgroundColor),
					color: theme.processColor(textColor)
				};
				tbody[' > tr'][' > td'] = {
					...tbody[' > tr'][' > td'],
					backgroundColor: theme.processColor(backgroundColor),
					color: theme.processColor(textColor)
				};

				if (striped === true && backgroundStripeColor) {
					tbody[' > tr']['&:nth-child(even)'][' > th'] = {
						...tbody[' > tr']['&:nth-child(even)'][' > th'],
						backgroundColor: backgroundStripeColor
					};
					tbody[' > tr']['&:nth-child(even)'][' > td'] = {
						...tbody[' > tr']['&:nth-child(even)'][' > td'],
						backgroundColor: backgroundStripeColor
					};
				}

				switch (hover) {
					case 'table':
						c['&:hover'] = {
							'th, td': {
								backgroundColor: backgroundHoverColor
							}
						};
						break;
					case 'row':
						tbody['> tr:hover'] = {
							'> th, > td': {
								backgroundColor: backgroundHoverColor
							}
						};
						break;

					case 'cell':
						tbody['td:hover'] = {
							backgroundColor: backgroundHoverColor
						};
						break;

					// no default
				}
			} else {
				theme.warning(`Body colors are not set in theme.table.color.${color}.body`);
			}

			// apply foot color
			if (isObject(foot)) {
				const {backgroundColor = null, textColor = null /* , backgroundHoverColor = null, textHoverColor = null */} = foot;

				tfoot[' > tr'][' > th'] = {
					...tfoot[' > tr'][' > th'],
					backgroundColor: theme.processColor(backgroundColor),
					color: theme.processColor(textColor)
				};
				tfoot[' > tr'][' > td'] = {
					...tfoot[' > tr'][' > td'],
					backgroundColor: theme.processColor(backgroundColor),
					color: theme.processColor(textColor)
				};
			}
		}

		return {
			tableCss: {
				...c,
				' > thead': thead,
				' > tbody': tbody,
				' > tfoot': tfoot
			},
			tableStyle: {
				...getStyleForMargins({m, mt, mr, mb, ml}),
				...userStyle,
				width: getPixelsOrString(width)
			}
		};
	}, [theme, size, color, border, hover, striped, userStyle, width, m, mt, mr, mb, ml]);

	return (
		<StyledTable tableLayout={tableLayout} borderCollapse={borderCollapse} tableCss={tableCss} style={tableStyle} {...otherProps}>
			{children}
		</StyledTable>
	);
};

Table.propTypes = {
	children: PropTypes.node,
	tableLayout: PropTypes.oneOf(['auto', 'fixed']),
	borderCollapse: PropTypes.oneOf(['separate', 'collapse']),
	width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	size: PropTypes.string,
	color: PropTypes.string,
	border: PropTypes.string,
	hover: PropTypes.oneOf(['table', 'row', 'cell']),
	striped: PropTypes.bool,
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
	border-collapse: ${({borderCollapse}) => borderCollapse};
	table-layout: ${({tableLayout}) => tableLayout || 'auto'};
	box-sizing: border-box;
	${({tableCss}) => css(tableCss)};
`;

Table.Head = Head;
Table.Body = Body;
Table.Foot = Foot;

Table.Tr = Tr;
Table.Th = Th;
Table.Td = Td;

export default Table;
