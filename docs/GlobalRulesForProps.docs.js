import React from 'react';

import DocsTitle from './components/DocsTitle';
import DocsText from './components/DocsText';
import DocsSubTitle from './components/DocsSubTitle';

export const title = 'Global rules for props';
export const slug = 'global-rules-for-props';
export const json = null;

export const Documentation = function() {
	return (
		<>
			<DocsTitle hash="colors">Global rules for props</DocsTitle>
			<DocsText>
				In order to be as much consistent as it can be, all components within the Koldy UI follow the same rules for
				naming props.
			</DocsText>
			<DocsText>
				<p>When defining the component's look, you usually have four things to think of:</p>
				<ul>
					<li>
						shape - the <code>variant</code> prop
					</li>
					<li>
						color - the <code>color</code> prop
					</li>
					<li>
						size - the <code>size</code> prop
					</li>
					<li>
						width - the <code>width</code> prop
					</li>
				</ul>
			</DocsText>
			<DocsText>Read the docs for each component to see how the component is using each prop.</DocsText>
			<DocsSubTitle hash="margin">Margin props</DocsSubTitle>
			<DocsText>
				When component has ability to accept margin props, then it always accepts five different props:
			</DocsText>
			<DocsText>
				<ul>
					<li>
						<strong>m</strong> - the margin - if set, all other margin props are ignored
					</li>
					<li>
						<strong>mt</strong> - the margin top
					</li>
					<li>
						<strong>mr</strong> - the margin right
					</li>
					<li>
						<strong>mb</strong> - the margin bottom
					</li>
					<li>
						<strong>ml</strong> - the margin left
					</li>
				</ul>
			</DocsText>
			<DocsText>
				All margin props accept <code>string</code> or <code>number</code>. If number is given, then it'll be treated as
				pixels, otherwise it'll use what ever you set.
			</DocsText>
			<DocsSubTitle hash="padding">Padding props</DocsSubTitle>
			<DocsText>
				When component has ability to accept padding props, then it always accepts five different props:
			</DocsText>
			<DocsText>
				<ul>
					<li>
						<strong>p</strong> - the padding - if set, all other padding props are ignored
					</li>
					<li>
						<strong>pt</strong> - the padding top
					</li>
					<li>
						<strong>pr</strong> - the padding right
					</li>
					<li>
						<strong>pb</strong> - the padding bottom
					</li>
					<li>
						<strong>pl</strong> - the padding left
					</li>
				</ul>
			</DocsText>
			<DocsText>
				All padding props accept <code>string</code> or <code>number</code>. If number is given, then it'll be treated
				as pixels, otherwise it'll use what ever you set.
			</DocsText>
		</>
	);
};
