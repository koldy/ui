import React, {Fragment, useCallback, useEffect, useContext, useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {preventDefaultAndStopPropagation} from '../../src/util/helpers';
import DocsContext from './DocsContext';
import Drawer from '../../src/components/Drawer/Drawer';
import JsonViewer from './JsonViewer';

const DocsTitle = function({children, hash}) {
	const handleClick = useCallback(
		(e) => {
			e.preventDefault();
			e.stopPropagation();
			window.location.hash = hash;
		},
		[hash]
	);

	useEffect(() => {
		document.title = `Koldy UI - ${children}`;
	}, [children]);

	const {isDark, setDark, toggleTheme, json} = useContext(DocsContext);
	const [showJson, setShowJson] = useState(false);
	const toggleDarkMode = useCallback(() => setDark(!isDark), [isDark]);
	const openJson = useCallback(() => setShowJson(true), []);
	const hideJson = useCallback(() => setShowJson(false), []);

	return (
		<Fragment>
			{showJson && (
				<Drawer
					onClose={hideJson}
					overlayBackgroundColor="rgba(255, 255, 255, 0.5)"
					backgroundColor="#ffffff"
					position="right"
					size="50%"
				>
					{({closeFn}) => <JsonViewer onClose={closeFn} />}
				</Drawer>
			)}

			<FixedContainer>
				<Flex>
					<H1 onClick={handleClick}>
						<a id={hash} aria-hidden="true" />
						<a href={`#${hash}`} aria-hidden="true" onClick={preventDefaultAndStopPropagation}>
							#
						</a>
						{children}
					</H1>
					<Controls>
						{json && <ControlButton onClick={openJson}>JSON: {json}</ControlButton>}
						<ControlButton onClick={toggleDarkMode}>BG: {isDark ? 'dark' : 'light'}</ControlButton>
						<ControlButton onChange={toggleTheme} as="select" defaultValue={isDark ? 'dark' : 'light'}>
							<option value="light">koldy-ui-light-theme</option>
							<option value="dark">koldy-ui-dark-theme</option>
						</ControlButton>
					</Controls>
				</Flex>
			</FixedContainer>
			<TitleContainer />
		</Fragment>
	);
};

DocsTitle.propTypes = {
	children: PropTypes.string.isRequired,
	hash: PropTypes.string.isRequired
};

const TitleContainer = styled.div`
	display: block;
	width: 100%;
	height: 60px;
`;

const FixedContainer = styled.div`
	display: block;
	position: fixed;
	background: #ffffff;
	z-index: 200;
	width: 100%;
	max-width: calc(100vw - 200px - 2rem);

	@media (min-width: 1130px) {
		max-width: 900px;
	}
`;

const Flex = styled.div`
	display: flex;
	align-items: center;
`;

const Controls = styled.div`
	display: block;
	flex: 1;
	text-align: right;
`;

const H1 = styled.h1`
	display: block;
	position: relative;
	color: ${({theme}) => theme.black};
	font-weight: 700;
	font-size: 1.5rem;
	cursor: pointer;
	flex: 1;

	> a {
		&:first-child {
			position: absolute;
			top: -20px;
			width: 1px;
			height: 1px;
		}

		&:nth-child(2) {
			position: absolute;
			left: -0.9rem;
			color: #5d88d0;
			visibility: hidden;
		}
	}

	&:hover {
		> a {
			&:nth-child(2) {
				visibility: visible;
			}
		}
	}
`;

const ControlButton = styled.button`
	display: inline-block;
	vertical-align: middle;
	padding: 0.3rem 0.5rem;
	font-family: inherit;
	border: 2px solid #3537b8;
	border-radius: 5px;
	background: #5d88d0;
	color: #ffffff;
	cursor: pointer;
	outline: none;
	margin: 2px;
	height: 32px;
	appearance: none;
	font-size: 0.85rem;
	box-sizing: border-box;
	line-height: normal;
`;

export default DocsTitle;
