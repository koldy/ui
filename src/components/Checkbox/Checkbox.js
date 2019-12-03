import React, {useCallback, useMemo, useContext, forwardRef, useState} from 'react';
import PropTypes from 'prop-types';

import ThemeContext from '../../theme/ThemeContext';
import {getHtmlValue, getStyleForMargins} from '../../util/helpers';
import ThemeError from '../../theme/ThemeError';
import Checkmark, {getInputProps as getCheckmarkInputProps} from '../../styled-components/Checkmark';
import Dot, {getInputProps as getDotInputProps} from '../../styled-components/Dot';
import Switch, {getInputProps as getSwitchInputProps} from '../../styled-components/Switch';

const Checkbox = forwardRef(function(props, ref) {
	const {
		name = null,
		value = null,
		offValue = undefined,
		checked: userChecked = undefined,
		defaultChecked: userDefaultChecked = undefined,
		onChange: userOnChange = null,
		variant: userVariant = null,
		size: userSize = null,
		color: userColor = null,
		disabled = false,

		// default margins
		m = null,
		mt = null,
		mr = null,
		mb = null,
		ml = null,

		...otherProps
	} = props;

	const {theme} = useContext(ThemeContext);
	const defaults = theme.json('checkboxAndRadio.defaults');

	/**
	 * ******************************** VARIANT WORK **************************************
	 */

	const variant = userVariant || defaults.variantCheckbox || null;

	const [Input, inputProps] = useMemo(() => {
		switch (variant) {
			case null:
			case 'checkmark-square':
			case 'checkmark-round':
				return [Checkmark, getCheckmarkInputProps(theme, defaults, userSize, userColor, variant, 'Checkbox')];

			case 'dot-square':
			case 'dot-round':
				return [Dot, getDotInputProps(theme, defaults, userSize, userColor, variant, 'Checkbox')];

			case 'switch-square':
			case 'switch-round':
				return [Switch, getSwitchInputProps(theme, defaults, userSize, userColor, variant, 'Checkbox')];

			default:
				throw new ThemeError(`Invalid Checkbox variant: ${variant}`);
		}
	}, [variant, theme, defaults, userSize, userColor]);

	const [checked, setChecked] = useState(userChecked || userDefaultChecked || false);

	const handleChange = useCallback(
		(e) => {
			setChecked(e.currentTarget.checked);

			if (userOnChange) {
				userOnChange({
					name,
					checked: e.currentTarget.checked,
					value,
					offValue,
					element: e.currentTarget
				});
			}
		},
		[userOnChange, name, value, offValue]
	);

	if (userChecked !== undefined && userDefaultChecked === undefined && !userOnChange) {
		theme.error('You must set onChange prop to <Checkbox/> component when using it as controlled component');
	} else if (userChecked !== undefined && userDefaultChecked !== undefined) {
		theme.error('When using <Checkbox/>, you can set the checked OR defaultChecked prop, not both');
	}

	let chkName = name;
	if (!checked && name && typeof offValue !== 'undefined') {
		chkName = undefined;
	}

	const style = useMemo(
		() => ({
			...getStyleForMargins({m, mt, mr, mb, ml})
		}),
		[m, mt, mr, mb, ml]
	);

	return (
		<Input style={style} {...inputProps}>
			<input
				ref={ref}
				type="checkbox"
				name={chkName}
				value={getHtmlValue(value)}
				checked={userChecked}
				defaultChecked={userDefaultChecked}
				onChange={handleChange}
				disabled={disabled}
				{...otherProps}
			/>
			<span />
			{!checked && name && typeof offValue !== 'undefined' && <input type="hidden" name={name} value={getHtmlValue(offValue)} />}
		</Input>
	);
});

Checkbox.propTypes = {
	name: PropTypes.string,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
	offValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
	checked: PropTypes.bool,
	defaultChecked: PropTypes.bool,
	size: PropTypes.string,
	variant: PropTypes.oneOf(['checkmark-square', 'checkmark-round', 'dot-square', 'dot-round', 'switch-square', 'switch-round']),
	color: PropTypes.string,
	onChange: PropTypes.func,
	disabled: PropTypes.bool,

	// margins:
	m: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	mt: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	mr: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	mb: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	ml: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default Checkbox;
