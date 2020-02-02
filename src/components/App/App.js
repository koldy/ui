import React from 'react';
import PropTypes from 'prop-types';
import {createGlobalStyle, css} from 'styled-components';

import ThemeManager from '../../theme/ThemeManager';
import ThemeContext from '../../theme/ThemeContext';
import Toasts from '../Toast/Toasts';
import useToaster from '../Toast/useToaster';
import Toast from '../Toast/Toast';
import MediaQueriesDetector from '../MediaQuery/MediaQueriesDetector';

const App = function(props) {
	const {children = null, theme, useGlobalCss = false, id: appIndex = 1} = props;
	const [addToast, toasters, removeToast, removeAllToasts] = useToaster();

	const GlobalStyleComponent = createGlobalStyle`
		${useGlobalCss && css(theme.json('html'))}
		${useGlobalCss && css(theme.json('body'))}
	`;

	const contextValues = {theme, appIndex, addToast, removeToast, removeAllToasts};

	return (
		<ThemeContext.Provider value={contextValues}>
			<MediaQueriesDetector>
				<GlobalStyleComponent />
				{children}
				<Toasts appIndex={appIndex} />
				{toasters.map(({componentRenderProp, id, position, entryAnimation, closeFn}) => (
					<Toast key={id} position={position} entryAnimation={entryAnimation} onClose={closeFn}>
						{componentRenderProp}
					</Toast>
				))}
			</MediaQueriesDetector>
		</ThemeContext.Provider>
	);
};

App.propTypes = {
	children: PropTypes.node,
	theme: PropTypes.instanceOf(ThemeManager).isRequired,
	useGlobalCss: PropTypes.bool,
	id: PropTypes.number
};

export default App;
