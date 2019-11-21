/* eslint react/no-array-index-key: 0 */
import React, {useContext} from 'react';
import styled, {css} from 'styled-components';
import DatePickerContext from './DatePickerContext';

const DayNames = function() {
	const {firstDayOfWeek, dayNameCss} = useContext(DatePickerContext);

	const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S', 'S', 'M', 'T', 'W', 'T', 'F', 'S'];
	return (
		<StyledDayNames dayNameCss={dayNameCss}>
			{dayNames.slice(firstDayOfWeek, 7 + firstDayOfWeek).map((d, i) => (
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
