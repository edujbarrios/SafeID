/**
 * SafeID - UI Controller
 * Handles all user interface interactions and events
 */

class UIController {
    constructor() {
        this.elements = {};
        this.callbacks = {};
    }

    /**
     * Initialize UI elements
     */
    initialize() {
        // Get all DOM elements
        this.elements = {
            uploadArea: document.getElementById('uploadArea'),
            fileInput: document.getElementById('fileInput'),
            selectFileBtn: document.getElementById('selectFileBtn'),
            processingArea: document.getElementById('processingArea'),
            previewCanvas: document.getElementById('previewCanvas'),
            watermarkText: document.getElementById('watermarkText'),
            opacity: document.getElementById('opacity'),
            opacityValue: document.getElementById('opacityValue'),
            fontSize: document.getElementById('fontSize'),
            fontSizeValue: document.getElementById('fontSizeValue'),
            rotation: document.getElementById('rotation'),
            rotationValue: document.getElementById('rotationValue'),
            color: document.getElementById('color'),
            downloadBtn: document.getElementById('downloadBtn'),
            resetBtn: document.getElementById('resetBtn')
        };

        this.bindEvents();
        this.initializeFAQ();
    }

    /**
     * Bind all event listeners
     */
    bindEvents() {
        // File selection
        this.elements.selectFileBtn.addEventListener('click', () => {
            this.elements.fileInput.click();
        });

        this.elements.fileInput.addEventListener('change', (e) => {
            if (e.target.files && e.target.files[0]) {
                this.handleFileSelect(e.target.files[0]);
            }
        });

        // Drag and drop
        this.elements.uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            this.elements.uploadArea.classList.add('drag-over');
        });

        this.elements.uploadArea.addEventListener('dragleave', () => {
            this.elements.uploadArea.classList.remove('drag-over');
        });

        this.elements.uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            this.elements.uploadArea.classList.remove('drag-over');
            
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                this.handleFileSelect(e.dataTransfer.files[0]);
            }
        });

        // Watermark controls
        this.elements.watermarkText.addEventListener('input', (e) => {
            if (this.callbacks.onSettingsChange) {
                this.callbacks.onSettingsChange({ text: e.target.value });
            }
        });

        this.elements.opacity.addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            this.elements.opacityValue.textContent = `${value}%`;
            if (this.callbacks.onSettingsChange) {
                this.callbacks.onSettingsChange({ opacity: value / 100 });
            }
        });

        this.elements.fontSize.addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            this.elements.fontSizeValue.textContent = `${value}px`;
            if (this.callbacks.onSettingsChange) {
                this.callbacks.onSettingsChange({ fontSize: value });
            }
        });

        this.elements.rotation.addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            this.elements.rotationValue.textContent = `${value}°`;
            if (this.callbacks.onSettingsChange) {
                this.callbacks.onSettingsChange({ rotation: value });
            }
        });

        this.elements.color.addEventListener('input', (e) => {
            if (this.callbacks.onSettingsChange) {
                this.callbacks.onSettingsChange({ color: e.target.value });
            }
        });

        // Action buttons
        this.elements.downloadBtn.addEventListener('click', () => {
            if (this.callbacks.onDownload) {
                this.callbacks.onDownload();
            }
        });

        this.elements.resetBtn.addEventListener('click', () => {
            if (this.callbacks.onReset) {
                this.callbacks.onReset();
            }
        });
    }

    /**
     * Initialize FAQ accordion
     */
    initializeFAQ() {
        const faqQuestions = document.querySelectorAll('.faq-question');
        
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const faqItem = question.parentElement;
                const isActive = faqItem.classList.contains('active');
                
                // Close all other FAQ items
                document.querySelectorAll('.faq-item').forEach(item => {
                    item.classList.remove('active');
                });
                
                // Toggle current item
                if (!isActive) {
                    faqItem.classList.add('active');
                }
            });
        });
    }

    /**
     * Handle file selection
     */
    handleFileSelect(file) {
        // Validate file type
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            this.showError('Please select a valid image file (JPG, PNG, or WEBP)');
            return;
        }

        // Validate file size (max 10MB)
        const maxSize = 10 * 1024 * 1024;
        if (file.size > maxSize) {
            this.showError('File size must be less than 10MB');
            return;
        }

        if (this.callbacks.onFileSelect) {
            this.callbacks.onFileSelect(file);
        }
    }

    /**
     * Show processing area and hide upload area
     */
    showProcessingArea() {
        this.elements.uploadArea.classList.add('hidden');
        this.elements.processingArea.classList.remove('hidden');
        
        // Smooth scroll to processing area
        this.elements.processingArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    /**
     * Show upload area and hide processing area
     */
    showUploadArea() {
        this.elements.uploadArea.classList.remove('hidden');
        this.elements.processingArea.classList.add('hidden');
        this.elements.fileInput.value = '';
        
        // Smooth scroll to upload area
        this.elements.uploadArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    /**
     * Get canvas element
     */
    getCanvas() {
        return this.elements.previewCanvas;
    }

    /**
     * Get current watermark settings from UI
     */
    getSettings() {
        return {
            text: this.elements.watermarkText.value || 'CONFIDENTIAL DOCUMENT',
            opacity: parseInt(this.elements.opacity.value) / 100,
            fontSize: parseInt(this.elements.fontSize.value),
            rotation: parseInt(this.elements.rotation.value),
            color: this.elements.color.value
        };
    }

    /**
     * Show error message
     */
    showError(message) {
        alert(message); // Simple alert for now, can be enhanced with custom modal
    }

    /**
     * Show success message
     */
    showSuccess(message) {
        alert(message);
    }

    /**
     * Register callback functions
     */
    on(event, callback) {
        this.callbacks[event] = callback;
    }

    /**
     * Enable/disable download button
     */
    setDownloadEnabled(enabled) {
        this.elements.downloadBtn.disabled = !enabled;
    }

    /**
     * Update button loading state
     */
    setButtonLoading(button, loading) {
        if (loading) {
            button.disabled = true;
            button.dataset.originalText = button.textContent;
            button.textContent = 'Processing...';
        } else {
            button.disabled = false;
            button.textContent = button.dataset.originalText || button.textContent;
        }
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UIController;
}
