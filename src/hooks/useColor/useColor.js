import {useContext} from 'react';

import ThemeContext from '../../theme/ThemeContext';
import {isArray} from '../../util/helpers';

export default function useColor(params) {
	const {theme} = useContext(ThemeContext);

	if (isArray(params)) {
		return params.map((el) => theme.processColor(el));
	}

	if (typeof params === 'string') {
		return theme.processColor(params);
	}

	return null;
}
