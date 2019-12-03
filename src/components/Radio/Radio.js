import React, {createContext, useEffect, useContext, useCallback, useMemo, useState, forwardRef} from 'react';
import PropTypes from 'prop-types';

import ThemeContext from '../../theme/ThemeContext';
import ThemeError from '../../theme/ThemeError';
import {getHtmlValue, getStyleForMargins, stopPropagation} from '../../util/helpers';
import Checkmark, {getInputProps as getCheckmarkInputProps} from '../../styled-components/Checkmark';
import Dot, {getInputProps as getDotInputProps} from '../../styled-components/Dot';
import Switch, {getInputProps as getSwitchInputProps} from '../../styled-components/Switch';

const RadioContext = createContext(null);

/**
 * ******************************** RADIO **************************************
 */

const Radio = function(props) {
	const {
		children,
		name = null,
		value = undefined,
		defaultValue = undefined,
		onChange = null,
		variant: userVariant = null,
		size: userSize = null,
		color: userColor = null,
		disabled = false
	} = props;

	const {theme} = useContext(ThemeContext);
	const defaults = theme.json('checkboxAndRadio.defaults');

	/**
	 * ******************************** VARIANT WORK **************************************
	 */

	const variant = userVariant || defaults.variantRadio || null;

	const [Input, inputProps] = useMemo(() => {
		switch (variant) {
			case null:
			case 'checkmark-square':
			case 'checkmark-round':
				return [Checkmark, getCheckmarkInputProps(theme, defaults, userSize, userColor, variant, 'Radio')];

			case 'dot-square':
			case 'dot-round':
				return [Dot, getDotInputProps(theme, defaults, userSize, userColor, variant, 'Radio')];

			case 'switch-square':
			case 'switch-round':
				return [Switch, getSwitchInputProps(theme, defaults, userSize, userColor, variant, 'Radio')];

			default:
				throw new ThemeError(`Invalid Radio variant: ${variant}`);
		}
	}, [theme, defaults, userSize, userColor, variant]);

	/**
	 * ******************************** VALUE / REAL VALUE **************************************
	 */
	const [realValue, setRealValue] = useState(value !== undefined ? value : defaultValue);

	const handleValueChange = useCallback(
		({optionValue, element}) => {
			if (defaultValue !== undefined || (defaultValue === undefined && value === undefined)) {
				setRealValue(optionValue);
			}

			if (typeof onChange === 'function') {
				onChange({name, value: optionValue, element});
			}
		},
		[name, onChange, value, defaultValue]
	);

	useEffect(() => {
		if (value !== undefined && defaultValue === undefined && !onChange) {
			theme.error('You must set onChange prop to <Radio/> component when using it as controlled component');
		} else if (value !== undefined && defaultValue !== undefined) {
			theme.error('When using <Radio/>, you can set the value OR defaultValue prop, not both');
		}

		if (value !== undefined) {
			setRealValue(value);
		}
	}, [value, theme, defaultValue, onChange]);

	/**
	 * ******************************** CREATING CONTEXT VALUES **************************************
	 */
	const radioContext = {
		name,
		disabled,
		value: realValue,
		setValue: handleValueChange,
		radioValue: value,
		radioDefaultValue: defaultValue,
		Input,
		inputProps
	};

	return <RadioContext.Provider value={radioContext}>{children}</RadioContext.Provider>;
};

Radio.propTypes = {
	children: PropTypes.node.isRequired,
	name: PropTypes.string,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
	defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
	size: PropTypes.string,
	variant: PropTypes.oneOf(['checkmark-square', 'checkmark-round', 'dot-square', 'dot-round', 'switch-square', 'switch-round']),
	color: PropTypes.string,
	onChange: PropTypes.func,
	disabled: PropTypes.bool
};

/**
 * ******************************** OPTION **************************************
 */

const Option = forwardRef(function(props, ref) {
	const {
		disabled: optionDisabled = false,
		value: optionValue = undefined,

		// default margins
		m = null,
		mt = null,
		mr = null,
		mb = null,
		ml = null
	} = props;

	const {name, disabled: allDisabled = false, value: radioValue, setValue, Input, inputProps} = useContext(RadioContext);

	const handleChange = useCallback(
		(e) => {
			const {currentTarget} = e;
			setValue({optionValue, element: currentTarget});
		},
		[optionValue, setValue]
	);

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
				type="radio"
				name={name}
				value={getHtmlValue(optionValue)}
				disabled={allDisabled || optionDisabled}
				onChange={handleChange}
				onDoubleClick={stopPropagation}
				checked={radioValue === optionValue}
			/>
			<span />
		</Input>
	);
});

Option.propTypes = {
	disabled: PropTypes.bool,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),

	// margins:
	m: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	mt: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	mr: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	mb: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	ml: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

/**
 * ******************************** export **************************************
 */

Radio.Option = Option;

export default Radio;
