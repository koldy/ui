import React, {useRef} from 'react';

import H1 from '../../../docs/components/H1';
import Code from '../../../docs/components/Code';
import Paragraph from '../../../docs/components/Paragraph';
import useOutsideClick from './useOutsideClick';

export const title = 'useOutsideClick';
export const route = '/use-outside-click';
export const json = null;

export default function useOutsideClickDocs() {
	const ref = useRef(null);

	useOutsideClick(ref, () => {
		console.log('Clicked outside!');
	});

	return (
		<>
			<H1>useOutsideClick</H1>
			<Code language="js" code="import {useOutsideClick} from 'koldy-ui';" />
			<Paragraph>
				<code>useOutsideClick</code> can be used to detect the click outside of given target. It's useful for closing the context menus or
				any other similar case.
			</Paragraph>
			<Code
				language="js"
				showCodeFirst
				code={`
import React, {useRef} from 'react';
import {useOutsideClick} from 'koldy-ui';

function MyComponent() {
  const ref = useRef(null);
  
  useOutsideClick(ref, () => {
    console.log('Clicked outside!');
  });
  
  return (
    <div className="my-app">
      <div ref={ref}>
        <h4>This is a menu</h4>
        <p>This is another content</p>
      </div>
      <div>
        This is a content outside the menu
      </div>
    </div>
  );
}
      `}
			>
				<div className="my-app">
					<div ref={ref}>
						<h4>This is a menu</h4>
						<p>This is another content</p>
					</div>
					<div>This is a content outside the menu</div>
				</div>
			</Code>
		</>
	);
}
