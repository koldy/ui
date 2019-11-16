import React, {useContext, useMemo, useCallback, useReducer, useEffect, useRef, forwardRef} from 'react';
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';

import {
	emptyFn,
	getPixelsOrString,
	getStyleForMargins,
	isArray,
	isControlledComponent,
	isFunction,
	isObject,
	pick
} from '../../util/helpers';
import ThemeContext from '../../theme/ThemeContext';

import MenuContext from './MenuContext';
import Item from './Item';
import Divider from './Divider';

const reducer = function(state, action) {
	switch (action.type) {
		case 'set-value':
			return {
				...state,
				internalValues: action.internalValues
			};

		default:
			return state;
	}
};

const init = function({value, defaultValue}) {
	let internalValues = [];

	// internal value is always treated as array
	if (value !== undefined) {
		// component is controlled

		if (isArray(value)) {
			internalValues = value;
		} else {
			internalValues = [value];
		}
	} else if (defaultValue !== undefined) {
		if (isArray(defaultValue)) {
			internalValues = defaultValue;
		} else {
			internalValues = [defaultValue];
		}
	}

	return {
		internalValues
	};
};

const Menu = forwardRef(function(props, ref) {
	const {theme} = useContext(ThemeContext);

	const {variant: defaultVariant, size: defaultSize, color: defaultColor} = theme.json('menu.defaults');

	const {
		children,
		name = null,
		value = undefined,
		defaultValue = undefined,
		multiple = false,
		variant = defaultVariant,
		size = defaultSize,
		color = defaultColor,
		inline = false,
		height = null,
		onChange = null,
		disabled = false,
		m = null,
		mt = null,
		mr = null,
		mb = null,
		ml = null
	} = props;

	const [{internalValues}, dispatch] = useReducer(reducer, {value, defaultValue}, init);

	const lastName = useRef(null);
	lastName.current = name;

	const lastMultiple = useRef(null);
	lastMultiple.current = multiple;

	const lastOnChange = useRef(null);
	lastOnChange.current = onChange;

	if (value !== undefined && defaultValue === undefined && !onChange) {
		theme.warning('You must set onChange prop to <Menu/> component when using it as controlled component');
	} else if (value !== undefined && defaultValue !== undefined) {
		theme.warning('When using <Menu/>, you can set the value OR defaultValue prop, not both');
	}

	const controlledComponent = isControlledComponent(value, defaultValue);

	/**
	 * ******************************** METHODS **************************************
	 */

	const pickValue = useCallback(
		(val) => {
			if (!disabled) {
				let localValues = internalValues;
				const index = internalValues.indexOf(val);

				if (multiple) {
					if (index >= 0) {
						localValues.splice(index, 1);
					} else {
						localValues.push(val);
					}
				} else {
					if (localValues.length === 1) {
						if (localValues[0] === val) {
							localValues = []; // allows deselecting selected item
						} else {
							localValues = [val];
						}
					} else {
						localValues = [val];
					}
				}

				if (controlledComponent) {
					if (isFunction(lastOnChange.current)) {
						lastOnChange.current({
							value: lastMultiple.current ? localValues : localValues[0] || null,
							name: lastName.current
						});
					}
				} else {
					dispatch({
						type: 'set-value',
						internalValues: [...localValues]
					});
				}
			}
		},
		[internalValues, multiple, disabled]
	);

	/**
	 * ******************************** STYLE PARSER **************************************
	 */
	const {menuCss, menuStyle, itemCss, lineCss} = useMemo(() => {
		let itemCssDefinition = {};
		let lineCssDefinition = {};
		let menuCssDefinition = {};

		// first, take the variant
		const variants = theme.json('menu.variant');

		if (!isObject(variants[variant])) {
			theme.warning(`<Menu variant="${variant}"/> is not defined`);
		} else {
			// from variant, extract font and fontFamily
			const {menu = {}, item = {}, line = {}} = variants[variant];

			menuCssDefinition = {
				...pick(menu, theme.variantProperties())
			};

			itemCssDefinition = {
				...pick(item, theme.variantProperties())
			};

			lineCssDefinition = {
				...pick(line, theme.variantProperties())
			};
		}

		// size
		const sizes = theme.json('menu.size');
		if (!isObject(sizes[size])) {
			theme.warning(`<Menu size="${size}"/> is not defined`);
		} else {
			const {menu = {}, item = {}, line = {}} = sizes[size];

			menuCssDefinition = {
				...menuCssDefinition,
				...pick(menu, theme.sizeProperties())
			};

			itemCssDefinition = {
				...itemCssDefinition,
				...pick(item, theme.sizeProperties())
			};

			lineCssDefinition = {
				...lineCssDefinition,
				...pick(line, theme.sizeProperties())
			};
		}

		// color
		const colors = theme.json('menu.color');
		if (!isObject(colors[color])) {
			theme.warning(`<Menu color="${color}"/> is not defined`);
		} else {
			const {menu = {}, item = {}, line = {}} = colors[color];

			menuCssDefinition = {
				...menuCssDefinition,
				...theme.processColors(menu)
			};

			itemCssDefinition = {
				...itemCssDefinition,
				...theme.processColors(item)
			};

			lineCssDefinition = {
				...lineCssDefinition,
				...theme.processColors(line)
			};
		}

		return {
			menuCss: menuCssDefinition,
			itemCss: itemCssDefinition,
			lineCss: lineCssDefinition,
			menuStyle: {
				...getStyleForMargins({m, mt, mr, mb, ml}),
				height: getPixelsOrString(height)
			}
		};
	}, [theme, variant, size, color, height, m, mt, mr, mb, ml]);

	/**
	 * ******************************** HTML VALUE RENDERER **************************************
	 */
	const htmlValue = useMemo(() => {
		if (!name) {
			return null;
		}

		let val = null;

		if (multiple) {
			val = internalValues;
		} else {
			val = internalValues.length > 0 ? internalValues[0] : null;
		}

		return (
			<select name={name} onChange={emptyFn} value={val} multiple={multiple} disabled={disabled}>
				{internalValues.map((opt) => (
					<option key={opt}>{opt}</option>
				))}
			</select>
		);
	}, [name, internalValues, multiple, disabled]);

	/**
	 * ************************ HANDLE VALUE FROM OUTSIDE *****************************
	 */
	const handleValueFromOutside = useRef(true);
	useEffect(() => {
		if (handleValueFromOutside.current) {
			// prevent from firing on first use
			handleValueFromOutside.current = false;
			return;
		}

		if (controlledComponent) {
			// this is controlled component and set the value directly in state
			dispatch({
				type: 'set-value',
				internalValues: isArray(value) ? value : [value]
			});
		}
	}, [value]);

	/**
	 * ******************************** FIRE ONCHANGE TO OUTSIDE **************************************
	 */
	const fireOnChangeToOutside = useRef(true);
	useEffect(() => {
		if (fireOnChangeToOutside.current) {
			// prevent from firing on first call
			fireOnChangeToOutside.current = false;
		} else if (isFunction(lastOnChange.current)) {
			lastOnChange.current({
				value: lastMultiple.current ? internalValues : internalValues[0] || null,
				name: lastName.current
			});
		}
	}, [internalValues]);

	/**
	 * ******************************** LOCAL CONTEXT **************************************
	 */
	const context = useMemo(
		() => ({
			name,
			itemCss,
			lineCss,
			disabled,
			internalValues,
			pickValue,
			multiple,
			inline
		}),
		[name, itemCss, lineCss, disabled, internalValues, pickValue, multiple]
	);

	return (
		<StyledMenu ref={ref} menuCss={menuCss} inline={inline} style={menuStyle}>
			{htmlValue}
			<MenuContext.Provider value={context}>{children}</MenuContext.Provider>
		</StyledMenu>
	);
});

const StyledMenu = styled.nav`
	display: ${({inline}) => (inline ? 'inline-block' : 'block')};
	width: ${({inline}) => (inline ? 'auto' : '100%')};
	vertical-align: inherit;
	box-sizing: border-box;
	overflow-y: auto;
	${({menuCss}) => css(menuCss)}

	> select {
		box-sizing: border-box;
		border: 0;
		clip: rect(0, 0, 0, 0);
		height: 1px !important;
		overflow: hidden !important;
		padding: 0 !important;
		position: absolute !important;
		white-space: nowrap;
		width: 1px !important;
		outline: none;
	}
`;

Menu.propTypes = {
	children: PropTypes.node.isRequired,
	name: PropTypes.string,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
	defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
	multiple: PropTypes.bool,
	variant: PropTypes.string,
	size: PropTypes.string,
	color: PropTypes.string,
	inline: PropTypes.bool,
	height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	onChange: PropTypes.func,
	disabled: PropTypes.bool,

	// margins:
	m: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	mt: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	mr: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	mb: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	ml: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

Menu.Item = Item;
Menu.Divider = Divider;

export default Menu;
