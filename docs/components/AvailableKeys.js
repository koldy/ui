import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {isObject} from '../../src/util/helpers';

const AvailableKeys = function(props) {
	const {data = {}, name = null} = props;

	const keys = isObject(data) ? Object.keys(data) : data;

	return (
		<StyledAvailableKeys>
			{keys.length === 0 && (
				<Fragment>
					There are no available values in current theme
					{name !== null && (
						<Fragment>
							{' '}
							in <code>{name}</code>
						</Fragment>
					)}
					.
				</Fragment>
			)}
			{keys.length > 0 && (
				<Fragment>
					In current theme
					{name && (
						<Fragment>
							{' '}
							in <code>{name}</code>
						</Fragment>
					)}
					, available values are:{' '}
					{keys.map((key) => (
						<code key={key}>{key}</code>
					))}
				</Fragment>
			)}
		</StyledAvailableKeys>
	);
};

AvailableKeys.propTypes = {
	// eslint-disable-next-line
	data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	name: PropTypes.string
};

const StyledAvailableKeys = styled.p`
	display: block;
`;

export default AvailableKeys;
