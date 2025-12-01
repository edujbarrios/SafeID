/**
 * SafeID - Main Application
 * Coordinates between UI and Watermark Engine
 */

(function() {
    'use strict';

    // Initialize application
    let watermarkEngine = null;
    let uiController = null;
    let currentImage = null;

    /**
     * Initialize the application
     */
    function init() {
        // Create instances
        watermarkEngine = new WatermarkEngine();
        uiController = new UIController();

        // Initialize UI
        uiController.initialize();

        // Register event callbacks
        uiController.on('onFileSelect', handleFileSelect);
        uiController.on('onSettingsChange', handleSettingsChange);
        uiController.on('onDownload', handleDownload);
        uiController.on('onReset', handleReset);

        console.log('SafeID initialized successfully');
    }

    /**
     * Handle file selection
     */
    function handleFileSelect(file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            const img = new Image();
            
            img.onload = function() {
                currentImage = img;
                
                // Initialize watermark engine with canvas and image
                const canvas = uiController.getCanvas();
                watermarkEngine.initialize(canvas, img);
                
                // Apply initial watermark with settings from UI
                const settings = uiController.getSettings();
                watermarkEngine.updateSettings(settings);
                watermarkEngine.render();
                
                // Show processing area
                uiController.showProcessingArea();
                uiController.setDownloadEnabled(true);
            };

            img.onerror = function() {
                uiController.showError('Failed to load image. Please try another file.');
            };

            img.src = e.target.result;
        };

        reader.onerror = function() {
            uiController.showError('Failed to read file. Please try again.');
        };

        reader.readAsDataURL(file);
    }

    /**
     * Handle watermark settings change
     */
    function handleSettingsChange(newSettings) {
        if (watermarkEngine && currentImage) {
            watermarkEngine.updateSettings(newSettings);
        }
    }

    /**
     * Handle download button click
     */
    async function handleDownload() {
        if (!watermarkEngine || !currentImage) {
            uiController.showError('No image to download');
            return;
        }

        try {
            // Export image as blob
            const blob = await watermarkEngine.exportImage(0.95, 'image/png');
            
            // Create download link
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `safeid-protected-${Date.now()}.png`;
            
            // Trigger download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Clean up
            setTimeout(() => URL.revokeObjectURL(url), 100);
            
            uiController.showSuccess('Image downloaded successfully!');
        } catch (error) {
            console.error('Download error:', error);
            uiController.showError('Failed to download image. Please try again.');
        }
    }

    /**
     * Handle reset button click
     */
    function handleReset() {
        // Reset state
        currentImage = null;
        watermarkEngine = new WatermarkEngine();
        
        // Reset UI
        uiController.showUploadArea();
        uiController.setDownloadEnabled(false);
    }

    /**
     * Handle smooth scrolling for anchor links
     */
    function initSmoothScrolling() {
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
     * Add loading animation
     */
    function showPageLoadAnimation() {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.3s ease';
            document.body.style.opacity = '1';
        }, 100);
    }

    /**
     * Check for browser compatibility
     */
    function checkBrowserCompatibility() {
        // Check for canvas support
        const canvas = document.createElement('canvas');
        if (!canvas.getContext || !canvas.getContext('2d')) {
            alert('Your browser does not support HTML5 Canvas. Please use a modern browser.');
            return false;
        }

        // Check for FileReader support
        if (!window.FileReader) {
            alert('Your browser does not support the FileReader API. Please use a modern browser.');
            return false;
        }

        return true;
    }

    /**
     * Initialize on DOM ready
     */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            if (checkBrowserCompatibility()) {
                init();
                initSmoothScrolling();
                showPageLoadAnimation();
            }
        });
    } else {
        if (checkBrowserCompatibility()) {
            init();
            initSmoothScrolling();
            showPageLoadAnimation();
        }
    }

    // Handle page visibility for performance
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            console.log('SafeID: Page hidden, pausing operations');
        } else {
            console.log('SafeID: Page visible, resuming operations');
        }
    });

    // Prevent accidental page unload if processing
    window.addEventListener('beforeunload', function(e) {
        if (currentImage) {
            e.preventDefault();
            e.returnValue = 'You have an image in progress. Are you sure you want to leave?';
            return e.returnValue;
        }
    });

})();
