/* eslint-disable */
import React, {
	forwardRef,
	useContext,
	createContext,
	useMemo,
	useCallback,
	useEffect,
	useRef,
	useReducer,
	useImperativeHandle
} from 'react';
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';
import Popper from 'popper.js';

import {getStyleForMargins, getStyleForPaddings, isFunction, omit, preventDefaultAndStopPropagation} from '../../util/helpers';
import ThemeContext from '../../theme/ThemeContext';
import TextField from '../TextField/TextField';
import useOutsideClick from '../../hooks/useOutsideClick';

let popper = null;
const LocalContext = createContext(null);

const SHOW_SUGGESTIONS = 1;
const HIDE_SUGGESTIONS = 2;
const SELECT_VALUE = 3;
const PICK_VALUE = 4;

const initialState = {
	showSuggestions: false,
	selectedValue: null
};

const reducer = function(state, action) {
	switch (action.type) {
		case SHOW_SUGGESTIONS:
			return {
				...state,
				showSuggestions: true
			};

		case HIDE_SUGGESTIONS:
			return {
				...state,
				showSuggestions: false,
				selectedValue: null
			};

		case SELECT_VALUE:
			return {
				...state,
				selectedValue: action.value
			};

		case PICK_VALUE:
			return {
				...state,
				selectedValue: null,
				showSuggestions: false
			};

		default:
			throw new Error(`Error setting state, invalid action.type: ${action.type}`);
	}
};

const AutoComplete = forwardRef(function(props, ref) {
	const {theme} = useContext(ThemeContext);

	const {size: defaultSize = null, width: defaultWidth = null, variant: defaultVariant, color: defaultColor} = theme.json(
		'inputField.defaults'
	);

	const {
		children = null,
		type = 'text',
		style: userStyle = null,
		name = null,
		value,
		defaultValue,
		variant = defaultVariant,
		color = defaultColor,
		size = defaultSize,
		width = defaultWidth,
		minWidth = null,
		maxWidth = null,
		disabled = false,
		readOnly = false,
		placeholder = null,
		onChange = null,
		onFocus = null,
		onBlur = null,
		onClick = null,
		onDoubleClick = null,
		onInput = null,
		inputDelay = 300,
		// eslint-disable-next-line
		onKeyDown = null // not defined in propTypes
	} = props;

	const {m = null, mt = null, mr = null, mb = null, ml = null} = props;

	const innerRef = useRef(null);
	useImperativeHandle(ref, () => innerRef.current);

	const [state, dispatch] = useReducer(reducer, initialState);
	const {selectedValue, showSuggestions} = state;
	const popperRef = useRef(null);

	/**
	 * ******************************** MAP VALUES **************************************
	 */
	const values = useMemo(() => {
		const v = [];
		React.Children.forEach(children, (child) => {
			if (React.isValidElement(child)) {
				const {value: optionValue} = child.props;

				if (optionValue !== undefined) {
					v.push(optionValue);
				}
			}
		});
		return v;
	}, [children]);

	/**
	 * ******************************** SET VALUE FUNC **************************************
	 */
	const setValue = useCallback(
		(newValue) => {
			if (value !== undefined) {
				if (typeof onChange === 'function') {
					// it's controlled element, so we'll change the value by triggering onChange
					onChange({
						name,
						value: newValue,
						element: innerRef.current
					});
				}
			} else {
				// it's not controlled element, so we'll change the value directly in DOM
				innerRef.current.value = newValue;

				if (typeof onChange === 'function') {
					onChange({
						name,
						value: newValue,
						element: innerRef.current
					});
				}
			}
		},
		[name, value, defaultValue, onChange]
	);

	const pickValue = useCallback(
		(newValue) => {
			dispatch({
				type: PICK_VALUE
			});

			setValue(newValue);
		},
		[setValue]
	);

	/**
	 * ******************************** KEY DOWN **************************************
	 */
	const handleKeyDown = useCallback(
		(e) => {
			const {value: enteredValue} = e.currentTarget;
			let nextValue = null;

			switch (e.keyCode) {
				case 38: // UP
					if (selectedValue !== null) {
						const index = values.indexOf(selectedValue);

						if (index !== -1 && index > 0) {
							nextValue = values[index - 1];
							dispatch({
								type: SELECT_VALUE,
								value: nextValue
							});
						}
					} else if (values.length > 0) {
						// selectedValue is null
						nextValue = values[values.length - 1];
						dispatch({
							type: SELECT_VALUE,
							value: nextValue
						});
					}
					break;

				case 40: // DOWN
					if (selectedValue !== null) {
						const index = values.indexOf(selectedValue);

						if (index !== -1 && index < values.length - 1) {
							nextValue = values[index + 1];
							dispatch({
								type: SELECT_VALUE,
								value: nextValue
							});
						}
					} else if (values.length > 0) {
						// selectedValue is null
						// eslint-disable-next-line
						nextValue = values[0];
						dispatch({
							type: SELECT_VALUE,
							value: nextValue
						});
					}
					break;

				case 13: // ENTER
					if (selectedValue !== null) {
						e.preventDefault();
						e.stopPropagation();
						pickValue(selectedValue);
					}
					break;

				default:
					if (enteredValue !== '') {
						dispatch({
							type: SHOW_SUGGESTIONS
						});
					} else {
						dispatch({
							type: HIDE_SUGGESTIONS
						});
					}
					break;
			}

			if (nextValue !== null) {
				const options = popperRef.current.querySelectorAll(`[data-value="${nextValue}"]`);

				if (options && options.length > 0) {
					const option = options[0];
					if (option) {
						option.scrollIntoView({block: 'end', inline: 'nearest'});
					}
				}
			}

			if (typeof onKeyDown === 'function') {
				onKeyDown(e.nativeEvent);
			}
		},
		[onKeyDown, values, selectedValue, pickValue]
	);

	/**
	 * ******************************** CONTEXT **************************************
	 */
	const localContext = useMemo(
		() => ({
			values,
			dispatch,
			selectedValue,
			pickValue
		}),
		[values, selectedValue, pickValue]
	);

	/**
	 * ******************************** STYLE **************************************
	 */
	const style = useMemo(() => {
		return {
			...getStyleForMargins(props),
			...userStyle
		};
	}, [userStyle, m, mt, mr, mb, ml]);

	const otherProps = omit(props, Object.keys(AutoComplete.propTypes));

	/**
	 * ******************************** POPPER **************************************
	 */
	const showPopper = useCallback(() => {
		// show it only if there are available values in children
		if (!popper) {
			popperRef.current.style.display = 'block';
			const {width: inputWidth} = innerRef.current.getBoundingClientRect();
			popperRef.current.style.width = `${inputWidth < 120 ? 120 : inputWidth}px`;

			popper = new Popper(innerRef.current, popperRef.current, {
				placement: 'bottom',
				modifiers: {
					offset: {
						enabled: true,
						offset: '0,4'
					}
				}
			});
		}
	}, []);

	const hidePopper = useCallback(() => {
		if (popper) {
			popperRef.current.style.display = 'none';
			popper.destroy();
		}
		popper = null;
	}, []);

	useEffect(() => {
		if (showSuggestions) {
			showPopper();
		} else {
			hidePopper();
		}

		return () => {
			// on unmount
			hidePopper();
		};
	}, [showSuggestions]);

	useOutsideClick(popperRef, () =>
		dispatch({
			type: HIDE_SUGGESTIONS
		})
	);

	// reset selected value every time when values change
	useEffect(
		() =>
			dispatch({
				type: SELECT_VALUE,
				value: null
			}),
		[values]
	);

	return (
		<LocalContext.Provider value={localContext}>
			<TextField
				ref={innerRef}
				type={type}
				name={name}
				value={value || undefined}
				defaultValue={defaultValue || undefined}
				onChange={onChange}
				onInput={onInput}
				inputDelay={inputDelay}
				onClick={onClick}
				onDoubleClick={onDoubleClick}
				onFocus={onFocus}
				onBlur={onBlur}
				variant={variant}
				size={size}
				color={color}
				width={width}
				minWidthCss={minWidth}
				maxWidthCss={maxWidth}
				disabled={disabled}
				readOnly={readOnly}
				placeholder={placeholder}
				style={style}
				autoComplete="off"
				onKeyDown={handleKeyDown}
				{...otherProps}
			/>
			<SuggestionsContainer ref={popperRef}>{children}</SuggestionsContainer>
		</LocalContext.Provider>
	);
});

AutoComplete.propTypes = {
	children: PropTypes.node,
	type: PropTypes.oneOf(['text', 'tel', 'email', 'search']),
	name: PropTypes.string,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	color: PropTypes.string,
	size: PropTypes.string,
	width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	variant: PropTypes.string,
	disabled: PropTypes.bool,
	readOnly: PropTypes.bool,
	// eslint-disable-next-line
	style: PropTypes.object,

	onChange: PropTypes.func,
	onFocus: PropTypes.func,
	onBlur: PropTypes.func,
	onClick: PropTypes.func,
	onDoubleClick: PropTypes.func,
	onInput: PropTypes.func,
	inputDelay: PropTypes.number,

	// margins:
	m: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	mt: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	mr: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	mb: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	ml: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

const SuggestionsContainer = styled.div`
	display: none;
	height: auto;
	max-height: 200px;
	background: #ffffff;
	border: 1px solid #efefef;
	border-radius: 4px;
	padding: 0;
	margin: 0;
	font-size: 1rem;
	line-height: normal;
	overflow: hidden;
	overflow-y: auto;
	position: relative;
`;

const createPickValue = function(value, pickValueFn) {
	return () => pickValueFn(value);
};

const Option = function(props) {
	const {
		children = null,
		value,
		textAlign = 'left',
		hoverBackgroundColor = null,
		style: userStyle = null,
		p = null,
		pt = null,
		pr = null,
		pb = null,
		pl = null
	} = props;

	const {pickValue, selectedValue, values} = useContext(LocalContext);
	const {theme} = useContext(ThemeContext);

	const childrenParam = useMemo(() => {
		// this just keeps the reference to the same object
		return {
			value,
			pickValue: createPickValue(value, pickValue),
			selectedValue,
			isSelected: selectedValue === value,
			values,
			theme
		};
	}, [value, pickValue, selectedValue, values, theme]);

	const style = useMemo(() => {
		if (p === null && pt === null && pr === null && pb === null && pl === null) {
			return {
				...getStyleForPaddings({p: null, pt: '0.33rem', pr: '0.66rem', pb: '0.33rem', pl: '0.66rem'}),
				...userStyle
			};
		}

		return {
			...getStyleForPaddings({p, pt, pr, pb, pl}),
			...userStyle
		};
	}, [userStyle, p, pt, pr, pb, pl]);

	const styleHover = useMemo(() => {
		if (!hoverBackgroundColor) {
			return {};
		}

		return {
			background: theme.processColor(hoverBackgroundColor)
		};
	}, [theme, hoverBackgroundColor]);

	const handleClick = useCallback(
		(e) => {
			e.preventDefault();
			e.stopPropagation();
			pickValue(value);
		},
		[value, pickValue]
	);

	if (isFunction(children)) {
		return children(childrenParam);
	}

	return (
		<StyledOption
			cssTextAlign={textAlign}
			style={style}
			styleHover={styleHover}
			onClick={handleClick}
			onDoubleClick={preventDefaultAndStopPropagation}
			selected={selectedValue === value}
			data-value={value}
		>
			{value}
		</StyledOption>
	);
};

Option.propTypes = {
	children: PropTypes.func,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // values used for the set
	textAlign: PropTypes.oneOf(['left', 'center', 'right', 'justify']),
	hoverBackgroundColor: PropTypes.string,
	// eslint-disable-next-line
	style: PropTypes.object,

	// paddings:
	p: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	pt: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	pr: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	pb: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	pl: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

const StyledOption = styled.div`
	display: block;
	text-align: ${({cssTextAlign}) => cssTextAlign};
	${({styleHover, selected}) => (selected ? css(styleHover) : '')}

	&:hover {
		cursor: pointer;
		${({styleHover}) => css(styleHover)}
	}
`;

AutoComplete.Option = Option;
export default AutoComplete;
