import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const H1 = function(props) {
	const {children} = props;

	useEffect(() => {
		if (children) {
			document.title = children;
		}
	}, [children]);

	return <StyledH1>{children}</StyledH1>;
};

H1.propTypes = {
	children: PropTypes.string
};

const StyledH1 = styled.h1`
	display: block;
	line-height: 1.6;
	width: 100%;
	font-size: 2.6rem;
	margin: 0;
`;

export default H1;
