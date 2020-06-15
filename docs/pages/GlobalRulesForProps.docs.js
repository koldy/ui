import React from 'react';
import H1 from '../components/H1';
import Paragraph from '../components/Paragraph';
import List from '../components/List';
import H2 from '../components/H2';

export const route = '/global-rules';

export const title = 'Global Rules For Props';

export default function ColorsDocs() {
	return (
		<>
			<H1>{title}</H1>
			<Paragraph>
				In order to be as much consistent as it can be, all components within the Koldy UI follow the same rules for naming props.
			</Paragraph>
			<Paragraph>When defining the component's look, you usually have four things to think of:</Paragraph>
			<List>
				<List.Item>
					shape - the <code>variant</code> prop
				</List.Item>
				<List.Item>
					color - the <code>color</code> prop
				</List.Item>
				<List.Item>
					size - the <code>size</code> prop
				</List.Item>
				<List.Item>
					width - the <code>width</code> prop
				</List.Item>
			</List>
			<Paragraph>Read the docs for each component to see how the component is using each prop.</Paragraph>
			<H2 hash="margin">Margin props</H2>
			<Paragraph>When component has ability to accept margin props, then it always accepts five different props:</Paragraph>
			<List>
				<List.Item>
					<code>m</code> - the margin - if set, all other margin props are ignored
				</List.Item>
				<List.Item>
					<code>mt</code> - the margin top
				</List.Item>
				<List.Item>
					<code>mr</code> - the margin right
				</List.Item>
				<List.Item>
					<code>mb</code> - the margin bottom
				</List.Item>
				<List.Item>
					<code>ml</code> - the margin left
				</List.Item>
			</List>
			<Paragraph>
				All margin props accept <code>string</code> or <code>number</code>. If number is given, then it'll be treated as pixels, otherwise
				it'll use what ever you set.
			</Paragraph>
			<H2 hash="padding">Padding props</H2>
			<Paragraph>When component has ability to accept padding props, then it always accepts five different props:</Paragraph>
			<List>
				<List.Item>
					<code>p</code> - the padding - if set, all other padding props are ignored
				</List.Item>
				<List.Item>
					<code>pt</code> - the padding top
				</List.Item>
				<List.Item>
					<code>pr</code> - the padding right
				</List.Item>
				<List.Item>
					<code>pb</code> - the padding bottom
				</List.Item>
				<List.Item>
					<code>pl</code> - the padding left
				</List.Item>
			</List>
			<Paragraph>
				All padding props accept <code>string</code> or <code>number</code>. If number is given, then it'll be treated as pixels, otherwise
				it'll use what ever you set.
			</Paragraph>
		</>
	);
}
