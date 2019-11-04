import React, {useState, useCallback, useMemo, useContext} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Prism from 'prismjs';

import {copyToClipboard} from './helpers';
import {getStyleForWidth} from '../../src/util/helpers';
import DocsContext from './DocsContext';

const DocsCode = function(props) {
	const {defaultView, children, label, labelWidth} = props;

	const {isDark} = useContext(DocsContext);
	const [view, setView] = useState(defaultView);

	let example = null;
	let code = null;

	for (const child of React.Children.toArray(children)) {
		if (React.isValidElement(child)) {
			if (typeof child.props.children === 'string') {
				code = child;
			} else if (typeof child.props.children === 'object') {
				example = child;
			}
		}
	}

	let allSwitches = true;
	let realView = view;
	if (!!example && !code) {
		realView = 'example';
		allSwitches = false;
	} else if (!example && !!code) {
		realView = 'code';
		allSwitches = false;
	}

	const switchToExample = useCallback((e) => {
		e.preventDefault();
		e.stopPropagation();
		setView('example');
	}, []);

	const switchToCode = useCallback((e) => {
		e.preventDefault();
		e.stopPropagation();
		setView('code');
	}, []);

	if (label && labelWidth) {
		const style = getStyleForWidth(labelWidth === 'auto' ? '150px' : labelWidth);

		return (
			<Flex>
				<div style={style}>
					<Label>{label}</Label>
				</div>
				<RightContent>
					{allSwitches && (
						<Switcher>
							<SwitchOption onClick={switchToExample} active={realView === 'example'}>
								Example
							</SwitchOption>
							<SwitchOption onClick={switchToCode} active={realView === 'code'}>
								Code
							</SwitchOption>
						</Switcher>
					)}
					<VisualExample isDark={isDark}>{realView === 'example' && example}</VisualExample>
					<Content>{realView === 'code' && code}</Content>
				</RightContent>
			</Flex>
		);
	}

	return (
		<Wrapper>
			{label && <Label>{label}</Label>}
			{allSwitches && (
				<Switcher>
					<SwitchOption onClick={switchToExample} active={realView === 'example'}>
						Example
					</SwitchOption>
					<SwitchOption onClick={switchToCode} active={realView === 'code'}>
						Code
					</SwitchOption>
				</Switcher>
			)}
			<VisualExample isDark={isDark}>{realView === 'example' && example}</VisualExample>
			<Content>{realView === 'code' && code}</Content>
		</Wrapper>
	);
};

DocsCode.propTypes = {
	children: PropTypes.node.isRequired,
	defaultView: PropTypes.oneOf(['code', 'example']),
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	labelWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

DocsCode.defaultProps = {
	defaultView: 'example',
	label: null,
	labelWidth: null
};

const Wrapper = styled.div`
	display: block;
	margin: 1.5rem 0;
	width: 100%;
`;

const Flex = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	margin: 1rem;
`;

const RightContent = styled.div`
	flex: 1;
	padding: 0 0.75rem;
`;

const VisualExample = styled.div`
	display: block;
	background: ${({isDark}) => (isDark ? '#282828' : '#ffffff')};

	> * {
		vertical-align: middle;
	}
`;

const Content = styled.div`
	display: block;
`;

const Switcher = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
`;

const SwitchOption = styled.div`
	display: block;
	width: auto;
	border: none;
	border-bottom: 2px solid ${({active}) => (active ? 'black' : 'transparent')};
	margin: 0 0.25em;
	padding: 0.1rem 0.4rem;
	cursor: ${({active}) => (active ? 'default' : 'pointer')};
`;

const Label = styled.p`
	padding: 0.1rem 0.5rem;
	line-height: normal;
	font-weight: 400;
	font-family: monospace;
`;

// define working example
DocsCode.Example = function(props) {
	const {children} = props;
	return <WrappedExample>{children}</WrappedExample>;
};

DocsCode.Example.propTypes = {
	children: PropTypes.node.isRequired
};

const WrappedExample = styled.div`
	display: block;
	padding: 1rem;
	border: 1px solid #dfdfdf;
	border-radius: 4px;
	margin-top: 9px;
`;

// define string for showing the code
DocsCode.Code = function(props) {
	const {children} = props;

	const [cleanCode, html] = useMemo(() => {
		const string = children.split('\n');
		let firstLine = string[0];

		if (firstLine.length === 0 && !!string[1]) {
			firstLine = string[1];
		}

		let indent = 0;
		for (let i = 0, found = false; !found && i < firstLine.length; i++) {
			if (firstLine.charAt(i) === ' ' || firstLine.charAt(i) === '\t') {
				indent += 1;
			} else {
				found = true;
			}
		}

		const code = [];
		for (const [i, line] of string.entries()) {
			let proceed = true;

			if (i === 0 && line.length === 0) {
				proceed = false;
			}

			if (i === string.length - 1 && line.length === 0) {
				proceed = false;
			}

			if (proceed) {
				code.push(line.substr(indent, line.length - indent));
			}
		}

		const cc = code.join('\n');

		return [cc, Prism.highlight(cc, Prism.languages.javascript, 'javascript')];
	}, [children]);

	const handleCopy = useCallback(
		(e) => {
			e.preventDefault();
			e.stopPropagation();

			copyToClipboard(cleanCode);
		},
		[cleanCode]
	);

	return (
		<Pre className="language-javascript" onDoubleClick={handleCopy}>
			<code className="language-javascript" dangerouslySetInnerHTML={{__html: html}} />
		</Pre>
	);
};

DocsCode.Code.propTypes = {
	children: PropTypes.string.isRequired
};

const Pre = styled.pre`
	display: block;
	font-size: 1rem !important;

	> code {
		font-size: 0.85rem !important;
	}
`;

export default DocsCode;
