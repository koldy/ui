import React, {useMemo, useContext, useCallback} from 'react';
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';

import {dateToDateString, dateToYearMonthString, isValidDate} from '../../util/helpers';
import DatePickerContext from './DatePickerContext';

const MonthGrid = function() {
	const {viewDate, firstDayOfWeek} = useContext(DatePickerContext);

	const days = useMemo(() => {
		const l = [];

		// generate the array of all days we need to render
		// to do that, we need to find what date is the first date of week (it can be previous month)

		const firstDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);

		while (firstDate.getDay() !== firstDayOfWeek) {
			firstDate.setDate(firstDate.getDate() - 1);
		}

		for (let i = 0; i < 42; i += 1) {
			// 42 because 6 weeks for 7 days is 42
			const d = new Date(firstDate);
			d.setDate(d.getDate() + i);
			l.push(d);
		}

		return l;
	}, [viewDate, firstDayOfWeek]);

	return (
		<Grid>
			{days.map((d) => (
				<Button key={dateToDateString(d)} date={d} />
			))}
		</Grid>
	);
};

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(7, 1fr);
`;

const Button = function(props) {
	const {date} = props;
	const {viewDate, dayInMonthCss, dayOutOfMonthCss, selectedDate, pickDate, disabled, minDate, maxDate} = useContext(DatePickerContext);

	const [inMonth, isSelected, isDisabled] = useMemo(() => {
		let outOfRange = false;

		const tmpDate = new Date(date);
		tmpDate.setHours(0);
		tmpDate.setMinutes(0);
		tmpDate.setSeconds(0);
		tmpDate.setMilliseconds(0);

		// check if date is out of range
		// check if date is lower than min date
		const tmpMinDate = new Date(minDate);
		tmpMinDate.setHours(0);
		tmpMinDate.setMinutes(0);
		tmpMinDate.setSeconds(0);
		tmpMinDate.setMilliseconds(0);

		if (tmpDate.getTime() < tmpMinDate.getTime()) {
			outOfRange = true;
		}

		if (!outOfRange) {
			// check if date is greater than min date
			const tmpMaxDate = new Date(maxDate);
			tmpMaxDate.setHours(0);
			tmpMaxDate.setMinutes(0);
			tmpMaxDate.setSeconds(0);
			tmpMaxDate.setMilliseconds(0);

			if (tmpDate.getTime() > tmpMaxDate.getTime()) {
				outOfRange = true;
			}
		}

		return [
			/* in month: */ dateToYearMonthString(date) === dateToYearMonthString(viewDate),
			/* is selected: */ isValidDate(selectedDate) && dateToDateString(selectedDate) === dateToDateString(date),
			/* is disabled: */ disabled || outOfRange
		];
	}, [date, viewDate, selectedDate, disabled, minDate, maxDate]);

	const handleClick = useCallback(
		(e) => {
			e.preventDefault();
			e.stopPropagation();
			pickDate(date);
		},
		[date, pickDate]
	);

	return (
		<StyledButton
			inMonth={inMonth}
			dayInMonthCss={dayInMonthCss}
			dayOutOfMonthCss={dayOutOfMonthCss}
			className={isSelected ? 'selected' : undefined}
			onClick={handleClick}
			disabled={isDisabled}
		>
			{date.getDate()}
		</StyledButton>
	);
};

Button.propTypes = {
	date: PropTypes.instanceOf(Date).isRequired
};

const StyledButton = styled.button`
	display: block;
	background: transparent;
	border: none;
	text-align: center;
	cursor: pointer;
	${({inMonth, dayInMonthCss, dayOutOfMonthCss}) => (inMonth ? css(dayInMonthCss) : css(dayOutOfMonthCss))}
`;

export default MonthGrid;
