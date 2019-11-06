import React from 'react';

import DocsTitle from './components/DocsTitle';
import DocsText from './components/DocsText';
import DocsSubTitle from './components/DocsSubTitle';
import DocsCode from './components/DocsCode';

export const title = 'ThemeManager';
export const slug = 'theme-manager';
export const json = null;

export const Documentation = function() {
	return (
		<>
			<DocsTitle hash="theme-manager">ThemeManager</DocsTitle>
			<DocsText>
				<code>ThemeManager</code> is internal instance that knows how to use the theme's JSON definition and it provides
				some common methods to get the pieces of data back from the JSON. Let's say that you're extending the Koldy UI
				theme definition with a code needed for your custom components. You should do it like this:
			</DocsText>
			<DocsCode>
				<DocsCode.Code>
					{`
					import {App, ThemeManager, Button} from 'koldy-ui';
					import lightTheme from 'koldy-ui-light-theme';

					const theme = new ThemeManager({
						json: {
							...lightTheme,
							myComponent: {
								size: '500px',
								color: 'red',
								... and anything else you want...
							}
						}
					});
					
					<App theme={theme}>
						<MyComponent>...</MyComponent>
					</App>
					`}
				</DocsCode.Code>
			</DocsCode>
			<DocsText>
				Inside of <code>MyComponent</code>, you should connect to internal theme's context:
			</DocsText>
			<DocsCode>
				<DocsCode.Code>
					{`
					import React, {useContext} from 'react';
					import {ThemeContext} from 'koldy-ui';

					export const MyComponent = function ({children}) {
						const {theme} = useContext(ThemeContext); // theme is the instance of ThemeManager
						
						const json = theme.json('myComponent'); // will return your custom JSON
						
						return (
							<div style={{width: json.size}}>
								{children}
							</div>
						);
					};
					`}
				</DocsCode.Code>
			</DocsCode>
			<DocsText>That's the way how to access the theme's JSON definition.</DocsText>
			<DocsSubTitle hash="api">API</DocsSubTitle>
			<DocsText>Here are useful methods you can use on the instance of ThemeManager:</DocsText>
			<DocsText>
				<ul>
					<li>
						<strong>json(?string: query)</strong> - always returns object even on falsy queries; query can be undefined
						(then returns the whole JSON) or can return just part of it, like: 'button.width' and you'll get the object
						of all widths for the button
					</li>
					<li>
						<strong>colors</strong> - returns the array of{' '}
						<a
							href="https://github.com/koldy/ui/blob/master/src/theme/ThemeColor.js"
							target="_blank"
							rel="noopener noreferrer"
						>
							ThemeColor
						</a>{' '}
						instances
					</li>
					<li>
						<strong>color(string: color)</strong> - returns an instance of{' '}
						<a
							href="https://github.com/koldy/ui/blob/master/src/theme/ThemeColor.js"
							target="_blank"
							rel="noopener noreferrer"
						>
							ThemeColor
						</a>{' '}
						if requested color exists, <code>null</code> otherwise
					</li>
					<li>
						<strong>firstColor()</strong> - same as <code>color()</code>, but returns first color defined in{' '}
						<code>theme.color</code>
					</li>
					<li>
						<strong>processColor(string: value)</strong> - processes color definition; if you pass <code>#0000ff</code>,
						it'll return the same thing, but if you pass <code>primary|2</code>, it'll return the color from{' '}
						<code>theme.color.primary[middleElement + 2]</code>
					</li>
					<li>
						<strong>processColors(object: value)</strong> - meant for processing colors on given object; has ability to process values like: <code>{'{'}marginTop: '5px', background: 'primary|-2'{'}'}</code>
					</li>
					<li>
						<strong>isStrict()</strong> - returns true if mode is set to <code>strict</code>
					</li>
					<li>
						<strong>inDebug()</strong> - returns true if mode is set to <code>debug</code>
					</li>
					<li>
						<strong>error(...args)</strong> - prints error message in console; it'll be caught in <code>onError</code> function if set
					</li>
					<li>
						<strong>info(...args)</strong> - prints info message in console; it'll be caught in <code>onInfo</code> function if set
					</li>
					<li>
						<strong>warning(...args)</strong> - prints warning message in console; it'll be caught in <code>onWarning</code> function if set
					</li>
					<li>
						<strong>debug(...args)</strong> - prints debug message in console; it'll be caught in <code>onDebug</code> function if set
					</li>
				</ul>
			</DocsText>
		</>
	);
};
