import React from 'react';
import ReactDOM from 'react-dom';

const div = document.createElement('div');
div.setAttribute('id', 'app');
document.body.prepend(div);

const render = () => {
	const App = require('./app/Docs').default;
	ReactDOM.render(<App />, document.getElementById('app'));
};

render();

if (module.hot) {
	module.hot.accept('./app/Docs', function() {
		render();
	});
}
