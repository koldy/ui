/* eslint-disable react/no-array-index-key */
import React, {useRef, useEffect, useCallback, useState, useContext} from 'react';
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';
import Prism from 'prismjs';

import {copyToClipboard, trim} from '../util/helpers';
import DocsContext from '../app/DocsContext';

const VIEW_CODE = 1;
const VIEW_EXAMPLE = 2;

const Code = function({code = null, language, children = null, label = null, showCodeFirst = false}) {
	const codeRef = useRef(null);
	const [view, setView] = useState(() => {
		if (showCodeFirst) {
			return VIEW_CODE;
		}

		return children ? VIEW_EXAMPLE : VIEW_CODE;
	});
	const {theme, themes, setTheme} = useContext(DocsContext);

	useEffect(() => {
		if (view === VIEW_CODE) {
			setTimeout(() => Prism.highlightElement(codeRef.current), 0);
		}
	}, [view]);

	const copy = useCallback(() => copyToClipboard(trim(code)), [code]);

	const switchToCode = useCallback(() => setView(VIEW_CODE), []);
	const switchToExample = useCallback(() => setView(VIEW_EXAMPLE), []);

	if (children || label) {
		return (
			<Wrapper>
				<Actions hasLabel={!!label}>
					<aside>{label}</aside>
					{children && code && (
						<nav>
							<button type="button" className={view === VIEW_EXAMPLE ? 'active' : 'undefined'} onClick={switchToExample} tabIndex="-1">
								Example
							</button>
							<button type="button" className={view === VIEW_CODE ? 'active' : 'undefined'} onClick={switchToCode} tabIndex="-1">
								Code
							</button>
						</nav>
					)}
				</Actions>
				{view === VIEW_CODE && (
					<Pre className="line-numbers">
						<code className={`language-${language}`} ref={codeRef} title="Click to copy" onClick={copy}>
							{trim(code)}
						</code>
					</Pre>
				)}
				{view === VIEW_EXAMPLE && (
					<Example theme={theme}>
						<nav>
							{themes.map((t, i) => (
								<button
									key={i}
									type="button"
									onClick={() => setTheme(i)}
									title={t.json('name')}
									tabIndex="-1"
									style={{backgroundColor: t.json('themeColor') || '#ffffff'}}
								/>
							))}
						</nav>
						<div>{children}</div>
					</Example>
				)}
			</Wrapper>
		);
	}

	return (
		<Pre className="line-numbers">
			<code className={`language-${language}`} ref={codeRef} title="Click to copy" onClick={copy}>
				{trim(code)}
			</code>
		</Pre>
	);
};

Code.propTypes = {
	code: PropTypes.string,
	language: PropTypes.oneOf(['bash', 'js']).isRequired,
	children: PropTypes.node,
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	showCodeFirst: PropTypes.bool
};

const Wrapper = styled.div`
	display: block;
`;

const Actions = styled.div`
	display: flex;
	align-items: flex-end;

	> aside {
		flex: 1;
		font-size: 0.9rem;

		&:before {
			${({hasLabel}) => (hasLabel ? 'content: "• ";' : '')};
		}
	}

	> nav {
		width: 200px;
		padding: 0 0.66rem;
		text-align: right;
		margin-bottom: -0.5rem;

		> button {
			width: auto;
			border: none;
			color: #cfcfcf;
			margin: 0 0.33rem;
			padding: 0.4rem 0.8rem;
			font-size: 0.88em;
			box-sizing: border-box;
			background: transparent;
			outline: none;
			cursor: pointer;
			border-top-left-radius: 4px;
			border-top-right-radius: 4px;

			&.active {
				background: #130706;
			}
		}
	}
`;

const Pre = styled.pre`
	display: block;
	background: #130706;
	padding: 1.5rem;
	border-radius: 0.6rem;
	margin: 0.5rem 0;
	box-sizing: border-box;
	overflow-x: auto;

	> code {
		&:hover {
			cursor: copy;
		}

		.token {
			&.keyword {
				color: hsl(53, 89%, 79%);
			}
			&.operator,
			&.string {
				color: hsl(76, 21%, 52%);
			}
			&.punctuation {
				opacity: 0.7;
			}
			&.comment {
				opacity: 0.5;
			}
			&.class-name {
				color: hsl(223, 89%, 79%);
			}
		}
	}
`;

const Example = styled.div`
	border: 3px solid #130706;
	border-radius: 10px;
	margin: 0.5rem 0;
	box-sizing: border-box;
	position: relative;

	> div {
		padding: 1.25rem;
	}

	> nav {
		top: 0;
		right: 0;
		position: absolute;

		> button {
			display: inline-block;
			margin: 2px;
			width: 16px;
			height: 16px;
			border-radius: 100%;
			border: 1px solid;
			outline: none;
			cursor: pointer;

			&:first-child {
				border-color: #000000;
				background: #ffffff;
			}

			&:last-child {
				border-color: #ffffff;
				background: #000000;
			}
		}
	}

	${({theme}) => css(theme.json('html'))}
	${({theme}) => css(theme.json('body'))}
`;

export default Code;
