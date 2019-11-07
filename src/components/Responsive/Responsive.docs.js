import React, {Fragment, useContext} from 'react';
import DocsTitle from '../../../docs/components/DocsTitle';
import styled from 'styled-components';

import ThemeContext from '../../theme/ThemeContext';

import Props from '../../../docs/components/Props';
import DocsSubTitle from '../../../docs/components/DocsSubTitle';
import DocsText from '../../../docs/components/DocsText';
import ImportComponent from '../../../docs/components/ImportComponent';
import DocsCode from '../../../docs/components/DocsCode';
import AvailableKeys from '../../../docs/components/AvailableKeys';
import useResponsive from './useResponsive';
import Badge from '../Badge/Badge';
import {isNumberOrString} from '../../util/helpers';

export const title = 'useResponsive';
export const slug = 'use-responsive';
export const json = 'breakpoints';

export const Documentation = function() {
	const {theme} = useContext(ThemeContext);

	const breakpoints = theme.json('breakpoints');
	const data = useResponsive();

	return (
		<>
			<DocsTitle hash="badge">useResponsive</DocsTitle>
			<ImportComponent name="useResponsive" />
			<DocsText>
				<code>useResponsive</code> is a hook that parses your breakpoints definition in the theme, plus it gives you
				other useful data. Koldy UI parses that on every window resize event providing you with new data. Don't worry if
				you use this hook a lot, calculation on resize will happen only once.
			</DocsText>
			<DocsText>In current theme, this is what you'll get:</DocsText>
			<DocsCode>
				<DocsCode.Example>
					<Table>
						<tbody>
							{Object.keys(data).map((key) => (
								<tr key={key}>
									<td>{key}</td>
									<td>
										{data[key] === true && <True>true</True>}
										{data[key] === false && <False>false</False>}
										{isNumberOrString(data[key]) ? <Fragment>{data[key]}</Fragment> : ''}
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				</DocsCode.Example>
				<DocsCode.Code>
					{`
					const {innerWidth, innerHeight, portrait, landscape, square, aspectRatio} = useResponsive();
					// and other keys that start with: is...
					`}
				</DocsCode.Code>
			</DocsCode>
			<DocsText>
				These numbers are dynamic. Try to resize your screen (or rotate your phone) to see new numbers.
			</DocsText>
			<DocsSubTitle hash="breakpoints">Breakpoints</DocsSubTitle>
			<DocsText>
				Remember that breakpoints in theme are just helpers. You can set as many as you want. The value of each
				breakpoint is standard CSS media query which can be used with <code>window.matchMedia</code>. The name of each
				breakpoint will be prefixed with <code>is</code>. So, if you named you breakpoint <code>xlg</code>, you'll be
				able to get <code>isXlg</code>. Prefix <code>is</code> tells you that you'll always get boolean, unless browser
				doesn't support <code>window.matchMedia</code>.
			</DocsText>
			<DocsText>
				<AvailableKeys data={breakpoints} />
			</DocsText>
		</>
	);
};

const Table = styled.table`
	width: 100%;

	> tbody {
		> tr {
			> td {
				font-size: 0.9rem;
				padding: 10px;

				&:first-child {
					width: 140px;
				}
			}
		}
	}
`;

const True = styled.span`
	font-size: 0.8rem;
	padding: 7px;
	color: white;
	background: green;
`;

const False = styled.span`
	font-size: 0.8rem;
	padding: 7px;
	color: white;
	background: red;
`;
