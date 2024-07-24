export const COLORS_LIST = [
	'#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#33FFF2',
	'#FF8C33', '#8C33FF', '#FF3333', '#33FF8C', '#8CFF33',
	'#FF338C', '#338CFF', '#FFC133', '#C133FF', '#FF5733',
	'#33FFC1', '#5733FF', '#FFC133', '#33A1FF', '#A1FF33'
];

/**
* Generates a random color based on a seed number.
* If no seed is provided, it generates a completely random color.
* @param {number} [seed] - The optional seed number for color generation.
* @returns {string} A color in hexadecimal format.
*/
export const generateColor = (seed?: number): string => {
	if (seed !== undefined) {
		return getSeededHexColor(seed);
	} else {
		return getRandomHexColor();
	}
}

/**
 * Generates a random hexadecimal color based on a seed number.
 * @param {number} seed - The seed number for color generation.
 * @returns {string} A color in hexadecimal format based on the seed.
 */
export const getSeededHexColor = (seed: number): string => {
	// Simple hash function
	const hash = seed % 16777215; // 16777215 is FFFFFF in hexadecimal
	const hex = hash.toString(16).padStart(6, '0');
	return `#${hex}`;
}


/**
* Generates a random hexadecimal color.
* @returns {string} A random color in hexadecimal format.
*/
export const getRandomHexColor = (): string => {
	const letters = '0123456789ABCDEF';
	let color = '#';
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}