import React, {forwardRef} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {getPixelsOrString, getStyleForMargins} from '../../util/helpers';

/**
 * Column layout is simple component for creating multi-column layouts that know how to "break" on small screens. This is multipurpose component,
 * but its main purpose is for creating two or multi column content. Width of each column can be defined. Since this component
 * is not made of flexbox, the "flex" space should be defined in "fr" units.
 */
const ColumnLayout = forwardRef(function(props, ref) {
	const {
		children,
		breakOn = false,
		space = '0',
		gridTemplateColumns = null,
		m = null,
		mt = null,
		mr = null,
		mb = null,
		ml = null,
		align: givenAlign = 'stretch',
		...otherProps
	} = props;

	let align = givenAlign;

	const columnsCount = React.Children.count(children);

	if (['stretch', 'start', 'end', 'center'].indexOf(givenAlign) === -1) {
	  align = 'stretch';
  }

	return (
		<StyledColumnLayout
			columnsCount={columnsCount}
			hasColumns={!breakOn}
			space={space}
			gridTemplateColumns={gridTemplateColumns}
			style={{...getStyleForMargins({m, mt, mr, mb, ml})}}
			align={align}
      ref={ref}
			{...otherProps}
		>
			{React.Children.map(children, (child) => (
				<div>{child}</div>
			))}
		</StyledColumnLayout>
	);
});

ColumnLayout.propTypes = {
	children: PropTypes.node,
	breakOn: PropTypes.bool,
	space: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	gridTemplateColumns: PropTypes.string,
	align: PropTypes.oneOf(['stretch', 'start', 'end', 'center']),

	m: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	mt: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	mr: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	mb: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	ml: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

const StyledColumnLayout = styled.div`
	display: ${({hasColumns}) => (hasColumns ? 'grid' : 'block')};
	margin: 0;
	padding: 0;
	font-size: 1rem;
	width: 100%;
	grid-template-columns: ${({hasColumns, columnsCount, gridTemplateColumns}) =>
		hasColumns ? gridTemplateColumns || `repeat(${columnsCount}, 1fr)` : 'unset'};
	grid-template-rows: ${({hasColumns}) => (hasColumns ? '100%' : 'unset')};
	grid-column-gap: ${({hasColumns, space}) => (hasColumns ? getPixelsOrString(space) : 'unset')};

	> div {
		display: block;
		margin: ${({space, hasColumns}) => (hasColumns ? 0 : `${getPixelsOrString(space)} 0`)};
	}

	align-items: ${({align}) => align};
`;

export default ColumnLayout;
