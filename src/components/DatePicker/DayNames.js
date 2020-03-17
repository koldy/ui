/* eslint react/no-array-index-key: 0 */
import React, {useContext} from 'react';
import styled, {css} from 'styled-components';
import DatePickerContext from './DatePickerContext';

const DAY_NAMES = ['S', 'M', 'T', 'W', 'T', 'F', 'S', 'S', 'M', 'T', 'W', 'T', 'F', 'S'];

const DayNames = function() {
	const {firstDayOfWeek, dayNameCss} = useContext(DatePickerContext);

	return (
		<StyledDayNames dayNameCss={dayNameCss}>
			{DAY_NAMES.slice(firstDayOfWeek, 7 + firstDayOfWeek).map((d, i) => (
				<span key={`${d}_${i}`}>{d}</span>
			))}
		</StyledDayNames>
	);
};

const StyledDayNames = styled.div`
	display: grid;
	width: 100%;
	grid-template-columns: repeat(7, 1fr);

	> span {
		text-align: center;
		${({dayNameCss}) => css(dayNameCss)}
	}
`;

export default DayNames;
