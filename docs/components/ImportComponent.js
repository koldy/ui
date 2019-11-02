import React from 'react';
import PropTypes from 'prop-types';

import DocsCode from './DocsCode';

const ImportComponent = function({name}) {
	return (
		<DocsCode>
			<DocsCode.Code>{`import {${name}} from 'koldy-ui';`}</DocsCode.Code>
		</DocsCode>
	);
};

ImportComponent.propTypes = {
	name: PropTypes.string.isRequired
};

export default ImportComponent;
