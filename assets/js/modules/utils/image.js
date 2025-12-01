/**
 * SafeID - Image Utilities
 * Image loading and processing utilities
 */

import { ERROR_MESSAGES } from '../core/constants.js';

/**
 * Load image from data URL
 * @param {string} dataURL - Image data URL
 * @returns {Promise<HTMLImageElement>} - Loaded image
 */
export function loadImage(dataURL) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(ERROR_MESSAGES.LOAD_FAILED));
        
        img.src = dataURL;
    });
}

/**
 * Calculate scaled dimensions
 * @param {number} width - Original width
 * @param {number} height - Original height
 * @param {number} maxWidth - Maximum width
 * @param {number} maxHeight - Maximum height
 * @returns {Object} - Scaled dimensions
 */
export function calculateScaledDimensions(width, height, maxWidth, maxHeight) {
    const aspectRatio = width / height;
    
    let newWidth = width;
    let newHeight = height;
    
    if (width > maxWidth) {
        newWidth = maxWidth;
        newHeight = newWidth / aspectRatio;
    }
    
    if (newHeight > maxHeight) {
        newHeight = maxHeight;
        newWidth = newHeight * aspectRatio;
    }
    
    return { width: newWidth, height: newHeight };
}

/**
 * Get image data from canvas
 * @param {HTMLCanvasElement} canvas - Canvas element
 * @returns {ImageData} - Image data
 */
export function getImageData(canvas) {
    const ctx = canvas.getContext('2d');
    return ctx.getImageData(0, 0, canvas.width, canvas.height);
}

/**
 * Clear canvas
 * @param {HTMLCanvasElement} canvas - Canvas to clear
 */
export function clearCanvas(canvas) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
