/**
 * SafeID - Watermark Engine
 * Core watermarking engine for image processing
 */

import { DEFAULT_SETTINGS } from '../../core/config.js';
import { 
    calculateSpacing, 
    calculateRepetitions, 
    generateDiagonalPattern 
} from './patterns.js';
import { clearCanvas } from '../utils/image.js';

export class WatermarkEngine {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.originalImage = null;
        this.settings = { ...DEFAULT_SETTINGS };
    }

    /**
     * Initialize engine with canvas and image
     * @param {HTMLCanvasElement} canvas - Canvas element
     * @param {HTMLImageElement} image - Image to watermark
     */
    initialize(canvas, image) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.originalImage = image;
        
        this.canvas.width = image.width;
        this.canvas.height = image.height;
    }

    /**
     * Update watermark settings
     * @param {Object} newSettings - New settings to apply
     */
    updateSettings(newSettings) {
        this.settings = { ...this.settings, ...newSettings };
        this.render();
    }

    /**
     * Render watermarked image
     */
    render() {
        if (!this.ctx || !this.originalImage) return;

        clearCanvas(this.canvas);
        this.ctx.drawImage(this.originalImage, 0, 0);
        this.applyWatermark();
    }

    /**
     * Apply watermark to canvas
     */
    applyWatermark() {
        const { text, opacity, fontSize, rotation, color } = this.settings;
        
        this.ctx.save();
        
        // Configure text rendering
        this.ctx.font = `bold ${fontSize}px Arial, sans-serif`;
        this.ctx.fillStyle = color;
        this.ctx.globalAlpha = opacity;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';

        // Calculate pattern parameters
        const textWidth = this.ctx.measureText(text).width;
        const spacing = calculateSpacing(textWidth);
        const repeatCount = calculateRepetitions(
            this.canvas.width, 
            this.canvas.height, 
            spacing
        );

        // Apply transformation
        this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
        this.ctx.rotate((rotation * Math.PI) / 180);

        // Generate and draw pattern
        const coordinates = generateDiagonalPattern(repeatCount, spacing);
        this.drawPattern(coordinates, text, opacity);

        this.ctx.restore();
        this.addNoisePattern();
    }

    /**
     * Draw watermark pattern
     * @param {Array} coordinates - Pattern coordinates
     * @param {string} text - Watermark text
     * @param {number} opacity - Base opacity
     */
    drawPattern(coordinates, text, opacity) {
        coordinates.forEach(({ x, y }) => {
            // Main watermark
            this.ctx.fillText(text, x, y);
            
            // Shadow watermark for AI resistance
            this.ctx.globalAlpha = opacity * 0.3;
            this.ctx.fillText(text, x + 2, y + 2);
            this.ctx.globalAlpha = opacity;
        });
    }

    /**
     * Add subtle noise pattern for extra protection
     */
    addNoisePattern() {
        this.ctx.save();
        this.ctx.globalAlpha = 0.02;
        this.ctx.fillStyle = this.settings.color;

        const dotCount = Math.floor(
            (this.canvas.width * this.canvas.height) / 10000
        );
        
        for (let i = 0; i < dotCount; i++) {
            const x = Math.random() * this.canvas.width;
            const y = Math.random() * this.canvas.height;
            this.ctx.fillRect(x, y, 1, 1);
        }

        this.ctx.restore();
    }

    /**
     * Get current canvas
     * @returns {HTMLCanvasElement}
     */
    getCanvas() {
        return this.canvas;
    }

    /**
     * Reset to original image
     */
    reset() {
        if (this.ctx && this.originalImage) {
            clearCanvas(this.canvas);
            this.ctx.drawImage(this.originalImage, 0, 0);
        }
    }
}
