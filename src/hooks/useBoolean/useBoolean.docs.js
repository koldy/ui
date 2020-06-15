import React from 'react';

import H1 from '../../../docs/components/H1';
import Code from '../../../docs/components/Code';
import Paragraph from '../../../docs/components/Paragraph';

export const title = 'useBoolean';
export const route = '/use-boolean';
export const json = null;

export default function useBooleanDocs() {
	return (
		<>
			<H1>useBoolean</H1>
			<Code language="js" code="import {useBoolean} from 'koldy-ui';" />
			<Paragraph>
				<code>useBoolean</code> is a hook that handles one boolean state. It exports few useful methods that may be used for your
				components. This is specially handy when you have components you want to toggle.
			</Paragraph>
			<Code
				language="js"
				code={`
const {value, setValue, setTrue, setFalse, toggle} = useBoolean();
      `}
			/>
			<Paragraph>
				<code>useBoolean()</code> accepts one parameter and it's the initial value of the boolean state.
			</Paragraph>
		</>
	);
}
