/**
 * SafeID - File Utilities
 * File handling and validation utilities
 */

import { FILE_CONFIG } from '../core/config.js';
import { ERROR_MESSAGES } from '../core/constants.js';

/**
 * Validate file type
 * @param {File} file - File to validate
 * @returns {Object} - Validation result
 */
export function validateFileType(file) {
    const isValid = FILE_CONFIG.supportedFormats.includes(file.type);
    return {
        isValid,
        error: isValid ? null : ERROR_MESSAGES.INVALID_FILE_TYPE
    };
}

/**
 * Validate file size
 * @param {File} file - File to validate
 * @returns {Object} - Validation result
 */
export function validateFileSize(file) {
    const isValid = file.size <= FILE_CONFIG.maxSize;
    return {
        isValid,
        error: isValid ? null : ERROR_MESSAGES.FILE_TOO_LARGE
    };
}

/**
 * Validate file completely
 * @param {File} file - File to validate
 * @returns {Object} - Validation result
 */
export function validateFile(file) {
    const typeCheck = validateFileType(file);
    if (!typeCheck.isValid) return typeCheck;
    
    const sizeCheck = validateFileSize(file);
    if (!sizeCheck.isValid) return sizeCheck;
    
    return { isValid: true, error: null };
}

/**
 * Read file as data URL
 * @param {File} file - File to read
 * @returns {Promise<string>} - Data URL
 */
export function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = () => reject(new Error(ERROR_MESSAGES.READ_FAILED));
        
        reader.readAsDataURL(file);
    });
}

/**
 * Generate download filename
 * @param {string} prefix - Filename prefix
 * @param {string} extension - File extension
 * @returns {string} - Generated filename
 */
export function generateFilename(prefix = 'safeid-protected', extension = 'png') {
    const timestamp = Date.now();
    return `${prefix}-${timestamp}.${extension}`;
}
