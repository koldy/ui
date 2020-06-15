import React from 'react';
import PropTypes from 'prop-types';

import ThemeManager from '../../theme/ThemeManager';
import ThemeContext from '../../theme/ThemeContext';
import Toasts from '../Toast/Toasts';
import useToaster from '../Toast/useToaster';
import Toast from '../Toast/Toast';
import MediaQueriesDetector from '../MediaQuery/MediaQueriesDetector';
import {isEmpty, isObject} from '../../util/helpers';
import GlobalHtmlCss from './GlobalHtmlCss';
import GlobalBodyCss from './GlobalBodyCss';

const App = function({children = null, theme, id: appIndex = 1, ignoreGlobalCss = false}) {
	const [addToast, toasters, removeToast, removeAllToasts] = useToaster();

	const contextValues = {theme, appIndex, addToast, removeToast, removeAllToasts};

	const htmlCss = theme.json('html');
	const bodyCss = theme.json('body');

	const hasHtmlCss = isObject(htmlCss) && !isEmpty(htmlCss);
	const hasBodyCss = isObject(bodyCss) && !isEmpty(bodyCss);

	return (
		<ThemeContext.Provider value={contextValues}>
			{hasHtmlCss && !ignoreGlobalCss && <GlobalHtmlCss htmlCss={htmlCss} />}
			{hasBodyCss && !ignoreGlobalCss && <GlobalBodyCss bodyCss={bodyCss} />}
			<MediaQueriesDetector>
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
	id: PropTypes.number,
	ignoreGlobalCss: PropTypes.bool
};

// for some unknown reason, global styles are created on each render and updating the style
// through theme doesn't work as expected in ^5.0.0; will fix it manually

// const GlobalHtmlStyle = createGlobalStyle`
//   html {
//     ${({html}) => css(html)}
//   }
// `;
//
// const GlobalBodyStyle = createGlobalStyle`
//   body {
//     ${({body}) => body}
//   }
// `;

export default App;
