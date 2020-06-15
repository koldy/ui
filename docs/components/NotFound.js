import React from 'react';
import styled from 'styled-components';

import H1 from './H1';
import Paragraph from './Paragraph';

const NotFound = function() {
	return (
		<StyledNotFound>
			<H1>Not Found</H1>
			<Paragraph>Requested route wasn't found.</Paragraph>
		</StyledNotFound>
	);
};

const StyledNotFound = styled.div`
	display: block;
`;

export default NotFound;
