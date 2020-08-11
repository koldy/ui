import React from 'react';
import PropTypes from 'prop-types';

const OnRowHover = function ({children}) {
	return <div className="on-row-hover">{children}</div>;
};

OnRowHover.propTypes = {
	children: PropTypes.node
};

export default OnRowHover;
