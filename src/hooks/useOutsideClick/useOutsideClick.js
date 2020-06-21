import {useEffect} from 'react';

import {isArray} from '../../util/helpers';

/**
 * Hook that detects outside click.
 * @param {object|object[]} ref
 * @param callback
 * @param {object|object[]|null} ignoreRef
 */
const useOutsideClick = (ref, callback, ignoreRef = null) => {
	const handleClick = (e) => {
		let doContinue = true;

		// stop executing this function is we detect the click inside of ignored refs
		if (ignoreRef) {
			if (isArray(ignoreRef)) {
				ignoreRef.forEach((r) => {
					if (r.current && r.current.contains(e.target)) {
						doContinue = false;
					}
				});
			} else if (ignoreRef.current && ignoreRef.current.contains(e.target)) {
				doContinue = false;
			}
		}

		if (doContinue) {
			if (isArray(ref)) {
				ref.forEach((r) => {
					if (r.current && !r.current.contains(e.target)) {
						callback();
					}
				});
			} else if (ref.current && !ref.current.contains(e.target)) {
				callback();
			}
		}
	};

	useEffect(() => {
		document.addEventListener('click', handleClick);

		return () => {
			document.removeEventListener('click', handleClick);
		};
	}, []);
};

export default useOutsideClick;
