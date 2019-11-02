import React, {useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {isArray} from '../../src/util/helpers';
import DocsSubTitle from './DocsSubTitle';
import Tabs from './Tabs';

const StyledTypes = styled.div`
	display: inline-block;
`;

const StyledType = styled.code`
	display: inline-block;
	vertical-align: middle;
	background: ${({theme}) => theme.codeBackground};
	color: ${({theme}) => theme.codeColor};
	padding: 0.15rem;
	margin-right: 0.25rem;
	border-radius: 3px;
`;

const Description = styled.div`
	display: block;
	width: 100%;
	line-height: 1.4;
	margin: 0.5rem 0;

	p {
		line-height: 1.4;
	}

	code {
		background: ${({theme}) => theme.codeBackground};
		color: ${({theme}) => theme.codeColor};
	}
`;

const StyledDefault = styled.div`
	display: block;
	margin-top: 0.5rem;
	font-size: 0.9rem;
	color: ${({theme}) => theme.primaryColor};

	code {
		display: inline-block;
		margin-left: 1rem;
		background: ${({theme}) => theme.codeBackground};
		color: ${({theme}) => theme.codeColor};
	}
`;

const StyledExpander = styled.tr`
	td {
		text-align: center !important;
	}

	&:hover {
		td {
			background: transparent !important;
		}
	}
`;

// ------------------------------------------- PROPS -------------------------------------------

const VIEW_MAIN = 'main';
const VIEW_ADDITIONAL = 'additional';
const VIEW_ADVANCED = 'advanced';

const Props = function(props) {
	const {children, hash, title} = props;

	const additional = [
		'm',
		'mt',
		'mr',
		'mb',
		'ml',
		'p',
		'pt',
		'pr',
		'pb',
		'pl',
		'top',
		'right',
		'bottom',
		'left',
		'style'
	];
	const advanced = ['as', 'ref'];

	const additionalJsx = [];
	const advancedJsx = [];
	const mainJsx = [];

	React.Children.forEach(children, (el) => {
		if (React.isValidElement(el)) {
			const {name} = el.props;

			if (additional.indexOf(name) >= 0) {
				additionalJsx.push(el);
			} else if (advanced.indexOf(name) >= 0) {
				advancedJsx.push(el);
			} else {
				mainJsx.push(el);
			}
		}
	});

	let defaultView = null;

	if (mainJsx.length > 0) {
		defaultView = VIEW_MAIN;
	} else if (advancedJsx.length > 0) {
		defaultView = VIEW_ADVANCED;
	} else if (additionalJsx.length > 0) {
		defaultView = VIEW_ADDITIONAL;
	}

	const [view, setView] = useState(defaultView);

	const switchToMain = useCallback(() => setView(VIEW_MAIN), []);
	const switchToAdditional = useCallback(() => setView(VIEW_ADDITIONAL), []);
	const switchToAdvanced = useCallback(() => setView(VIEW_ADVANCED), []);

	return (
		<Wrapper>
			<DocsSubTitle hash={hash}>{title}</DocsSubTitle>
			{view !== null && (
				<Tabs>
					{mainJsx.length > 0 && (
						<Tabs.Tab active={view === VIEW_MAIN} onClick={switchToMain}>
							Main props
						</Tabs.Tab>
					)}
					{additionalJsx.length > 0 && (
						<Tabs.Tab active={view === VIEW_ADDITIONAL} onClick={switchToAdditional}>
							Additional props
						</Tabs.Tab>
					)}
					{advancedJsx.length > 0 && (
						<Tabs.Tab active={view === VIEW_ADVANCED} onClick={switchToAdvanced}>
							Advanced props
						</Tabs.Tab>
					)}
				</Tabs>
			)}
			<Table>
				<thead>
					<tr>
						<th>name</th>
						<th>default</th>
						<th>required</th>
					</tr>
				</thead>
				<tbody>
					{view === VIEW_MAIN && mainJsx}
					{view === VIEW_ADDITIONAL && additionalJsx}
					{view === VIEW_ADVANCED && advancedJsx}
				</tbody>
			</Table>
		</Wrapper>
	);
};

Props.propTypes = {
	children: PropTypes.node.isRequired,
	hash: PropTypes.string,
	title: PropTypes.string
};

Props.defaultProps = {
	hash: 'props',
	title: 'Props'
};

const Wrapper = styled.div`
	display: block;
	width: 100%;
	min-height: 180px;
	overflow-x: auto;
	margin: 1rem 0;
`;

const Table = styled.table`
	width: 100%;
	table-layout: fixed;
	border-collapse: collapse;

	> thead > tr > th {
		padding: 1rem;
		font-size: 0.8rem;

		&:nth-child(1) {
			width: 33%;
			text-align: left;
		}

		&:nth-child(2) {
			text-align: left;
			width: calc(67% - 100px);
		}

		&:nth-child(3) {
			width: 100px;
			text-align: center;
		}
	}
`;

// ------------------------------------------- PROP -------------------------------------------

const Prop = function(props) {
	const {name, type: givenType, defaultValue, children, required} = props;
	const [expanded, setExpanded] = useState(false);
	const toggle = useCallback(() => setExpanded(!expanded), [expanded]);

	let description = children;
	let type = givenType;

	if (description === null) {
		switch (name) {
			case 'style':
				description = 'If needed, pass any valid CSS as Javascript object.';
				break;

			case 'm':
				description =
					"If set, it'll define margin for the component. If passed as number, it'll be used as pixels, otherwise, it'll be used as is.";
				break;

			case 'mt':
				description =
					"If set, it'll define margin-top for the component. If passed as number, it'll be used as pixels, otherwise, it'll be used as is. Ignored if \"m\" is set.";
				break;

			case 'mr':
				description =
					"If set, it'll define margin-right for the component. If passed as number, it'll be used as pixels, otherwise, it'll be used as is. Ignored if \"m\" is set.";
				break;

			case 'mb':
				description =
					"If set, it'll define margin-bottom for the component. If passed as number, it'll be used as pixels, otherwise, it'll be used as is. Ignored if \"m\" is set.";
				break;

			case 'ml':
				description =
					"If set, it'll define margin-left for the component. If passed as number, it'll be used as pixels, otherwise, it'll be used as is. Ignored if \"m\" is set.";
				break;

			case 'p':
				description =
					"If set, it'll define padding for the component. If passed as number, it'll be used as pixels, otherwise, it'll be used as is.";
				break;

			case 'pt':
				description =
					"If set, it'll define padding-top for the component. If passed as number, it'll be used as pixels, otherwise, it'll be used as is. Ignored if \"p\" is set.";
				break;

			case 'pr':
				description =
					"If set, it'll define padding-right for the component. If passed as number, it'll be used as pixels, otherwise, it'll be used as is. Ignored if \"p\" is set.";
				break;

			case 'pb':
				description =
					"If set, it'll define padding-bottom for the component. If passed as number, it'll be used as pixels, otherwise, it'll be used as is. Ignored if \"p\" is set.";
				break;

			case 'pl':
				description =
					"If set, it'll define padding-left for the component. If passed as number, it'll be used as pixels, otherwise, it'll be used as is. Ignored if \"p\" is set.";
				break;

			case 'as':
				description =
					'It\'ll be passed down to styled component so the tag will be switched by the value given as "as" prop. For example, you can pass "span" and component will be rendered as span tag, or you can pass {NavLink} from React router in order to use it\'s features.';
				break;

			case 'ref':
				description = "If set, you'll be able to access component's inner element.";
				break;

			// no default
		}
	}

	if (type === null) {
		switch (name) {
			case 'style':
				type = 'object';
				break;

			case 'm':
				type = ['string', 'number'];
				break;

			case 'mt':
				type = ['string', 'number'];
				break;

			case 'mr':
				type = ['string', 'number'];
				break;

			case 'mb':
				type = ['string', 'number'];
				break;

			case 'ml':
				type = ['string', 'number'];
				break;

			case 'p':
				type = ['string', 'number'];
				break;

			case 'pt':
				type = ['string', 'number'];
				break;

			case 'pr':
				type = ['string', 'number'];
				break;

			case 'pb':
				type = ['string', 'number'];
				break;

			case 'pl':
				type = ['string', 'number'];
				break;

			case 'as':
				type = ['string', 'element'];
				break;

			case 'ref':
				type = ['func', 'object'];
				break;

			case 'onClick':
			case 'onDoubleClick':
				type = ['func'];
				break;

			// no default
		}
	}

	return (
		<>
			<FirstTr onClick={toggle} hasDescription={!!description}>
				<Cell>
					<div>
						<code>{name}</code>
					</div>
					{isArray(type) ? (
						type.map((t) => (
							<code key={t} className="type">
								{t}
							</code>
						))
					) : (
						<code className="type">{type}</code>
					)}
				</Cell>
				{!required ? (
					<Cell>
						{defaultValue === null && <code>null</code>}
						{defaultValue === true && <code>true</code>}
						{defaultValue === false && <code>false</code>}
						{defaultValue !== null && defaultValue !== true && defaultValue !== false && <code>{defaultValue}</code>}
					</Cell>
				) : (
					<Cell />
				)}
				<RequiredCell required={required}>{required ? 'yes' : 'no'}</RequiredCell>
			</FirstTr>
			{description && expanded && (
				<LastTr>
					<Cell colSpan={3}>{description}</Cell>
				</LastTr>
			)}
		</>
	);
};

Prop.propTypes = {
	children: PropTypes.node,
	name: PropTypes.string.isRequired,
	type: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
	defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.node]),
	required: PropTypes.bool
};

Prop.defaultProps = {
	defaultValue: null,
	required: false,
	children: null,
	type: null
};

const Cell = styled.td`
	code {
		font-feature-settings: normal;
		font-family: ibm-plex-mono, Menlo, Monaco, OperatorMono-Book, monospace;
		background-color: rgb(243, 244, 243);
		padding: 2px 4px;
		display: inline-block;
		overflow-wrap: normal;
		border-radius: 3px;
		font-size: 0.88em;
		margin: 2px;

		&.type {
			font-size: 0.7rem;
			background-color: transparent;
			color: #999999;
			font-weight: bold;
		}
	}
`;

const RequiredCell = styled.td`
	text-align: center;
	padding: 1rem;
	color: ${({required}) => (required ? 'red' : '#5d88d0')};
`;

const FirstTr = styled.tr`
	> td {
		border-top: 1px solid #efefef;
		padding: 0.5rem;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}

	&:hover {
		> td {
			background-color: #efefef;
			cursor: ${({hasDescription}) => (hasDescription ? 'pointer' : 'default')};
		}
	}
`;

const LastTr = styled.tr`
	> td {
		border-bottom: 1px solid #efefef;
		padding: 1rem;
		font-weight: 300;
		line-height: 1.2;

		p {
			display: block;
			margin: 0;
			padding: 0;
			line-height: 1.5;
		}

		> code,
		> p > code {
			font-size: 0.8em;
			border: 1px solid #efefef;

			&:hover {
				border: 1px solid #bfbfbf;
			}
		}
	}
`;

Props.Prop = Prop;

export default Props;
