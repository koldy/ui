import React from 'react';
import DocsTitle from '../../../docs/components/DocsTitle';

import DocsSubTitle from '../../../docs/components/DocsSubTitle';
import DocsText from '../../../docs/components/DocsText';
import DocsCode from '../../../docs/components/DocsCode';

export const title = 'App';
export const slug = 'app';
export const json = null;

export const Documentation = function() {
	return (
		<>
			<DocsTitle hash="badge">App</DocsTitle>
			<DocsText>
				<code>App</code> component is the wrapper for the Koldy UI. If you plan to integrate Koldy UI inside of your project, then put{' '}
				<code>App</code> component somewhere "high" in the tree to be sure that any component you use is for sure under the <code>App</code>
				. Here's minimal example of how to do it:
			</DocsText>
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
			<DocsText>Here's detailed explanation.</DocsText>
			<DocsText>
				<code>App</code> component is a wrapper that takes the instance of <code>ThemeManager</code> (which is required) and it provides
				that instance through the React context for all children within the <code>App</code> component no matter where they are in the
				component tree. Don't get confused about the ThemeManager, it's not 3rd party theme nor anything else. It's a function that knows
				how to use data from given JSON. Therefore, if you want to change the theme "on the fly", just make another{' '}
				<code>ThemeManager</code> instance, pass new JSON and that's it.
			</DocsText>
			<DocsSubTitle hash="theme-manager">ThemeManager</DocsSubTitle>
			<DocsText>
				<code>ThemeManager</code> has more configuration options that can be passed to the constructor:
			</DocsText>
			<DocsText>
				<ul>
					<li>
						<strong>json</strong> - object - a theme definition which is required
					</li>
					<li>
						<strong>mode</strong> - string - one of <code>debug</code>, <code>strict</code> or <code>production</code>. When set to{' '}
						<code>debug</code>, you'll see all errors, warning and debug messages in your console. If set to <code>strict</code>, then all
						possible messages will be thrown as <code>ThemeError</code>. This is useful for unit testing because it's much easier to catch
						the error that way. Third option, <code>production</code> is for production. This mode won't throw any error (unless it's
						critical) and won't print any message in console (expect errors).
					</li>
					<li>
						<strong>onDebug</strong> - function(...args) - a function called when debug message is called
					</li>
					<li>
						<strong>onInfo</strong> - function(...args) - a function called when info message is called
					</li>
					<li>
						<strong>onWarning</strong> - function(...args) - a function called when warning message is called
					</li>
					<li>
						<strong>onError</strong> - function(...args) - a function called when error message is called
					</li>
				</ul>
			</DocsText>
			<DocsText>
				You may use all these functions as a chance to catch any type of error even in production. In that case, just set the mode to{' '}
				<code>production</code> and set the, for example, <code>onError</code> function. It's good chance to report the error to some 3rd
				party service for collecting error reports.
			</DocsText>
			<DocsSubTitle hash="themes">Themes</DocsSubTitle>
			<DocsText>
				If you don't have a theme, you may use one of ours. We have published light and dark theme. Both themes are available as packages
				and you may install it with:
			</DocsText>
			<DocsCode>
				<DocsCode.Code>npm install --save koldy-ui-light-theme koldy-ui-dark-theme</DocsCode.Code>
			</DocsCode>
			<DocsCode>
				<DocsCode.Code>yarn add koldy-ui-light-theme koldy-ui-dark-theme</DocsCode.Code>
			</DocsCode>
			<DocsText>Then, you'll be able to start your app like this:</DocsText>
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
		</>
	);
};
