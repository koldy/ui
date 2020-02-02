import React from 'react';
import PropTypes from 'prop-types';

import Props from '../../../docs/components/Props';
import AvailableKeys from '../../../docs/components/AvailableKeys';

const TextDocs = function({component}) {
	return (
		<Props title={`Props for ${component}.Text`} hash={`${component}-text-props`}>
			<Props.Prop name="children" type={['string', 'number', 'node']} required>
				The content you want to put.
			</Props.Prop>
			<Props.Prop name="flex" type={['string', 'number']}>
				All elements within the box field's container are aligned with <code>inline-flex</code>, so if you want to provide custom width or
				relative width, you may use this prop. This is standard CSS <code>flex</code> property.
			</Props.Prop>
			<Props.Prop name="width" type={['string', 'number']}>
				If you want to set custom width on the content's width, then use this prop.
			</Props.Prop>
			<Props.Prop name="alignSelf" type="string">
				All elements within the box field's container are aligned with <code>inline-flex</code>, so if you want to customize the position of
				this component, then use this prop. It is standard CSS <code>align-self</code> property, so allowed values are:
				<AvailableKeys data={['auto', 'flex-start', 'flex-end', 'center', 'baseline', 'stretch']} />
			</Props.Prop>
			<Props.Prop name="textAlign" type="string" defaultValue="inherit">
				If this component is wider then its inner content, then you may want to set the <code>text-align</code> explicitly.
			</Props.Prop>
			<Props.Prop name="p" />
			<Props.Prop name="pt" />
			<Props.Prop name="pr" />
			<Props.Prop name="pb" />
			<Props.Prop name="pl" />
		</Props>
	);
};

TextDocs.propTypes = {
	component: PropTypes.string.isRequired
};

export default TextDocs;
