import React, {useCallback} from 'react';

import H1 from '../../../docs/components/H1';
import Code from '../../../docs/components/Code';
import Paragraph from '../../../docs/components/Paragraph';
import Box from '../../components/Box/Box';
import Text from '../../components/Text/Text';
import Button from '../../components/Button/Button';
import useToast from './useToast';
import {slitInHorizontalAnimation} from '../../animations/slitHorizontal';

export const title = 'useToast';
export const route = '/use-toast';
export const json = null;

export default function useToastDocs() {
	const {addToast, removeToast, removeAllToasts} = useToast();

	const handleClick = useCallback(() =>
		addToast(
			() => (
				<Box background="primary" p="1rem">
					<Text color="white">I'm content in toast!</Text>
				</Box>
			),
			{duration: 5000, entryAnimation: slitInHorizontalAnimation()}
		)
	);

	return (
		<>
			<H1>useToast</H1>
			<Code language="js" code="import {useToast} from 'koldy-ui';" />
			<Paragraph>
				Use <code>useToast</code> hook to access functions for adding and removing toasts. Using functions, you're not forced to render{' '}
				<code>{'<Toast>'}</code> component yourself every time.
			</Paragraph>
			<Code
				language="js"
				showCodeFirst
				code={`
import React, {useCallback} from 'react';
import {useToast, Box, Text, Button, slitInHorizontalAnimation} from 'koldy-ui';

export default function MyApp() {
  const {addToast, removeToast, removeAllToasts} = useToast();

  const handleClick = useCallback(() =>
    addToast(() => (
      <Box background="primary" p="1rem">
        <Text color="white">I'm content in toast!</Text>
      </Box>
    ), {duration: 5000, entryAnimation: slitInHorizontalAnimation()})
  ));
  
  return (
    <Button onClick={handleClick}>Show!</Button>
  );
};
      `}
			>
				<Button onClick={handleClick}>Show!</Button>
			</Code>
		</>
	);
}
