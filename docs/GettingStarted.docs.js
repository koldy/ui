import React from 'react';
import {NavLink} from 'react-router-dom';

import DocsTitle from './components/DocsTitle';
import DocsText from './components/DocsText';
import DocsSubTitle from './components/DocsSubTitle';
import DocsCode from './components/DocsCode';

export const title = 'Getting started';
export const slug = 'getting-started';
export const json = null;

export const Documentation = function() {
	return (
		<>
			<DocsTitle hash="getting-started">Getting started</DocsTitle>
			<DocsText>
				Koldy UI is React component library which solves some common issues that every web developer encountered in his
				career. It is made for long term projects when you're dealing with a lot of custom styling. It is made with{' '}
				<a href="https://reactjs.org/docs/hooks-intro.html" target="_blank" rel="noopener noreferrer">
					React Hooks
				</a>{' '}
				and{' '}
				<a href="https://www.styled-components.com" target="_blank" rel="noopener noreferrer">
					Styled Components
				</a>
				.
			</DocsText>
			<DocsText>
				It helps you develop consistently looking UI with the consistent code base. Extending its theme is easy and can
				be done in runtime.
			</DocsText>
			<DocsSubTitle hash="installation">Installation</DocsSubTitle>
			<DocsText>Koldy UI is available as a package and can be installed with:</DocsText>
			<DocsCode>
				<DocsCode.Code>npm install --save koldy-ui</DocsCode.Code>
			</DocsCode>
			<DocsCode>
				<DocsCode.Code>yarn add koldy-ui</DocsCode.Code>
			</DocsCode>
			<DocsText>
				If you're starting your project from scratch or using <code>create-react-app</code>, then install these
				packages:
			</DocsText>
			<DocsCode>
				<DocsCode.Code>npm install --save koldy-ui prop-types styled-components</DocsCode.Code>
			</DocsCode>
			<DocsCode>
				<DocsCode.Code>yarn add koldy-ui prop-types styled-components</DocsCode.Code>
			</DocsCode>
			<DocsText>
				After you have installed required packages, go to <NavLink to="app">App</NavLink> docs.
			</DocsText>
		</>
	);
};
