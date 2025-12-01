/**
 * SafeID - Watermark Patterns Generator
 * Pattern generation for watermarks
 */

/**
 * Calculate diagonal pattern spacing
 * @param {number} textWidth - Width of watermark text
 * @returns {number} - Spacing between watermarks
 */
export function calculateSpacing(textWidth) {
    return Math.max(textWidth * 1.5, 200);
}

/**
 * Calculate number of repetitions needed
 * @param {number} canvasWidth - Canvas width
 * @param {number} canvasHeight - Canvas height
 * @param {number} spacing - Spacing between watermarks
 * @returns {number} - Number of repetitions
 */
export function calculateRepetitions(canvasWidth, canvasHeight, spacing) {
    const diagonal = Math.sqrt(
        Math.pow(canvasWidth, 2) + Math.pow(canvasHeight, 2)
    );
    return Math.ceil(diagonal / spacing) + 2;
}

/**
 * Generate diagonal pattern coordinates
 * @param {number} repeatCount - Number of repetitions
 * @param {number} spacing - Spacing between watermarks
 * @returns {Array} - Array of {x, y} coordinates
 */
export function generateDiagonalPattern(repeatCount, spacing) {
    const coordinates = [];
    
    for (let i = -repeatCount; i < repeatCount; i++) {
        for (let j = -repeatCount; j < repeatCount; j++) {
            coordinates.push({
                x: i * spacing,
                y: j * spacing
            });
        }
    }
    
    return coordinates;
}

/**
 * Generate grid pattern coordinates
 * @param {number} width - Canvas width
 * @param {number} height - Canvas height
 * @param {number} spacing - Spacing between watermarks
 * @returns {Array} - Array of {x, y} coordinates
 */
export function generateGridPattern(width, height, spacing) {
    const coordinates = [];
    const cols = Math.ceil(width / spacing);
    const rows = Math.ceil(height / spacing);
    
    for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
            coordinates.push({
                x: i * spacing - width / 2,
                y: j * spacing - height / 2
            });
        }
    }
    
    return coordinates;
}

/**
 * Generate single watermark coordinate
 * @returns {Array} - Single coordinate at center
 */
export function generateSinglePattern() {
    return [{ x: 0, y: 0 }];
}

/**
 * Get pattern generator function
 * @param {string} patternType - Type of pattern
 * @returns {Function} - Pattern generator function
 */
export function getPatternGenerator(patternType) {
    const generators = {
        'diagonal': generateDiagonalPattern,
        'grid': generateGridPattern,
        'single': generateSinglePattern
    };
    
    return generators[patternType] || generators['diagonal'];
}
