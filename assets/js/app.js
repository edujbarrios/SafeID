/**
 * SafeID - Main Application Entry Point
 * Application initialization and coordination
 */

import { WatermarkEngine } from './modules/watermark/engine.js';
import { exportAndDownload } from './modules/watermark/export.js';
import { UIController } from './modules/ui/controller.js';
import { readFileAsDataURL } from './modules/utils/file.js';
import { loadImage } from './modules/utils/image.js';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from './core/constants.js';

class SafeIDApp {
    constructor() {
        this.watermarkEngine = null;
        this.uiController = null;
        this.currentImage = null;
    }

    /**
     * Initialize application
     */
    async init() {
        if (!this.checkBrowserCompatibility()) {
            return;
        }

        this.watermarkEngine = new WatermarkEngine();
        this.uiController = new UIController();

        this.uiController.initialize();
        this.registerCallbacks();
        this.initializePageFeatures();

        console.log('SafeID initialized successfully');
    }

    /**
     * Register UI callbacks
     */
    registerCallbacks() {
        this.uiController.on('onFileSelect', (file) => this.handleFileSelect(file));
        this.uiController.on('onSettingsChange', (settings) => this.handleSettingsChange(settings));
        this.uiController.on('onDownload', () => this.handleDownload());
        this.uiController.on('onReset', () => this.handleReset());
    }

    /**
     * Handle file selection
     * @param {File} file - Selected file
     */
    async handleFileSelect(file) {
        try {
            const dataURL = await readFileAsDataURL(file);
            const image = await loadImage(dataURL);
            
            this.currentImage = image;
            
            const canvas = this.uiController.getCanvas();
            this.watermarkEngine.initialize(canvas, image);
            
            const settings = this.uiController.getSettings();
            this.watermarkEngine.updateSettings(settings);
            this.watermarkEngine.render();
            
            this.uiController.showProcessingArea();
            this.uiController.setDownloadEnabled(true);
            
        } catch (error) {
            console.error('File processing error:', error);
            this.uiController.showError(error.message || ERROR_MESSAGES.LOAD_FAILED);
        }
    }

    /**
     * Handle settings change
     * @param {Object} newSettings - New settings
     */
    handleSettingsChange(newSettings) {
        if (this.watermarkEngine && this.currentImage) {
            this.watermarkEngine.updateSettings(newSettings);
        }
    }

    /**
     * Handle download
     */
    async handleDownload() {
        if (!this.watermarkEngine || !this.currentImage) {
            this.uiController.showError(ERROR_MESSAGES.NO_IMAGE);
            return;
        }

        try {
            const canvas = this.watermarkEngine.getCanvas();
            await exportAndDownload(canvas);
            this.uiController.showSuccess(SUCCESS_MESSAGES.DOWNLOAD_SUCCESS);
            
        } catch (error) {
            console.error('Download error:', error);
            this.uiController.showError(ERROR_MESSAGES.DOWNLOAD_FAILED);
        }
    }

    /**
     * Handle reset
     */
    handleReset() {
        this.currentImage = null;
        this.watermarkEngine = new WatermarkEngine();
        this.uiController.showUploadArea();
        this.uiController.setDownloadEnabled(false);
    }

    /**
     * Initialize page features
     */
    initializePageFeatures() {
        this.initSmoothScrolling();
        this.showPageLoadAnimation();
        this.handlePageVisibility();
        this.preventAccidentalUnload();
    }

    /**
     * Initialize smooth scrolling
     */
    initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    /**
     * Show page load animation
     */
    showPageLoadAnimation() {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.3s ease';
            document.body.style.opacity = '1';
        }, 100);
    }

    /**
     * Handle page visibility changes
     */
    handlePageVisibility() {
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                console.log('SafeID: Page hidden');
            } else {
                console.log('SafeID: Page visible');
            }
        });
    }

    /**
     * Prevent accidental page unload
     */
    preventAccidentalUnload() {
        window.addEventListener('beforeunload', (e) => {
            if (this.currentImage) {
                e.preventDefault();
                e.returnValue = 'You have an image in progress. Are you sure you want to leave?';
                return e.returnValue;
            }
        });
    }

    /**
     * Check browser compatibility
     * @returns {boolean}
     */
    checkBrowserCompatibility() {
        const canvas = document.createElement('canvas');
        if (!canvas.getContext || !canvas.getContext('2d')) {
            alert('Your browser does not support HTML5 Canvas. Please use a modern browser.');
            return false;
        }

        if (!window.FileReader) {
            alert('Your browser does not support the FileReader API. Please use a modern browser.');
            return false;
        }

        return true;
    }
}

// Initialize application when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        const app = new SafeIDApp();
        app.init();
    });
} else {
    const app = new SafeIDApp();
    app.init();
}
