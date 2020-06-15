import React from 'react';
import styled from 'styled-components';

const Footer = function() {
	return <StyledFooter>&copy; 2020 Koldy UI</StyledFooter>;
};

const StyledFooter = styled.footer`
	display: block;
	padding: 2rem;
	text-align: center;
`;

export default Footer;
