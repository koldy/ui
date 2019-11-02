import {useCallback} from 'react';

/**
 * This has to be global
 * @type {{maxZIndex: null, step: number, zIndexes: [], baseZIndex: number}}
 */
const registry = {
	step: 10,
	zIndexes: [], // [{element: *|HTMLElement, zIndex: number}]
	maxZIndex: null,
	baseZIndex: 5000
};

/**
 * Register element to zIndex registry
 * @param {*|string|HTMLElement} el
 * @return {number|null}
 */
const register = function(el) {
	if (!el) {
		return null;
	}

	// first, try to find the element so we don't register it twice
	for (const {element, zIndex: givenIndex} of registry.zIndexes) {
		if (element === el) {
			return givenIndex;
		}
	}

	// we found nothing and we should add this element to the stack
	const givenIndex = registry.maxZIndex === null ? registry.baseZIndex : registry.maxZIndex + registry.step;

	registry.zIndexes.push({
		element: el,
		zIndex: givenIndex
	});

	registry.maxZIndex = givenIndex;
	return givenIndex;
};

/**
 * Unregister element from zIndex registry
 * @param {*|string|HTMLElement} el
 */
const unregister = function(el) {
	if (el && registry.zIndexes.length > 0) {
		// first, try to find the element so we don't register it twice
		let maxZIndex = registry.zIndexes[0].zIndex;
		let removeElement = null;

		for (const [i, {element, zIndex: givenIndex}] of registry.zIndexes.entries()) {
			if (givenIndex > maxZIndex) {
				maxZIndex = givenIndex;
			}

			if (element === el) {
				// found it!
				removeElement = i;
			}
		}

		if (removeElement !== null) {
			registry.zIndexes.splice(removeElement, 1);
		}

		if (registry.zIndexes.length === 0) {
			registry.maxZIndex = null;
		} else {
			registry.maxZIndex = maxZIndex;
		}
	}
};

export default function({theme}) {
	const {zIndex: baseZIndex = 5000} = theme.json();
	registry.baseZIndex = baseZIndex; // constantly update this

	const reg = useCallback((el) => register(el), []);
	const unreg = useCallback((el) => unregister(el), []);

	return {register: reg, unregister: unreg};
}
