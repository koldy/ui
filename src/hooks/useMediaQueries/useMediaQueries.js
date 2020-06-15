import {useContext} from 'react';

import ResponsiveContext from '../../components/MediaQuery/ResponsiveContext';

export default function() {
	return useContext(ResponsiveContext);
}
