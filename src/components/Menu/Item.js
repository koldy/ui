import React, {useContext, useMemo, useCallback, forwardRef} from 'react';
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';

import MenuContext from './MenuContext';
import {getStyleForMargins, isFunction, omit} from '../../util/helpers';

const Item = forwardRef(function(props, ref) {
	const {name, itemCss, disabled: menuDisabled, internalValues, pickValue} = useContext(MenuContext);

	const {
		children,
		inline = false,
		disabled: itemDisabled,
		value = undefined,
		m = null,
		mt = null,
		mr = null,
		mb = null,
		ml = null
	} = props;

	const handleClick = useCallback(
		(e) => {
			if (value !== undefined) {
				e.preventDefault();
				e.stopPropagation();

				pickValue(value);
			}
		},
		[value, pickValue]
	);

	/**
	 * ******************************** STYLE PARSER **************************************
	 */

	const [isSelected, isDisabled, className] = useMemo(() => {
		const r = [];
		let s = false;
		let d = false;

		if (menuDisabled || itemDisabled) {
			r.push('disabled');
			d = true;
		}

		if (value !== undefined && internalValues.indexOf(value) >= 0) {
			r.push('selected');
			s = true;
		}

		return [s, d, r.length === 0 ? null : r.join(' ')];
	}, [menuDisabled, itemDisabled, value, internalValues]);

	const style = useMemo(
		() => ({
			...getStyleForMargins({m, mt, mr, mb, ml})
		}),
		[m, mt, mr, mb, ml]
	);

	const otherProps = omit(props, Object.keys(Item.propTypes));

	return (
		<StyledItem
			ref={ref}
			inline={inline}
			itemCss={itemCss}
			className={className}
			onClick={handleClick}
			style={style}
			{...otherProps}
		>
			{isFunction(children) ? children({name, isSelected, isDisabled}) : children}
		</StyledItem>
	);
});

Item.propTypes = {
	children: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.node, PropTypes.func]).isRequired,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	inline: PropTypes.bool,
	disabled: PropTypes.bool,

	// margins:
	m: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	mt: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	mr: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	mb: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	ml: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

const StyledItem = styled.div`
	display: ${({inline}) => (inline ? 'inline-block' : 'block')};
	vertical-align: inherit;
	cursor: pointer;
	white-space: nowrap;
	${({itemCss}) => css(itemCss)}
`;

export default Item;
