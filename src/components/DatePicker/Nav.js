import React, {useContext, useMemo, useCallback} from 'react';
import styled, {css} from 'styled-components';

import DatePickerContext from './DatePickerContext';
import {isValidDate, getDaysInMonth, preventDefaultAndStopPropagation, isFunction, getDateAsInteger} from '../../util/helpers';

// eslint-disable-next-line
const isMonthAllowed = function(viewDate, month, minDate, maxDate) {
	// TODO: implement this
	return true;
};

const Nav = function() {
	const {
		viewDate,
		setViewDate,
		selectedDate,
		setSelectedDate,
		dayInMonthCss,
		minDate,
		maxDate,
		controlledComponent,
		lastOnChange,
		disabled
	} = useContext(DatePickerContext);

	const years = useMemo(() => {
		// this generates the range of years into one array
		const y = [];

		const d = new Date(maxDate);
		d.setMonth(0);
		d.setDate(1);

		while (d.getFullYear() >= minDate.getFullYear()) {
			y.push(d.getFullYear());
			d.setFullYear(d.getFullYear() - 1, 0, 1);
		}

		return y;
	}, [minDate, maxDate]);

	const handleYearChange = useCallback(
		(e) => {
			const year = parseInt(e.currentTarget.value, 10);

			const d = isValidDate(selectedDate) ? new Date(selectedDate) : new Date(viewDate);
			const oldMonth = d.getMonth();
			d.setFullYear(year);

			if (d.getMonth() !== oldMonth) {
				d.setFullYear(year, oldMonth, getDaysInMonth(year, oldMonth + 1));
			}

			if (isValidDate(selectedDate)) {
				// if new date is greater or lower than min/max date, then don't apply the date
				if (isValidDate(minDate) && getDateAsInteger(d) < getDateAsInteger(minDate)) {
					// new date is lower than minDate
					return;
				}

				if (isValidDate(maxDate) && getDateAsInteger(d) > getDateAsInteger(maxDate)) {
					// new date is greater than maxDate
					return;
				}

				if (disabled) {
					// if component is disabled, we won't do anything
					return;
				}

				if (controlledComponent) {
					if (isFunction(lastOnChange.current)) {
						lastOnChange.current({value: d});
					}
				} else {
					setSelectedDate(d);
				}
			} else {
				setViewDate(d);
			}
		},
		[viewDate, selectedDate, disabled, controlledComponent, minDate, maxDate, setSelectedDate, setViewDate, lastOnChange]
	);

	const handleMonthChange = useCallback(
		(e) => {
			const month = parseInt(e.currentTarget.value, 10);

			const d = isValidDate(selectedDate) ? new Date(selectedDate) : new Date(viewDate);
			d.setMonth(month);

			if (d.getMonth() !== month) {
				d.setFullYear(d.getFullYear(), month, getDaysInMonth(d.getFullYear(), month + 1));
			}

			if (isValidDate(selectedDate)) {
				// if new date is greater or lower than min/max date, then don't apply the date
				if (isValidDate(minDate) && getDateAsInteger(d) < getDateAsInteger(minDate)) {
					// new date is lower than minDate
					return;
				}

				if (isValidDate(maxDate) && getDateAsInteger(d) > getDateAsInteger(maxDate)) {
					// new date is greater than maxDate
					return;
				}

				if (disabled) {
					// if component is disabled, we won't do anything
					return;
				}

				if (controlledComponent) {
					if (isFunction(lastOnChange.current)) {
						lastOnChange.current({value: d});
					}
				} else {
					setSelectedDate(d);
				}
			} else {
				setViewDate(d);
			}
		},
		[viewDate, selectedDate, minDate, maxDate, disabled, controlledComponent, setSelectedDate, setViewDate, lastOnChange]
	);

	const goToPreviousMonth = useCallback(
		(e) => {
			e.preventDefault();
			e.stopPropagation();

			const d = isValidDate(selectedDate) ? new Date(selectedDate) : new Date(viewDate);
			const oldMonth = d.getMonth();
			const nextMonth = oldMonth === 0 ? 11 : oldMonth - 1;

			d.setMonth(nextMonth);

			if (oldMonth === 0) {
				// we have to switch to previous year
				d.setFullYear(d.getFullYear() - 1);
			}

			if (d.getMonth() !== nextMonth) {
				d.setFullYear(d.getFullYear(), nextMonth, getDaysInMonth(d.getFullYear(), nextMonth + 1));
			}

			// if new date is greater or lower than min/max date, then don't apply the date
			if (isValidDate(minDate) && getDateAsInteger(d) < getDateAsInteger(minDate)) {
				// new date is lower than minDate
				return;
			}

			if (isValidDate(maxDate) && getDateAsInteger(d) > getDateAsInteger(maxDate)) {
				// new date is greater than maxDate
				return;
			}

			if (isValidDate(selectedDate)) {
				if (disabled) {
					// if component is disabled, we won't do anything
					return;
				}

				if (controlledComponent) {
					if (isFunction(lastOnChange.current)) {
						lastOnChange.current({value: d});
					}
				} else {
					setSelectedDate(d);
				}
			} else {
				setViewDate(d);
			}
		},
		[viewDate, selectedDate, disabled, minDate, maxDate, setViewDate, setSelectedDate, lastOnChange, controlledComponent]
	);

	const goToNextMonth = useCallback(
		(e) => {
			e.preventDefault();
			e.stopPropagation();

			const d = isValidDate(selectedDate) ? new Date(selectedDate) : new Date(viewDate);
			const oldMonth = d.getMonth();
			const nextMonth = oldMonth === 11 ? 0 : oldMonth + 1;

			d.setMonth(nextMonth);

			// it needs another iteration if old month is December
			if (oldMonth === 11) {
				// we have to switch to next year
				d.setFullYear(d.getFullYear() + 1);
			}

			if (d.getMonth() !== nextMonth) {
				d.setFullYear(d.getFullYear(), nextMonth, getDaysInMonth(d.getFullYear(), nextMonth + 1));
			}

			// if new date is greater or lower than min/max date, then don't apply the date
			if (isValidDate(minDate) && getDateAsInteger(d) < getDateAsInteger(minDate)) {
				// new date is lower than minDate
				return;
			}

			if (isValidDate(maxDate) && getDateAsInteger(d) > getDateAsInteger(maxDate)) {
				// new date is greater than maxDate
				return;
			}

			if (isValidDate(selectedDate)) {
				if (disabled) {
					// if component is disabled, we won't do anything
					return;
				}

				if (controlledComponent) {
					if (isFunction(lastOnChange.current)) {
						lastOnChange.current({value: d});
					}
				} else {
					setSelectedDate(d);
				}
			} else {
				setViewDate(d);
			}
		},
		[viewDate, selectedDate, disabled, setViewDate, setSelectedDate, lastOnChange, minDate, maxDate, controlledComponent]
	);

	return (
		<StyledNav dayInMonthCss={dayInMonthCss}>
			<div>
				<button type="button" onClick={goToPreviousMonth} onDoubleClick={preventDefaultAndStopPropagation}>
					&larr;
				</button>
			</div>
			<div>
				<select value={viewDate.getMonth()} onChange={handleMonthChange}>
					<option value={0} disabled={!isMonthAllowed(viewDate, 0, minDate, maxDate)}>
						January
					</option>
					<option value={1} disabled={!isMonthAllowed(viewDate, 1, minDate, maxDate)}>
						February
					</option>
					<option value={2} disabled={!isMonthAllowed(viewDate, 2, minDate, maxDate)}>
						March
					</option>
					<option value={3} disabled={!isMonthAllowed(viewDate, 3, minDate, maxDate)}>
						April
					</option>
					<option value={4} disabled={!isMonthAllowed(viewDate, 4, minDate, maxDate)}>
						May
					</option>
					<option value={5} disabled={!isMonthAllowed(viewDate, 5, minDate, maxDate)}>
						June
					</option>
					<option value={6} disabled={!isMonthAllowed(viewDate, 6, minDate, maxDate)}>
						July
					</option>
					<option value={7} disabled={!isMonthAllowed(viewDate, 7, minDate, maxDate)}>
						August
					</option>
					<option value={8} disabled={!isMonthAllowed(viewDate, 8, minDate, maxDate)}>
						September
					</option>
					<option value={9} disabled={!isMonthAllowed(viewDate, 9, minDate, maxDate)}>
						October
					</option>
					<option value={10} disabled={!isMonthAllowed(viewDate, 10, minDate, maxDate)}>
						November
					</option>
					<option value={11} disabled={!isMonthAllowed(viewDate, 11, minDate, maxDate)}>
						December
					</option>
				</select>
			</div>
			<div>
				<select value={viewDate.getFullYear()} onChange={handleYearChange}>
					{years.map((year) => (
						<option key={year}>{year}</option>
					))}
				</select>
			</div>
			<div>
				<button type="button" onClick={goToNextMonth} onDoubleClick={preventDefaultAndStopPropagation}>
					&rarr;
				</button>
			</div>
		</StyledNav>
	);
};

const StyledNav = styled.nav`
	display: flex;
	align-items: center;
	flex-wrap: nowrap;
	width: 100%;

	> div {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		position: relative;

		&:nth-child(2) {
			flex: 1;
		}

		> button {
			outline: none;
			text-decoration: none;
			position: relative;
			appearance: none;
			box-sizing: border-box;

			cursor: pointer;
			border: 1px solid transparent;

			text-align: center;
			text-overflow: ellipsis;
			white-space: nowrap;
			word-wrap: break-word;
			overflow: hidden;
			${({dayInMonthCss}) => css(dayInMonthCss)}
		}

		> select {
			display: block;
			font-size: 1rem;
			font-family: unset;
			font-weight: 600;
			color: #444;
			line-height: 1.3;
			padding: 0.6em 1.4em 0.5em 0.8em;
			width: 100%;
			height: auto;
			box-sizing: border-box;
			margin: 0;
			border: none;
			box-shadow: none;
			appearance: none;
			border-radius: 0;
			background: transparent;
			word-spacing: normal;
			outline: none;
			overflow: hidden;

			text-shadow: none;
			cursor: pointer;
			white-space: pre;
			align-items: center;
			text-align: start;
			text-indent: 0;
			letter-spacing: normal;
			text-rendering: optimizeSpeed;

			${({dayInMonthCss}) => css(dayInMonthCss)}
		}
	}
`;

export default Nav;
