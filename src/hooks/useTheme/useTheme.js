import {useContext} from 'react';

import ThemeContext from '../../theme/ThemeContext';

export default function useTheme() {
	const {theme} = useContext(ThemeContext);
	return theme;
}
