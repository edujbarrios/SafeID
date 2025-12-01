/**
 * SafeID - Image Export Module
 * Handles image export functionality
 */

import { FILE_CONFIG } from '../../core/config.js';
import { ERROR_MESSAGES } from '../../core/constants.js';
import { generateFilename } from '../utils/file.js';

/**
 * Export canvas as blob
 * @param {HTMLCanvasElement} canvas - Canvas to export
 * @param {string} format - Export format
 * @param {number} quality - Export quality
 * @returns {Promise<Blob>} - Image blob
 */
export function exportAsBlob(canvas, format = FILE_CONFIG.exportFormat, quality = FILE_CONFIG.exportQuality) {
    return new Promise((resolve, reject) => {
        canvas.toBlob(
            (blob) => {
                if (blob) {
                    resolve(blob);
                } else {
                    reject(new Error(ERROR_MESSAGES.EXPORT_FAILED));
                }
            },
            format,
            quality
        );
    });
}

/**
 * Export canvas as data URL
 * @param {HTMLCanvasElement} canvas - Canvas to export
 * @param {string} format - Export format
 * @param {number} quality - Export quality
 * @returns {string} - Data URL
 */
export function exportAsDataURL(canvas, format = FILE_CONFIG.exportFormat, quality = FILE_CONFIG.exportQuality) {
    return canvas.toDataURL(format, quality);
}

/**
 * Download image from blob
 * @param {Blob} blob - Image blob
 * @param {string} filename - Download filename
 */
export function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.href = url;
    link.download = filename;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setTimeout(() => URL.revokeObjectURL(url), 100);
}

/**
 * Export and download canvas
 * @param {HTMLCanvasElement} canvas - Canvas to export
 * @returns {Promise<void>}
 */
export async function exportAndDownload(canvas) {
    const blob = await exportAsBlob(canvas);
    const filename = generateFilename('safeid-protected', 'png');
    downloadBlob(blob, filename);
}
