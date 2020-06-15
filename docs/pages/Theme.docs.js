import React from 'react';
import {NavLink} from 'react-router-dom';

import H1 from '../components/H1';
import Paragraph from '../components/Paragraph';
import H2 from '../components/H2';
import Code from '../components/Code';
import List from '../components/List';

import {route as themeManagerRoute, title as themeManagerTitle} from './ThemeManager.docs';

export const route = '/theme';
export const title = 'Theme';

export default function ThemeDocs() {
	return (
		<>
			<H1>{title}</H1>
			<Paragraph>
				First, disclaimer: although Koldy UI is made with Styled Components, it doesn't use its{' '}
				<a href="https://www.styled-components.com/docs/advanced#theming" target="_blank" rel="noopener noreferrer">
					ThemeProvider
				</a>{' '}
				because of more complex cases.
			</Paragraph>
			<Paragraph>
				Theming is done using JSON/JS file and it is possible to replace the theme in the current runtime (it means, you can dynamically
				change theme in production).
			</Paragraph>
			<H2 hash="usage">Using a theme</H2>
			<Code
				language="js"
				code={`
import {App, ThemeManager, Button} from 'koldy-ui';

const theme = new ThemeManager({
  json: {
    /*...complete theme definition...*/
  }
});

export default () => (
  <App theme={theme}>
    <Button>... and so on</Button>
  </App>
);`}
			/>
			<H2 hash="our-themes">Using our themes</H2>
			<Paragraph>We ship two themes with Koldy UI</Paragraph>
			<List>
				<List.Item>
					<code>koldy-ui-light-theme</code> - a theme meant for "light" UI
				</List.Item>
				<List.Item>
					<code>koldy-ui-dark-theme</code> - a theme meant for "dark" UI that has dark background color
				</List.Item>
			</List>
			<Paragraph>
				Both themes are shipped through separate NPM packages. To see how themes look like, check the source on GitHub:{' '}
				<a
					href="https://github.com/koldy/ui/blob/master/themes/koldy-ui-light-theme/src/index.js"
					target="_blank"
					rel="noopener noreferrer"
				>
					koldy-ui-light-theme
				</a>{' '}
				and{' '}
				<a href="https://github.com/koldy/ui/blob/master/themes/koldy-ui-dark-theme/src/index.js" target="_blank" rel="noopener noreferrer">
					koldy-ui-dark-theme
				</a>
				.
			</Paragraph>
			<Paragraph>Here's an example of using our theme in your project:</Paragraph>
			<Code
				language="js"
				code={`
import {App, ThemeManager, Button} from 'koldy-ui';
import lightTheme from 'koldy-ui-light-theme';

const theme = new ThemeManager({
  json: lightTheme
});

export default () => (
  <App theme={theme}>
    <Button>... and so on</Button>
  </App>
);
`}
			/>
			<H2 hash="modifying">Modifying our theme</H2>
			<Paragraph>
				If you think our theme is good but you'd like to add or modify just some bits of it, then you may change the theme's JSON definition
				before making instance of the <code>ThemeManager</code>:
			</Paragraph>
			<Code
				language="js"
				code={`
import {App, ThemeManager, Button} from 'koldy-ui';
import lightTheme from 'koldy-ui-light-theme';

const myTheme = {...lightTheme}
myTheme.color.primary = ['#2ecbf1', '#17c5f0', '#00c0ef', '#00afda', '#009ec4'];

const theme = new ThemeManager({
  json: myTheme
});

export default () => (
  <App theme={theme}>
    <Button>... and so on</Button>
  </App>
);
`}
			/>
			<Paragraph>This would overwrite the primary color in the theme.</Paragraph>
			<H2 hash="structure">Structure</H2>
			<Paragraph>
				All theme stuff is written as JSON object. It means that if you need to set the CSS <code>margin-top: 3px</code>, you would write it
				as{' '}
				<code>
					{'{'}marginTop: '3px'{'}'}
				</code>
				. Here's the overall structure of the JSON:
			</Paragraph>
			<List>
				<List.Item>
					<code>name</code> - the theme name
				</List.Item>
				<List.Item>
					<code>description</code> - description of the theme
				</List.Item>
				<List.Item>
					<code>license</code>
				</List.Item>
				<List.Item>
					<code>author</code> - array of authors
				</List.Item>
				<List.Item>
					<code>version</code> - theme's version number respecting the SemVer
				</List.Item>
				<List.Item>
					<code>html</code> - if set, it'll be applied to <code>html</code> tag using global styles
				</List.Item>
				<List.Item>
					<code>body</code> - if set, it'll be applied to <code>body</code> tag using global styles
				</List.Item>
				<List.Item>
					<code>zIndex</code> - this is base CSS <code>z-index</code> as a number used for further zIndex calculations; for example, if
					you're stacking multiple modals one on top of another, it'll start from zIndex defined here
				</List.Item>
				<List.Item>
					<code>color</code> - this is definition of base colors in the theme; all these colors can be later used with a reference, like:{' '}
					<code>border: '1px solid primary|-1'</code>
				</List.Item>
				<List.Item>
					<code>[element]</code> - all other definitions in the theme are related to each specific component
				</List.Item>
			</List>
			<H2 hash="custom-component">Custom components</H2>
			<Paragraph>
				If you're creating your own components and would reuse the Koldy UI {themeManagerTitle}, check its{' '}
				<NavLink to={themeManagerRoute}>documentation</NavLink>.
			</Paragraph>
		</>
	);
}
