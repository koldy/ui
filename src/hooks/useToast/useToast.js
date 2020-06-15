import {useContext} from 'react';
import ThemeContext from '../../theme/ThemeContext';

/**
 * @return {{removeToast: function, removeAllToasts: function, addToast: function}}
 */
export default function useToast() {
	const {addToast, removeToast, removeAllToasts} = useContext(ThemeContext);
	return {addToast, removeToast, removeAllToasts};
}
