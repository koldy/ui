import React from 'react';
import ReactDOM from 'react-dom';

import App from './app/Docs';

const div = document.getElementById('app');
const {basename} = div.dataset;

ReactDOM.render(<App basename={basename} />, div);
