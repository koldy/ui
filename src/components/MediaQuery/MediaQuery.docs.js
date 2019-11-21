import React, {useContext} from 'react';
import styled from 'styled-components';

import ThemeContext from '../../theme/ThemeContext';

import DocsTitle from '../../../docs/components/DocsTitle';
import DocsSubTitle from '../../../docs/components/DocsSubTitle';
import DocsText from '../../../docs/components/DocsText';
import ImportComponent from '../../../docs/components/ImportComponent';
import DocsCode from '../../../docs/components/DocsCode';
import AvailableKeys from '../../../docs/components/AvailableKeys';
import useMediaQueries from './useMediaQueries';
import {isNumberOrString} from '../../util/helpers';

export const title = 'useMediaQueries';
export const slug = 'use-media-queries';
export const json = 'mediaQueries';

export const Documentation = function() {
	const {theme} = useContext(ThemeContext);

	const mediaQueries = theme.json('mediaQueries');
	const data = useMediaQueries();

	return (
		<>
			<DocsTitle hash="use-media-queries">useMediaQueries</DocsTitle>
			<ImportComponent name="useMediaQueries" />
			<DocsText>
				<code>useMediaQueries</code> is a hook that parses your media queries definition in the theme, plus it gives you other standard
				useful data. Koldy UI parses that on every window resize event providing you with new data. Don't worry if you use this hook a lot,
				calculation on resize will happen only once.
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
										{isNumberOrString(data[key]) ? <>{data[key]}</> : ''}
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				</DocsCode.Example>
				<DocsCode.Code>
					{`
					const {innerWidth, innerHeight, portrait, landscape, square, aspectRatio} = useMediaQueries();
					// and other keys that start with: is...
					`}
				</DocsCode.Code>
			</DocsCode>
			<DocsText>These numbers are dynamic. Try to resize your screen (or rotate your phone) to see new numbers.</DocsText>
			<DocsSubTitle hash="media-queries">Media queries in theme's JSON</DocsSubTitle>
			<DocsText>
				Remember that media queries in theme are just helpers. You can set as many as you want. The value of each media query is standard
				CSS media query which can be used with <code>window.matchMedia</code>. The name of each media query will be prefixed with{' '}
				<code>is</code>. So, if you named you media query <code>xlg</code>, you'll be able to get <code>isXlg</code>. Prefix <code>is</code>{' '}
				tells you that you'll always get boolean, unless browser doesn't support <code>window.matchMedia</code>.
			</DocsText>
			<DocsText>
				<AvailableKeys data={mediaQueries} />
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
