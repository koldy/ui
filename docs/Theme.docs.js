import React from 'react';
import {NavLink} from 'react-router-dom';

import DocsTitle from './components/DocsTitle';
import DocsText from './components/DocsText';
import DocsSubTitle from './components/DocsSubTitle';
import DocsCode from './components/DocsCode';

export const title = 'Theme';
export const slug = 'theme';
export const json = null;

export const Documentation = function() {
	return (
		<>
			<DocsTitle hash="theme">Theme</DocsTitle>
			<DocsText>
				First, disclaimer: although Koldy UI is made with Styled Components, it doesn't use its{' '}
				<a href="https://www.styled-components.com/docs/advanced#theming" target="_blank" rel="noopener noreferrer">
					ThemeProvider
				</a>{' '}
				because of more complex cases.
			</DocsText>
			<DocsText>
				Theming is done using JSON/JS file and it is possible to replace the theme in the current runtime (it means, you
				can dynamically change theme in production).
			</DocsText>
			<DocsSubTitle hash="usage">Using a theme</DocsSubTitle>
			<DocsCode>
				<DocsCode.Code>
					{`
					import {App, ThemeManager, Button} from 'koldy-ui';

					const theme = new ThemeManager({
						json: {...the theme definition...}
					});
					
					<App theme={theme}>
						<Button>... and so on</Button>
					</App>
					`}
				</DocsCode.Code>
			</DocsCode>
			<DocsSubTitle hash="our-themes">Using our themes</DocsSubTitle>
			<DocsText>We ship two themes with Koldy UI:</DocsText>
			<DocsText>
				<ul>
					<li>
						<strong>koldy-ui-light-theme</strong> - a theme meant for "light" UI
					</li>
					<li>
						<strong>koldy-ui-dark-theme</strong> - a theme meant for "dark" UI that has dark background color
					</li>
				</ul>
			</DocsText>
			<DocsText>
				Both themes are shipped through separate NPM packages. To see how themes look like, check the source on GitHub:{' '}
				<a
					href="https://github.com/koldy/ui/blob/master/themes/koldy-ui-light-theme/src/index.js"
					target="_blank"
					rel="noopener noreferrer"
				>
					koldy-ui-light-theme
				</a>{' '}
				and{' '}
				<a
					href="https://github.com/koldy/ui/blob/master/themes/koldy-ui-dark-theme/src/index.js"
					target="_blank"
					rel="noopener noreferrer"
				>
					koldy-ui-dark-theme
				</a>
				.
			</DocsText>
			<DocsText>Here's an example of using our theme in your project:</DocsText>
			<DocsCode>
				<DocsCode.Code>
					{`
					import {App, ThemeManager, Button} from 'koldy-ui';
					import lightTheme from 'koldy-ui-light-theme';

					const theme = new ThemeManager({
						json: lightTheme
					});
					
					<App theme={theme}>
						<Button>... and so on</Button>
					</App>
					`}
				</DocsCode.Code>
			</DocsCode>
			<DocsSubTitle hash="modifying">Modifying our theme</DocsSubTitle>
			<DocsText>
				If you think our theme is good but you'd like to add or modify just some bits of it, then you may change the
				theme's JSON definition before making instance of the <code>ThemeManager</code>:
			</DocsText>
			<DocsCode>
				<DocsCode.Code>
					{`
					import {App, ThemeManager, Button} from 'koldy-ui';
					import lightTheme from 'koldy-ui-light-theme';
					
					const myTheme = {...lightTheme}
					myTheme.color.primary = ['#2ecbf1', '#17c5f0', '#00c0ef', '#00afda', '#009ec4'];

					const theme = new ThemeManager({
						json: myTheme
					});
					
					<App theme={theme}>
						<Button>... and so on</Button>
					</App>
					`}
				</DocsCode.Code>
			</DocsCode>
			<DocsText>This would overwrite the primary color in the theme.</DocsText>
			<DocsSubTitle hash="structure">Structure</DocsSubTitle>
			<DocsText>
				All theme stuff is written as JSON object. It means that if you need to set the CSS <code>margin-top: 3px</code>
				, you would write it as{' '}
				<code>
					{'{'}marginTop: '3px'{'}'}
				</code>
				. Here's the overall structure of the JSON:
			</DocsText>
			<DocsText>
				<ul>
					<li>
						<strong>name</strong> - the theme name
					</li>
					<li>
						<strong>description</strong> - description of the theme
					</li>
					<li>
						<strong>license</strong>
					</li>
					<li>
						<strong>author</strong> - array of authors
					</li>
					<li>
						<strong>version</strong> - theme's version number respecting the SemVer
					</li>
					<li>
						<strong>html</strong> - if set, it'll be applied to <code>html</code> tag using global styles
					</li>
					<li>
						<strong>body</strong> - if set, it'll be applied to <code>body</code> tag using global styles
					</li>
					<li>
						<strong>zIndex</strong> - this is base CSS <code>z-index</code> as a number used for further zIndex
						calculations; for example, if you're stacking multiple modals one on top of another, it'll start from zIndex
						defined here
					</li>
					<li>
						<strong>color</strong> - this is definition of base colors in the theme; all these colors can be later used
						with a reference, like: <code>border: '1px solid primary|-1'</code>
					</li>
					<li>
						<strong>[element]</strong> - all other definitions in the theme are related to each specific component
					</li>
				</ul>
			</DocsText>
			<DocsSubTitle hash="custom-component">Custom components</DocsSubTitle>
			<DocsText>
				If you're creating your own components and would reuse the Koldy UI ThemeManager, check its{' '}
				<NavLink to="/theme-manager">documentation</NavLink>.
			</DocsText>
		</>
	);
};
