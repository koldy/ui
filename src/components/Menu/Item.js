import React, {useContext, useMemo, useCallback, forwardRef} from 'react';
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';

import MenuContext from './MenuContext';
import {getStyleForMargins, isFunction, omit} from '../../util/helpers';

const Item = forwardRef(function(props, ref) {
	const {name, itemCss, inline: menuInline = false, disabled: menuDisabled, internalValues, pickValue} = useContext(
		MenuContext
	);

	const {
		children,
		inline = menuInline,
		disabled: itemDisabled,
		value = undefined,
		onClick = null,
		onDoubleClick = null,
		m = null,
		mt = null,
		mr = null,
		mb = null,
		ml = null,
		as = 'div'
	} = props;

	const handleClick = useCallback(
		(e) => {
			if (value !== undefined || isFunction(onClick)) {
				e.preventDefault();
				e.stopPropagation();

				if (isFunction(onClick)) {
					onClick({value});
				} else {
					pickValue(value);
				}
			}
		},
		[value, pickValue, onClick]
	);

	const handleDoubleClick = useCallback(
		(e) => {
			if (isFunction(onDoubleClick)) {
				e.preventDefault();
				e.stopPropagation();

				onDoubleClick({value});
			}
		},
		[value, onDoubleClick]
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
			onDoubleClick={handleDoubleClick}
			style={style}
			as={as}
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
	onClick: PropTypes.func,
	onDoubleClick: PropTypes.func,

	// margins:
	m: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	mt: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	mr: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	mb: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	ml: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

	// advanced props:
	as: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.shape({render: PropTypes.func.isRequired})])
};

const StyledItem = styled.div`
	display: ${({inline}) => (inline ? 'inline-block' : 'block')};
	vertical-align: inherit;
	cursor: pointer;
	white-space: nowrap;
	${({itemCss}) => css(itemCss)}
`;

export default Item;
