import React from 'react';
import {NavLink} from 'react-router-dom';

import H1 from '../components/H1';
import Paragraph from '../components/Paragraph';
import H2 from '../components/H2';
import Code from '../components/Code';
import List from '../components/List';

export const route = '/theme-manager';
export const title = 'ThemeManager';

export default function ThemeManagerDocs() {
	return (
		<>
			<H1>{title}</H1>
			<Paragraph>
				<code>ThemeManager</code> is internal instance that knows how to use the theme's JSON definition and it provides some common methods
				to get the pieces of data back from the JSON. Let's say that you're extending the Koldy UI theme definition with a code needed for
				your custom components. You should do it like this:
			</Paragraph>
			<Code
				language="js"
				code={`
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

export default () => (
  <App theme={theme}>
    <MyComponent>...</MyComponent>
  </App>
);
					`}
			/>
			<Paragraph>
				Inside of <code>MyComponent</code>, you should connect to internal theme's context:
			</Paragraph>
			<Code
				language="js"
				code={`
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
			/>
			<Paragraph>That's the way how to access the theme's JSON definition.</Paragraph>
			<H2 hash="api">API</H2>
			<Paragraph>Here are useful methods you can use on the instance of ThemeManager:</Paragraph>
			<List>
				<List.Item>
					<code>json(?string: query)</code> - always returns object even on falsy queries; query can be undefined (then returns the whole
					JSON) or can return just part of it, like: 'button.width' and you'll get the object of all widths for the button
				</List.Item>
				<List.Item>
					<code>colors</code> - returns the array of{' '}
					<a href="https://github.com/koldy/ui/blob/master/src/theme/ThemeColor.js" target="_blank" rel="noopener noreferrer">
						ThemeColor
					</a>{' '}
					instances
				</List.Item>
				<List.Item>
					<code>color(string: color)</code> - returns an instance of{' '}
					<a href="https://github.com/koldy/ui/blob/master/src/theme/ThemeColor.js" target="_blank" rel="noopener noreferrer">
						ThemeColor
					</a>{' '}
					if requested color exists, <code>null</code> otherwise
				</List.Item>
				<List.Item>
					<code>firstColor()</code> - same as <code>color()</code>, but returns first color defined in <code>theme.color</code>
				</List.Item>
				<List.Item>
					<code>processColor(string: value)</code> - processes color definition; if you pass <code>#0000ff</code>, it'll return the same
					thing, but if you pass <code>primary|2</code>, it'll return the color from <code>theme.color.primary[middleElement + 2]</code>
				</List.Item>
				<List.Item>
					<code>processColors(object: value)</code> - meant for processing colors on given object; has ability to process values like:{' '}
					<code>
						{'{'}marginTop: '5px', background: 'primary|-2'{'}'}
					</code>
				</List.Item>
				<List.Item>
					<code>isStrict()</code> - returns true if mode is set to <code>strict</code>
				</List.Item>
				<List.Item>
					<code>inDebug()</code> - returns true if mode is set to <code>debug</code>
				</List.Item>
				<List.Item>
					<code>error(...args)</code> - prints error message in console; it'll be caught in <code>onError</code> function if set
				</List.Item>
				<List.Item>
					<code>info(...args)</code> - prints info message in console; it'll be caught in <code>onInfo</code> function if set
				</List.Item>
				<List.Item>
					<code>warning(...args)</code> - prints warning message in console; it'll be caught in <code>onWarning</code> function if set
				</List.Item>
				<List.Item>
					<code>debug(...args)</code> - prints debug message in console; it'll be caught in <code>onDebug</code> function if set
				</List.Item>
			</List>
		</>
	);
}
