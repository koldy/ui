import React, {useMemo, useContext, useRef, useEffect, useCallback, useReducer} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ThemeContext from '../../theme/ThemeContext';
import DatePickerContext from './DatePickerContext';
import MonthGrid from './MonthGrid';
import DayNames from './DayNames';
import {
	getStyleForMargins,
	isControlledComponent,
	isEmpty,
	isObject,
	isFunction,
	isValidDate,
	preventDefaultAndStopPropagation,
	dateToISOString,
	dateToISOStringWithMilliseconds,
	isNumberOrString
} from '../../util/helpers';
import Nav from './Nav';
import ThemeError from '../../theme/ThemeError';
import TimeField from '../TimeField/TimeField';

const startOfMonth = function(date) {
	if (date.getDate() === 1) {
		return date;
	}

	const dt = new Date(date);
	dt.setDate(1);
	return dt;
};

const reducer = function(state, action) {
	switch (action.type) {
		case 'set-selected-date':
			return {
				...state,
				selectedDate: action.date,
				viewDate: isValidDate(action.date) ? startOfMonth(action.date) : state.viewDate
			};

		case 'set-view-date':
			return {
				...state,
				viewDate: action.date
			};

		default:
			return state;
	}
};

const init = function({value, defaultValue, initialMonth}) {
	// detect the view date: the initial month that will be shown in calendar no matter what the value is
	let viewDate = new Date();

	if (isValidDate(value)) {
		viewDate = startOfMonth(value);
	} else if (isValidDate(defaultValue)) {
		viewDate = startOfMonth(defaultValue);
	} else if (isValidDate(initialMonth)) {
		viewDate = startOfMonth(initialMonth);
	}

	// detect the current selected value, or none
	let selectedDate = null;

	if (value) {
		selectedDate = new Date(value);
	} else if (defaultValue) {
		selectedDate = new Date(defaultValue);
	}

	return {
		viewDate,
		selectedDate
	};
};

const DatePicker = function(props) {
	const {theme} = useContext(ThemeContext);

	const containerRef = useRef(null);
	const {size: defaultSize = null, variant: defaultVariant, color: defaultColor} = theme.json('datePicker.defaults');
	const {size: timeDefaultSize, variant: timeDefaultVariant, color: timeDefaultColor} = theme.json('datePicker.defaults');

	const {
		children = null,
		firstDayOfWeek = 1,
		name = null,
		value = undefined,
		defaultValue = undefined,
		valueFormat = null,
		initialMonth = null,
		minDate: givenMinDate = null,
		maxDate: givenMaxDate = null,
		onChange = null,
		color = defaultColor,
		size = defaultSize,
		variant = defaultVariant,
		disabled = false,
		hideNav = false,
		timePrecision = null,
		timeColor = timeDefaultColor,
		timeSize = timeDefaultSize,
		timeVariant = timeDefaultVariant,
		m = null,
		mt = null,
		mr = null,
		mb = null,
		ml = null,
		...otherProps
	} = props;

	const lastOnChange = useRef(null);
	lastOnChange.current = onChange;

	const lastName = useRef(null);
	lastName.current = name;

	const controlledComponent = isControlledComponent(value, defaultValue);

	/**
	 * ******************************** LOCAL STATE AND ACTIONS **************************************
	 */

	const [{selectedDate, viewDate}, dispatch] = useReducer(reducer, {value, defaultValue, initialMonth}, init);

	const setSelectedDate = useCallback(
		(date) => {
			// prevent setting new date if date is the same as given date
			if (dateToISOStringWithMilliseconds(date) !== dateToISOStringWithMilliseconds(selectedDate)) {
				dispatch({type: 'set-selected-date', date});
			}
		},
		[selectedDate]
	);

	const setViewDate = useCallback((date) => dispatch({type: 'set-view-date', date}), []);

	const pickDate = useCallback(
		(date) => {
			// prevent outside call if date hasn't changed
			if (
				isValidDate(date) &&
				isValidDate(selectedDate) &&
				dateToISOStringWithMilliseconds(date) === dateToISOStringWithMilliseconds(selectedDate)
			) {
				return;
			}

			let newDate = null;

			if (isValidDate(date)) {
				newDate = new Date(selectedDate);
				newDate.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
			}

			if (controlledComponent) {
				if (isFunction(lastOnChange.current)) {
					lastOnChange.current({
						value: newDate,
						name: lastName.current,
						containerElement: containerRef.current
					});
				}
			} else {
				setSelectedDate(newDate);
			}
		},
		[selectedDate, controlledComponent, setSelectedDate, lastOnChange]
	);

	const minDate = useMemo(() => {
		if (isValidDate(givenMinDate)) {
			return givenMinDate;
		}

		const detectedMinDate = new Date();
		detectedMinDate.setFullYear(detectedMinDate.getFullYear() - 100, detectedMinDate.getMonth(), detectedMinDate.getDate());
		detectedMinDate.setHours(0, 0, 0, 0);
		return detectedMinDate;
	}, [givenMinDate]);

	const maxDate = useMemo(() => {
		if (isValidDate(givenMaxDate)) {
			return givenMaxDate;
		}

		const detectedMaxDate = new Date();
		detectedMaxDate.setFullYear(detectedMaxDate.getFullYear() + 100, detectedMaxDate.getMonth(), detectedMaxDate.getDate());
		detectedMaxDate.setHours(0, 0, 0, 0);
		return detectedMaxDate;
	}, [givenMaxDate]);

	const hiddenValue = useMemo(() => {
		if (!name) {
			return null;
		}

		if (isFunction(valueFormat)) {
			let customFormat = null;
			try {
				customFormat = valueFormat(selectedDate);

				if (isNumberOrString(customFormat)) {
					return customFormat;
				}

				return '';
			} catch (e) {
				theme.error('Function for getting custom value format in DatePicker failed', e);
			}
		}

		if (isValidDate(selectedDate)) {
			// will return ISO date
			return dateToISOString(selectedDate);
		}

		return '';
	}, [name, selectedDate, valueFormat, theme]);

	const handleTimeChange = useCallback(
		({value: timeDate}) => {
			const newDate = isValidDate(selectedDate) ? new Date(selectedDate) : new Date();

			if (isValidDate(timeDate)) {
				newDate.setHours(timeDate.getHours(), timeDate.getMinutes(), timeDate.getSeconds(), timeDate.getMilliseconds());
			} else {
				newDate.setHours(0, 0, 0, 0);
			}

			if (controlledComponent) {
				if (isFunction(lastOnChange.current)) {
					lastOnChange.current({
						value: newDate,
						name: lastName.current,
						containerElement: containerRef.current
					});
				}
			} else {
				setSelectedDate(newDate);
			}
		},
		[selectedDate, controlledComponent, setSelectedDate, lastOnChange]
	);

	/**
	 * ******************************** STYLE PARSER **************************************
	 */
	const {dayInMonthCss, dayOutOfMonthCss, dayNameCss, containerStyle, lineColor} = useMemo(() => {
		const variants = theme.json('datePicker.variant');
		const colors = theme.json('datePicker.color');
		const sizes = theme.json('datePicker.size');

		if (!isObject(variants[variant]) || isEmpty(variants[variant])) {
			throw new ThemeError(`Invalid variant "${variant}" used for <DatePicker variant="${variant}"/>`);
		}

		if (!isObject(colors[color]) || isEmpty(colors[color])) {
			throw new ThemeError(`Invalid color "${color}" used for <DatePicker color="${color}"/>`);
		}

		if (!isObject(sizes[size]) || isEmpty(sizes[size])) {
			throw new ThemeError(`Invalid size "${size}" used for <DatePicker size="${size}"/>`);
		}

		const inMonthCss = {
			...variants[variant].dayInMonth,
			...colors[color].dayInMonth,
			...sizes[size].dayInMonth
		};

		const outOfMonthCss = {
			...variants[variant].dayOutOfMonth,
			...colors[color].dayOutOfMonth,
			...sizes[size].dayOutOfMonth
		};

		const nameCss = {
			...variants[variant].dayName,
			...colors[color].dayName,
			...sizes[size].dayName
		};

		return {
			dayInMonthCss: inMonthCss,
			dayOutOfMonthCss: outOfMonthCss,
			dayNameCss: nameCss,
			containerStyle: {
				...getStyleForMargins({m, mt, mr, mb, ml})
			},
			lineColor: theme.json(`datePicker.color.${color}`).lineColor
		};
	}, [theme, color, size, variant, m, mt, mr, mb, ml]);

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
			// this is controlled component and set the value directly in store because setSelectedDate would block this
			dispatch({
				type: 'set-selected-date',
				date: isValidDate(value) ? value : null
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value]);

	/**
	 * ******************************** HANDLE VALUE TO OUTSIDE **************************************
	 */

	const handleValueToOutside = useRef(true);
	useEffect(() => {
		if (handleValueToOutside.current) {
			// prevent from firing on first use
			handleValueToOutside.current = false;
			return;
		}

		if (containerRef.current !== null && !controlledComponent && isFunction(lastOnChange.current)) {
			lastOnChange.current({
				value: selectedDate,
				containerElement: containerRef.current,
				name: lastName.current
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedDate]);

	/**
	 * ******************************** CONTEXT **************************************
	 */
	const context = useMemo(
		() => ({
			controlledComponent,
			viewDate,
			setViewDate,
			dayInMonthCss,
			dayOutOfMonthCss,
			dayNameCss,
			firstDayOfWeek,
			selectedDate,
			setSelectedDate,
			pickDate,
			minDate,
			maxDate,
			disabled,
			lastOnChange
		}),
		[
			controlledComponent,
			viewDate,
			setViewDate,
			dayInMonthCss,
			dayOutOfMonthCss,
			dayNameCss,
			firstDayOfWeek,
			selectedDate,
			setSelectedDate,
			pickDate,
			minDate,
			maxDate,
			disabled,
			lastOnChange
		]
	);

	return (
		<StyledDatePicker
			style={containerStyle}
			onClick={preventDefaultAndStopPropagation}
			onDoubleClick={preventDefaultAndStopPropagation()}
			ref={containerRef}
			{...otherProps}
		>
			<DatePickerContext.Provider value={context}>
				{name && <input type="hidden" name={name} value={hiddenValue} />}
				{!hideNav && (
					<>
						<Nav />
						<Line lineColor={lineColor} />
					</>
				)}
				<DayNames />
				<MonthGrid />
				{timePrecision !== null && (
					<TimeContainer>
						<TimeField
							precision={timePrecision}
							width="auto"
							variant={timeVariant}
							color={timeColor}
							size={timeSize}
							value={controlledComponent ? selectedDate : undefined}
							defaultValue={controlledComponent ? undefined : selectedDate}
							onChange={handleTimeChange}
							selectAllOnFocus
						/>
					</TimeContainer>
				)}
				{children && (
					<>
						<Line lineColor={lineColor} />
						{isFunction(children)
							? children({
									setSelectedDate,
									setViewDate,
									selectedDate,
									minDate,
									maxDate
							  })
							: children}
					</>
				)}
			</DatePickerContext.Provider>
		</StyledDatePicker>
	);
};

DatePicker.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
	firstDayOfWeek: PropTypes.number,
	name: PropTypes.string,
	value: PropTypes.instanceOf(Date),
	defaultValue: PropTypes.instanceOf(Date),
	valueFormat: PropTypes.func,
	initialMonth: PropTypes.instanceOf(Date),
	minDate: PropTypes.instanceOf(Date),
	maxDate: PropTypes.instanceOf(Date),
	onChange: PropTypes.func,
	color: PropTypes.string,
	size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	variant: PropTypes.string,
	disabled: PropTypes.bool,
	hideNav: PropTypes.bool,
	timePrecision: PropTypes.oneOf(['minutes', 'seconds', 'milliseconds']),
	timeVariant: PropTypes.string,
	timeColor: PropTypes.string,
	timeSize: PropTypes.string,

	// margins:
	m: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	mt: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	mr: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	mb: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	ml: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

const StyledDatePicker = styled.div`
	display: inline-block;
	vertical-align: middle;
	width: auto;
	height: auto;
`;

const Line = styled.hr`
	display: block;
	border: none;
	border-top: 1px solid ${({lineColor}) => lineColor};
`;

const TimeContainer = styled.div`
	display: block;
	padding: 0.5rem;
	text-align: center;
`;

export default DatePicker;
