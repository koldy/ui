import React from 'react';

import H1 from '../../../docs/components/H1';
import Code from '../../../docs/components/Code';
import Paragraph from '../../../docs/components/Paragraph';
import useColor from './useColor';

export const title = 'useColor';
export const route = '/use-color';
export const json = null;

export default function useColorDocs() {
	const myLighterPrimaryColor = useColor('primary|-2');
	const [red, green, blue, textColor] = useColor(['danger', 'success', 'info', 'textColor|-1']);

	return (
		<>
			<H1>useColor</H1>
			<Code language="js" code="import {useColor} from 'koldy-ui';" />
			<Paragraph>
				<code>useColor</code> is a hook gets color values for all the colors you have requested. It accepts string or array of strings.
			</Paragraph>
			<Code
				language="js"
				code={`
const myLighterPrimaryColor = useColor('primary|-2');

const [red, green, blue, textColor] = useColor(['danger', 'success', 'info', 'textColor|-1']);
      `}
				showCodeFirst
			>
				<Paragraph>myLighterPrimaryColor: {myLighterPrimaryColor}</Paragraph>
				<Paragraph>
					[red, green, blue]: [{red}, {green}, {blue}, {textColor}]
				</Paragraph>
			</Code>
		</>
	);
}
