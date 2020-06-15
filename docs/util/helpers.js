/**
 * Copies a string to the clipboard. Must be called from within an event handler such as click. May return false if
 * it failed, but this is not always possible. Browser support for Chrome 43+, Firefox 42+, Safari 10+, Edge
 * and IE 10+.IE: The clipboard feature may be disabled by an administrator. By default a prompt is shown the first
 * time the clipboard is used (per session).
 *
 * @param {string} text
 * @return {void}
 * @link http://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
 */
export const copyToClipboard = function(text) {
	if (window.clipboardData && window.clipboardData.setData) {
		// IE specific code path to prevent textarea being shown while dialog is visible.
		window.clipboardData.setData('text/plain', text);
	}

	if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
		const textarea = document.createElement('textarea');
		textarea.textContent = text;
		textarea.style.position = 'fixed'; // Prevent scrolling to bottom of page in MS Edge.
		document.body.appendChild(textarea);
		textarea.select();
		try {
			document.execCommand('copy'); // Security exception may be thrown by some browsers.
		} catch (ex) {
			// Copy to clipboard failed
		} finally {
			document.body.removeChild(textarea);
		}
	}
};

/**
 * @param {string} str
 * @param {string|undefined} charlist
 * @return {string}
 */
export const trim = (str, charlist = undefined) => {
	// eslint-disable-line camelcase
	let whitespace = [
		' ',
		'\n',
		'\r',
		'\t',
		'\f',
		'\x0b',
		'\xa0',
		'\u2000',
		'\u2001',
		'\u2002',
		'\u2003',
		'\u2004',
		'\u2005',
		'\u2006',
		'\u2007',
		'\u2008',
		'\u2009',
		'\u200a',
		'\u200b',
		'\u2028',
		'\u2029',
		'\u3000'
	].join('');
	let l = 0;
	let i = 0;
	str += '';

	if (charlist) {
		whitespace = (charlist + '').replace(/([[\]().?/*{}+$^:])/g, '$1');
	}

	l = str.length;

	for (i = 0; i < l; i++) {
		if (whitespace.indexOf(str.charAt(i)) === -1) {
			str = str.substring(i);
			break;
		}
	}

	l = str.length;

	for (i = l - 1; i >= 0; i--) {
		if (whitespace.indexOf(str.charAt(i)) === -1) {
			str = str.substring(0, i + 1);
			break;
		}
	}

	return whitespace.indexOf(str.charAt(0)) === -1 ? str : '';
};
