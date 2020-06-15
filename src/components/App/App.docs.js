import React from 'react';

import H1 from '../../../docs/components/H1';
import Paragraph from '../../../docs/components/Paragraph';
import Code from '../../../docs/components/Code';
import H2 from '../../../docs/components/H2';
import List from '../../../docs/components/List';

export const title = 'App';
export const route = '/app';
export const json = null;

export default function AppDocs() {
	return (
		<>
			<H1>App</H1>
			<Paragraph>
				<code>App</code> component is the wrapper for the Koldy UI. If you plan to integrate Koldy UI inside of your project, then put{' '}
				<code>App</code> component somewhere "high" in the tree to be sure that any component you use is for sure under the <code>App</code>
				. Here's minimal example of how to do it:
			</Paragraph>
			<Code
				language="js"
				code={`
import {App, ThemeManager, Button} from 'koldy-ui';

const theme = new ThemeManager({
  json: {...the theme definition...}
});

<App theme={theme}>
  <Button>... and so on</Button>
</App>
					`}
			/>
			<Paragraph>Here's detailed explanation.</Paragraph>
			<Paragraph>
				<code>App</code> component is a wrapper that takes the instance of <code>ThemeManager</code> (which is required) and it provides
				that instance through the React context for all children within the <code>App</code> component no matter where they are in the
				component tree. Don't get confused about the ThemeManager, it's not 3rd party theme nor anything else. It's a function that knows
				how to use data from given JSON. Therefore, if you want to change the theme "on the fly", just make another{' '}
				<code>ThemeManager</code> instance, pass new JSON and that's it.
			</Paragraph>
			<H2 hash="theme-manager">ThemeManager</H2>
			<Paragraph>
				<code>ThemeManager</code> has more configuration options that can be passed to the constructor:
			</Paragraph>
			<List>
				<List.Item>
					<code>json</code> - object - a theme definition which is required
				</List.Item>
				<List.Item>
					<code>mode</code> - string - one of <code>debug</code>, <code>strict</code> or <code>production</code>. When set to{' '}
					<code>debug</code>, you'll see all errors, warning and debug messages in your console. If set to <code>strict</code>, then all
					possible messages will be thrown as <code>ThemeError</code>. This is useful for unit testing because it's much easier to catch the
					error that way. Third option, <code>production</code> is for production. This mode won't throw any error (unless it's critical)
					and won't print any message in console (expect errors).
				</List.Item>
				<List.Item>
					<code>onDebug</code> - function(...args) - a function called when debug message is called
				</List.Item>
				<List.Item>
					<code>onInfo</code> - function(...args) - a function called when info message is called
				</List.Item>
				<List.Item>
					<code>onWarning</code> - function(...args) - a function called when warning message is called
				</List.Item>
				<List.Item>
					<code>onError</code> - function(...args) - a function called when error message is called
				</List.Item>
			</List>
			<Paragraph>
				You may use all these functions as a chance to catch any type of error even in production. In that case, just set the mode to{' '}
				<code>production</code> and set the, for example, <code>onError</code> function. It's good chance to report the error to some 3rd
				party service for collecting error reports.
			</Paragraph>
			<H2 hash="themes">Themes</H2>
			<Paragraph>
				If you don't have a theme, you may use one of ours. We have published light and dark theme. Both themes are available as packages
				and you may install it with:
			</Paragraph>
			<Code language="bash" code="npm install --save koldy-ui-light-theme koldy-ui-dark-theme" />
			<Code language="bash" code="yarn add koldy-ui-light-theme koldy-ui-dark-theme" />
			<Paragraph>Then, you'll be able to start your app like this:</Paragraph>
			<Code
				language="js"
				code={`
import {App, ThemeManager, Button} from 'koldy-ui';
import lightTheme from 'koldy-ui-light-theme';

const theme = new ThemeManager({
  json: lightTheme
});

<App theme={theme}>
  <Button>... and so on</Button>
</App>
					`}
			/>
		</>
	);
}
