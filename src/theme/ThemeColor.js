import {isArray} from '../util/helpers';

export default function({colors, theme}) {
	if (theme.inDebug() && !isArray(colors)) {
		theme.error(`Colors array is empty so there's no point of initializing Color`);
	}

	/**
	 * Colors is the array of css colors, either hexadecimal, rgb, rgba or any other value. It must contain
	 * valid css color in order for it to work.
	 *
	 * @type {string[]}
	 */
	this.colors = colors || [];

	this.middle = Math.round(this.colors.length / 2) - 1;
	// if there's 5 elements, we need the middle one and it's position is 2
	// if there's 4 elements, we need the middle (to the left): 1 (which is second in array)

	this.lowest = this.middle - this.colors.length + 1;
	this.highest = this.colors.length - 1 - this.middle;

	/**
	 * Gets the tone according to the colors array
	 *
	 * @param {number|null} index
	 * @return string
	 */
	this.tone = function(index) {
		if (index === null || index < this.lowest) {
			return this.colors[0];
		}

		if (index > this.highest) {
			return this.colors[this.colors.length - 1];
		}

		return this.colors[this.middle + index];
	};
}
