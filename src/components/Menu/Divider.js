import React, {useContext} from 'react';
import styled, {css} from 'styled-components';

import MenuContext from './MenuContext';

const Divider = function() {
	const {lineCss} = useContext(MenuContext);
	return <Line lineCss={lineCss} />;
};

const Line = styled.div`
	display: block;
	${({lineCss}) => css(lineCss)}
`;

export default Divider;
