/**
 * SafeID - UI Controller
 * Main UI state management and control
 */

import { ELEMENT_IDS, CSS_CLASSES, ERROR_MESSAGES, SUCCESS_MESSAGES } from '../../core/constants.js';
import { DEFAULT_SETTINGS } from '../../core/config.js';
import { validateFile } from '../utils/file.js';
import { EventHandlers } from './events.js';

export class UIController {
    constructor() {
        this.elements = {};
        this.callbacks = {};
        this.eventHandlers = new EventHandlers(this);
    }

    /**
     * Initialize UI elements and bind events
     */
    initialize() {
        this.cacheElements();
        this.bindEvents();
        this.initializeFAQ();
    }

    /**
     * Cache DOM elements
     */
    cacheElements() {
        Object.keys(ELEMENT_IDS).forEach(key => {
            this.elements[key] = document.getElementById(ELEMENT_IDS[key]);
        });
    }

    /**
     * Bind event listeners
     */
    bindEvents() {
        const { elements, eventHandlers } = this;
        
        // File selection
        elements.SELECT_FILE_BTN.addEventListener('click', () => {
            elements.FILE_INPUT.click();
        });

        elements.FILE_INPUT.addEventListener('change', 
            (e) => eventHandlers.onFileInputChange(e));

        // Drag and drop
        elements.UPLOAD_AREA.addEventListener('dragover', 
            (e) => eventHandlers.onDragOver(e));
        elements.UPLOAD_AREA.addEventListener('dragleave', 
            (e) => eventHandlers.onDragLeave(e));
        elements.UPLOAD_AREA.addEventListener('drop', 
            (e) => eventHandlers.onDrop(e));

        // Watermark controls
        elements.WATERMARK_TEXT.addEventListener('input', 
            (e) => eventHandlers.onWatermarkTextInput(e));
        
        elements.OPACITY.addEventListener('input', 
            (e) => eventHandlers.onOpacityChange(e, elements.OPACITY_VALUE));
        
        elements.FONT_SIZE.addEventListener('input', 
            (e) => eventHandlers.onFontSizeChange(e, elements.FONT_SIZE_VALUE));
        
        elements.ROTATION.addEventListener('input', 
            (e) => eventHandlers.onRotationChange(e, elements.ROTATION_VALUE));
        
        elements.COLOR.addEventListener('input', 
            (e) => eventHandlers.onColorChange(e));

        // Action buttons
        elements.DOWNLOAD_BTN.addEventListener('click', 
            () => eventHandlers.onDownloadClick());
        
        elements.RESET_BTN.addEventListener('click', 
            () => eventHandlers.onResetClick());
    }

    /**
     * Initialize FAQ accordion
     */
    initializeFAQ() {
        const faqQuestions = document.querySelectorAll('.faq-question');
        
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                this.eventHandlers.onFAQClick(question.parentElement);
            });
        });
    }

    /**
     * Handle file selection
     * @param {File} file - Selected file
     */
    handleFileSelect(file) {
        const validation = validateFile(file);
        
        if (!validation.isValid) {
            this.showError(validation.error);
            return;
        }

        if (this.callbacks.onFileSelect) {
            this.callbacks.onFileSelect(file);
        }
    }

    /**
     * Show processing area
     */
    showProcessingArea() {
        this.elements.UPLOAD_AREA.classList.add(CSS_CLASSES.HIDDEN);
        this.elements.PROCESSING_AREA.classList.remove(CSS_CLASSES.HIDDEN);
        
        this.elements.PROCESSING_AREA.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }

    /**
     * Show upload area
     */
    showUploadArea() {
        this.elements.UPLOAD_AREA.classList.remove(CSS_CLASSES.HIDDEN);
        this.elements.PROCESSING_AREA.classList.add(CSS_CLASSES.HIDDEN);
        this.elements.FILE_INPUT.value = '';
        
        this.elements.UPLOAD_AREA.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }

    /**
     * Get canvas element
     * @returns {HTMLCanvasElement}
     */
    getCanvas() {
        return this.elements.PREVIEW_CANVAS;
    }

    /**
     * Get current settings from UI
     * @returns {Object}
     */
    getSettings() {
        return {
            text: this.elements.WATERMARK_TEXT.value || DEFAULT_SETTINGS.text,
            opacity: parseInt(this.elements.OPACITY.value) / 100,
            fontSize: parseInt(this.elements.FONT_SIZE.value),
            rotation: parseInt(this.elements.ROTATION.value),
            color: this.elements.COLOR.value
        };
    }

    /**
     * Show error message
     * @param {string} message - Error message
     */
    showError(message) {
        alert(message);
    }

    /**
     * Show success message
     * @param {string} message - Success message
     */
    showSuccess(message) {
        alert(message);
    }

    /**
     * Register callback
     * @param {string} event - Event name
     * @param {Function} callback - Callback function
     */
    on(event, callback) {
        this.callbacks[event] = callback;
    }

    /**
     * Enable/disable download button
     * @param {boolean} enabled - Enable state
     */
    setDownloadEnabled(enabled) {
        this.elements.DOWNLOAD_BTN.disabled = !enabled;
    }
}
