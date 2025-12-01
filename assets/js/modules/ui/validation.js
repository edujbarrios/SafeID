/**
 * SafeID - Input Validation Module
 * Input validation and sanitization
 */

import { ERROR_MESSAGES } from '../../core/constants.js';

/**
 * Validate watermark text
 * @param {string} text - Text to validate
 * @returns {Object} - Validation result
 */
export function validateWatermarkText(text) {
    if (!text || text.trim().length === 0) {
        return {
            isValid: false,
            error: 'Watermark text cannot be empty'
        };
    }
    
    if (text.length > 100) {
        return {
            isValid: false,
            error: 'Watermark text must be less than 100 characters'
        };
    }
    
    return { isValid: true, error: null };
}

/**
 * Validate opacity value
 * @param {number} opacity - Opacity value
 * @returns {Object} - Validation result
 */
export function validateOpacity(opacity) {
    if (opacity < 0 || opacity > 1) {
        return {
            isValid: false,
            error: 'Opacity must be between 0 and 1'
        };
    }
    
    return { isValid: true, error: null };
}

/**
 * Validate font size
 * @param {number} fontSize - Font size value
 * @returns {Object} - Validation result
 */
export function validateFontSize(fontSize) {
    if (fontSize < 8 || fontSize > 120) {
        return {
            isValid: false,
            error: 'Font size must be between 8 and 120'
        };
    }
    
    return { isValid: true, error: null };
}

/**
 * Validate rotation angle
 * @param {number} rotation - Rotation angle
 * @returns {Object} - Validation result
 */
export function validateRotation(rotation) {
    if (rotation < -180 || rotation > 180) {
        return {
            isValid: false,
            error: 'Rotation must be between -180 and 180 degrees'
        };
    }
    
    return { isValid: true, error: null };
}

/**
 * Validate color hex code
 * @param {string} color - Hex color code
 * @returns {Object} - Validation result
 */
export function validateColor(color) {
    const hexPattern = /^#[0-9A-Fa-f]{6}$/;
    
    if (!hexPattern.test(color)) {
        return {
            isValid: false,
            error: 'Invalid color format. Use hex format (e.g., #FF0000)'
        };
    }
    
    return { isValid: true, error: null };
}

/**
 * Sanitize text input
 * @param {string} text - Text to sanitize
 * @returns {string} - Sanitized text
 */
export function sanitizeText(text) {
    return text.trim().replace(/[<>]/g, '');
}
