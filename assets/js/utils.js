/**
 * Determine if the current window is in electron or in a browser
 * @returns {boolean} - {@link true} if electron, {@link false} if browser
 */
function isElectron() {
	// Renderer process
	if (typeof window !== 'undefined' && typeof window.process === 'object' && window.process.type === 'renderer') {
		return true;
	}

	// Main process
	if (typeof process !== 'undefined' && typeof process.versions === 'object' && !!process.versions.electron) {
		return true;
	}

	// Detect the user agent when the `nodeIntegration` option is set to true
	if (typeof navigator === 'object' && typeof navigator.userAgent === 'string' && navigator.userAgent.indexOf('Electron') >= 0) {
		return true;
	}

	return false;
}

/**
 * Get a random number between min and max
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function randomNumber(min, max) {
	return Math.random() * (max - min) + min;
}

