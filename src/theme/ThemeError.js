/**
 * This is custom error that will be thrown if there's something in the code that can't be handled. In your project,
 * you can catch ThemeError or simply, catch Error because ThemeError extends Error. If you don't handle it, your
 * UI will crash. Use React's componentDidCatch method for situations like this.
 *
 * @param {string} message
 * @constructor
 */
const ThemeError = function(message) {
	this.constructor.prototype.__proto__ = Error.prototype;
	Error.captureStackTrace(this, this.constructor);
	this.name = this.constructor.name;
	this.message = message;
};

export default ThemeError;
