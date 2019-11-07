import {useContext} from 'react';

import ResponsiveContext from './ResponsiveContext';

export default function() {
	return useContext(ResponsiveContext);
}
