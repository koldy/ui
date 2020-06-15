import React from 'react';
import {NavLink} from 'react-router-dom';

import H1 from '../components/H1';
import Paragraph from '../components/Paragraph';
import H2 from '../components/H2';
import Code from '../components/Code';

export const route = '/getting-started';

export const title = 'Getting Started';

export default function GettingStartedDocs() {
	return (
		<>
			<H1>{title}</H1>
			<Paragraph>
				Koldy UI is React component library which solves some common issues that every web developer encountered in his career. It is made
				for long term projects when you're dealing with a lot of custom styling. It is made with{' '}
				<a href="https://reactjs.org/docs/hooks-intro.html" target="_blank" rel="noopener noreferrer">
					React Hooks
				</a>{' '}
				and{' '}
				<a href="https://www.styled-components.com" target="_blank" rel="noopener noreferrer">
					Styled Components
				</a>
				.
			</Paragraph>
			<Paragraph>
				It helps you develop consistently looking UI with the consistent code base. Extending its theme is easy and can be done in runtime.
			</Paragraph>
			<H2 hash="installation">Installation</H2>
			<Paragraph>Koldy UI is available as a package and can be installed with:</Paragraph>
			<Code language="bash" code="npm install --save koldy-ui" />
			<Code language="bash" code="yarn add koldy-ui" />
			<Paragraph>
				If you're starting your project from scratch or using <code>create-react-app</code>, then install these packages:
			</Paragraph>
			<Code language="bash" code="npm install --save koldy-ui prop-types styled-components" />
			<Code language="bash" code="yarn add koldy-ui prop-types styled-components" />
			<Paragraph>
				After you have installed required packages, go to <NavLink to="/app">App</NavLink> docs.
			</Paragraph>
		</>
	);
}
