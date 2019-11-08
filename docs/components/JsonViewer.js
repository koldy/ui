import React, {Fragment, useContext, useState, useRef, useCallback} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Flexbox from '../../src/components/Flexbox/Flexbox';
import Button from '../../src/components/Button/Button';
import DocsContext from './DocsContext';
import ThemeContext from '../../src/theme/ThemeContext';
import ThemeManager from '../../src/theme/ThemeManager';

const VIEW_JSON = 'json';
const VIEW_ALL = 'all';

const JsonViewer = function(props) {
	const {onClose} = props;

	const inputRef = useRef(null);

	const [view, setView] = useState(VIEW_JSON);
	const {json: jsonKey, setThemeManager} = useContext(DocsContext);
	const {theme} = useContext(ThemeContext);
	const json = theme.json(jsonKey);

	const handleJsonSubmit = useCallback(() => {
		const {value} = inputRef.current;

		const newJson = theme.json();
		try {
			newJson[jsonKey] = JSON.parse(value);

			// all good, apply
			setThemeManager(
				new ThemeManager({
					json: newJson,
					mode: 'debug'
				})
			);

			onClose();
		} catch (e) {
			alert(e.message);
		}
	}, [setThemeManager, jsonKey, theme, onClose]);

	const handleAllSubmit = useCallback(() => {
		const {value} = inputRef.current;

		let newJson = theme.json();
		try {
			newJson = JSON.parse(value);

			// all good, apply
			setThemeManager(
				new ThemeManager({
					json: newJson,
					mode: 'debug'
				})
			);

			onClose();
		} catch (e) {
			alert(e.message);
		}
	}, [setThemeManager, theme, onClose]);

	const handleApply = useCallback(() => {
		switch (view) {
			case VIEW_JSON:
				handleJsonSubmit();
				break;
			case VIEW_ALL:
				handleAllSubmit();
				break;
			// no default
		}
	}, [view]);

	return (
		<Fragment>
			<Flexbox alignItems="center">
				<Flexbox.Item flex={1}>
					<TabLink active={view === VIEW_JSON} onClick={() => setView(VIEW_JSON)}>
						JSON: {jsonKey}
					</TabLink>
					<TabLink active={view === VIEW_ALL} onClick={() => setView(VIEW_ALL)}>
						Whole theme JSON
					</TabLink>
				</Flexbox.Item>
				<Flexbox.Item flex={1} textAlign="right">
					<Button type="button" onClick={handleApply}>
						Apply
					</Button>{' '}
					<Button onClick={onClose}>Close</Button>
				</Flexbox.Item>
			</Flexbox>
			{view === VIEW_JSON && <TextArea defaultValue={JSON.stringify(json, null, '  ')} ref={inputRef} />}
			{view === VIEW_ALL && <TextArea defaultValue={JSON.stringify(theme.json(), null, '  ')} ref={inputRef} />}
		</Fragment>
	);
};

JsonViewer.propTypes = {
	onClose: PropTypes.func.isRequired
};

const TabLink = styled.button`
	display: inline-block;
	vertical-align: middle;
	background: transparent;
	border: none;
	border-bottom: 2px solid ${({theme, active}) => (active ? theme.primaryColor : 'transparent')};
	color: ${({theme}) => theme.black};
	outline: none;
	cursor: pointer;
	padding: 0.25rem 0.4rem;

	&:hover {
		background-color: #efefef;
	}
`;

const TextArea = styled.textarea`
	display: block;
	background: transparent;
	border: 2px solid #cfcfcf;
	border-radius: 0;
	padding: 0.5rem;
	font-size: 1rem;
	font-weight: 400;
	line-height: 1.25;
	color: ${({theme}) => theme.black};
	font-family: 'Courier New', monospace;
	width: 100%;
	height: calc(100vh - 40px);
	outline: none;
`;

export default JsonViewer;
