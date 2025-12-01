/**
 * SafeID - Watermark Engine
 * Handles all watermark generation and image processing
 */

class WatermarkEngine {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.originalImage = null;
        this.settings = {
            text: 'CONFIDENTIAL DOCUMENT',
            opacity: 0.3,
            fontSize: 24,
            rotation: -30,
            color: '#ff0000',
            pattern: 'diagonal' // diagonal, grid, single
        };
    }

    /**
     * Initialize canvas with image
     */
    initialize(canvas, image) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.originalImage = image;
        
        // Set canvas size to match image
        this.canvas.width = image.width;
        this.canvas.height = image.height;
    }

    /**
     * Update watermark settings
     */
    updateSettings(newSettings) {
        this.settings = { ...this.settings, ...newSettings };
        this.render();
    }

    /**
     * Render the watermarked image
     */
    render() {
        if (!this.ctx || !this.originalImage) return;

        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw original image
        this.ctx.drawImage(this.originalImage, 0, 0);

        // Apply watermark pattern
        this.applyWatermarkPattern();
    }

    /**
     * Apply diagonal watermark pattern for AI resistance
     */
    applyWatermarkPattern() {
        const { text, opacity, fontSize, rotation, color } = this.settings;
        
        // Save context state
        this.ctx.save();

        // Set text properties
        this.ctx.font = `bold ${fontSize}px Arial, sans-serif`;
        this.ctx.fillStyle = color;
        this.ctx.globalAlpha = opacity;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';

        // Calculate spacing for pattern
        const textWidth = this.ctx.measureText(text).width;
        const spacing = Math.max(textWidth * 1.5, 200);
        
        // Calculate number of repetitions needed
        const diagonal = Math.sqrt(
            Math.pow(this.canvas.width, 2) + Math.pow(this.canvas.height, 2)
        );
        const repeatCount = Math.ceil(diagonal / spacing) + 2;

        // Rotate context
        this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
        this.ctx.rotate((rotation * Math.PI) / 180);

        // Draw watermark pattern
        for (let i = -repeatCount; i < repeatCount; i++) {
            for (let j = -repeatCount; j < repeatCount; j++) {
                const x = i * spacing;
                const y = j * spacing;
                
                // Draw main watermark
                this.ctx.fillText(text, x, y);
                
                // Add slight offset watermarks for AI resistance
                this.ctx.globalAlpha = opacity * 0.3;
                this.ctx.fillText(text, x + 2, y + 2);
                this.ctx.globalAlpha = opacity;
            }
        }

        // Restore context state
        this.ctx.restore();

        // Add additional subtle patterns for extra protection
        this.addNoisePattern();
    }

    /**
     * Add subtle noise pattern to make watermark removal harder
     */
    addNoisePattern() {
        this.ctx.save();
        this.ctx.globalAlpha = 0.02;
        this.ctx.fillStyle = this.settings.color;

        // Add random dots across the image
        const dotCount = Math.floor((this.canvas.width * this.canvas.height) / 10000);
        for (let i = 0; i < dotCount; i++) {
            const x = Math.random() * this.canvas.width;
            const y = Math.random() * this.canvas.height;
            this.ctx.fillRect(x, y, 1, 1);
        }

        this.ctx.restore();
    }

    /**
     * Export watermarked image as blob
     */
    async exportImage(quality = 0.95, format = 'image/png') {
        return new Promise((resolve, reject) => {
            this.canvas.toBlob(
                (blob) => {
                    if (blob) {
                        resolve(blob);
                    } else {
                        reject(new Error('Failed to create image blob'));
                    }
                },
                format,
                quality
            );
        });
    }

    /**
     * Export watermarked image as data URL
     */
    exportDataURL(format = 'image/png', quality = 0.95) {
        return this.canvas.toDataURL(format, quality);
    }

    /**
     * Get current canvas
     */
    getCanvas() {
        return this.canvas;
    }

    /**
     * Reset to original image
     */
    reset() {
        if (this.ctx && this.originalImage) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(this.originalImage, 0, 0);
        }
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WatermarkEngine;
}
