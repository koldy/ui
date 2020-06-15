import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {isObject} from '../../src/util/helpers';
import {copyToClipboard, trim} from '../util/helpers';

const AvailableKeys = function({data = {}, name = null, hideLabel = false}) {
	const keys = isObject(data) ? Object.keys(data) : data;

	const copy = useCallback((e) => copyToClipboard(trim(e.currentTarget.innerHTML)), []);

	if (hideLabel) {
		return (
			<StyledInlineKeys>
				{keys.map((key) => (
					<code key={key} onClick={copy} title="Click to copy">
						{key}
					</code>
				))}
			</StyledInlineKeys>
		);
	}

	return (
		<StyledAvailableKeys>
			{keys.length === 0 && (
				<>
					There are no available values in current theme
					{name !== null && (
						<>
							{' '}
							in <code>{name}</code>
						</>
					)}
					.
				</>
			)}
			{keys.length > 0 && (
				<>
					In current theme
					{name && (
						<>
							{' '}
							in <code>{name}</code>
						</>
					)}
					, available values are:{' '}
					{keys.map((key) => (
						<code key={key} onClick={copy} title="Click to copy">
							{key}
						</code>
					))}
				</>
			)}
		</StyledAvailableKeys>
	);
};

AvailableKeys.propTypes = {
	// eslint-disable-next-line
	data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	name: PropTypes.string,
	hideLabel: PropTypes.bool
};

const StyledAvailableKeys = styled.p`
	display: block;
	text-align: start;

	code {
		display: inline-block;
		margin: 0 3px;
		border-bottom: 1px solid #666666;
		border-radius: 0 !important;
		color: #ea8786;

		&:hover {
			cursor: copy;
			border-bottom-color: #a81817;
			color: #a4201f;
		}
	}
`;

const StyledInlineKeys = styled.span`
	display: inline;

	code {
		display: inline-block;
		margin: 0 3px;
		border-bottom: 1px solid #666666;
		border-radius: 0 !important;
		color: #ea8786;

		&:hover {
			cursor: copy;
			border-bottom-color: #a81817;
			color: #a4201f;
		}
	}
`;

export default AvailableKeys;
