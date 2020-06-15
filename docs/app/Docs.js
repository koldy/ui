import React, {useState, useCallback, useEffect} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {hot} from 'react-hot-loader';
import styled, {createGlobalStyle} from 'styled-components';
import {useSessionStorage} from 'react-use';

import CssReset from '../../src/util/CSSReset';
import Nav from './Nav';
import Main from './Main';

import App from '../../src/components/App/App';
import lightTheme from '../../themes/koldy-ui-light-theme/src/koldy-ui-light-theme';
import darkTheme from '../../themes/koldy-ui-dark-theme/src/koldy-ui-dark-theme';
import ThemeManager from '../../src/theme/ThemeManager';
import DocsContext from './DocsContext';

// eslint-disable-next-line react/prop-types
const Docs = function({basename}) {
	const [codeTheme, setCodeTheme] = useSessionStorage('code-theme', 0);

	const [themes, setThemes] = useState(() => {
		// initialize all themes
		const t = [];

		[lightTheme, darkTheme].forEach((json) => {
			t.push(
				new ThemeManager({
					json,
					mode: 'debug'
				})
			);
		});

		return t;
	});

	const setTheme = useCallback(
		(index) => {
			if (codeTheme !== index) {
				setCodeTheme(index);
			}
		},
		[codeTheme]
	);

	useEffect(() => {
		if (module.hot) {
			module.hot.accept('../../themes/koldy-ui-light-theme/src/koldy-ui-light-theme.js', function() {
				const newState = [...themes];

				newState[0] = new ThemeManager({
					json: require('../../themes/koldy-ui-light-theme/src/koldy-ui-light-theme').default,
					mode: 'debug'
				});

				setThemes(newState);
			});

			module.hot.accept('../../themes/koldy-ui-dark-theme/src/koldy-ui-dark-theme.js', function() {
				const newState = [...themes];

				newState[1] = new ThemeManager({
					json: require('../../themes/koldy-ui-dark-theme/src/koldy-ui-dark-theme').default,
					mode: 'debug'
				});

				setThemes(newState);
			});
		}
	}, []);

	const context = {
		theme: themes[codeTheme],
		setTheme,
		themes
	};

	return (
		<>
			<CssReset />
			<DocsPageStyle />
			<Wrapper>
				<BrowserRouter basename={basename}>
					<App theme={themes[codeTheme]} ignoreGlobalCss>
						<DocsContext.Provider value={context}>
							<Nav />
							<Main />
						</DocsContext.Provider>
					</App>
				</BrowserRouter>
			</Wrapper>
		</>
	);
};

const DocsPageStyle = createGlobalStyle`
  body {
    background: #280f0e;
    color: #efefef;
  }
`;

const Wrapper = styled.div`
	width: 100%;
	min-height: 100vh;
`;

export default hot(module)(Docs);
