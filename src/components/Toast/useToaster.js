import {useReducer} from 'react';
import {omit} from '../../util/helpers';

let uid = 0;
const timers = {};

const toastReducer = function(state, action) {
	switch (action.type) {
		case 'add':
			return [
				...state,
				{
					...omit(action, ['type'])
				}
			];

		case 'remove':
			return [...state.filter((toast) => toast.id !== action.id)];

		case 'remove-all':
			return [];

		default:
			return state;
	}
};

const startTimer = function(id, removeFn, duration) {
	if (!timers[id]) {
		timers[id] = setTimeout(() => {
			delete timers[id];
			removeFn(id);
		}, duration);
	}
};

const dismiss = function(id, removeFn) {
	if (timers[id]) {
		clearTimeout(timers[id]);
		delete timers[id];
	}

	removeFn(id);
};

const createCloseFn = function(id, removeFn) {
	return () => dismiss(id, removeFn);
};

export default () => {
	const [toastList, dispatch] = useReducer(toastReducer, []);

	const removeToast = (id) => {
		if (timers[id]) {
			clearTimeout(timers[id]);
			delete timers[id];
		}

		dispatch({
			type: 'remove',
			id
		});
	};

	const addToast = (componentRenderProp, config = {}) => {
		if (typeof componentRenderProp !== 'function') {
			throw new TypeError(
				'When adding new Toast, first parameter must be render prop function, like: ({closeFn}) => <div>content</div>'
			);
		}

		uid += 1;
		const {position = null, entryAnimation = null, duration = null} = config;

		dispatch({
			type: 'add',
			id: uid,
			componentRenderProp,
			position,
			entryAnimation,
			closeFn: createCloseFn(uid, removeToast)
		});

		if (typeof duration === 'number' && duration > 0) {
			startTimer(uid, removeToast, duration);
		}

		return uid;
	};

	const removeAllToasts = () =>
		dispatch({
			type: 'remove-all'
		});

	return [addToast, toastList, removeToast, removeAllToasts];
};
