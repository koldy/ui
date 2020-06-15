import {useState, useCallback} from 'react';

/**
 * Shorthand hook for working with booleans. Useful for achieving toggle states and etc.
 * @param initialValue
 * @return {{setTrue: (function(): void), setValue: React.Dispatch<React.SetStateAction<boolean>>, setFalse: (function(): void), toggle: (function(): void), value: boolean}}
 */
export default function useBoolean(initialValue = false) {
	const [value, setValue] = useState(initialValue);

	const setTrue = useCallback(() => setValue(true), [setValue]);
	const setFalse = useCallback(() => setValue(false), [setValue]);
	const toggle = useCallback(() => setValue(!value), [value, setValue]);

	return {value, setValue, setTrue, setFalse, toggle};
}
