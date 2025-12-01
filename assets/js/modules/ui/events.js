/**
 * SafeID - UI Event Handlers
 * Event handling for UI interactions
 */

import { ELEMENT_IDS, CSS_CLASSES } from '../../core/constants.js';

export class EventHandlers {
    constructor(uiController) {
        this.ui = uiController;
    }

    /**
     * Handle file input change
     */
    onFileInputChange(e) {
        if (e.target.files && e.target.files[0]) {
            this.ui.handleFileSelect(e.target.files[0]);
        }
    }

    /**
     * Handle drag over event
     */
    onDragOver(e) {
        e.preventDefault();
        e.currentTarget.classList.add(CSS_CLASSES.DRAG_OVER);
    }

    /**
     * Handle drag leave event
     */
    onDragLeave(e) {
        e.currentTarget.classList.remove(CSS_CLASSES.DRAG_OVER);
    }

    /**
     * Handle drop event
     */
    onDrop(e) {
        e.preventDefault();
        e.currentTarget.classList.remove(CSS_CLASSES.DRAG_OVER);
        
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            this.ui.handleFileSelect(e.dataTransfer.files[0]);
        }
    }

    /**
     * Handle watermark text input
     */
    onWatermarkTextInput(e) {
        if (this.ui.callbacks.onSettingsChange) {
            this.ui.callbacks.onSettingsChange({ text: e.target.value });
        }
    }

    /**
     * Handle opacity slider change
     */
    onOpacityChange(e, valueDisplay) {
        const value = parseInt(e.target.value);
        valueDisplay.textContent = `${value}%`;
        
        if (this.ui.callbacks.onSettingsChange) {
            this.ui.callbacks.onSettingsChange({ opacity: value / 100 });
        }
    }

    /**
     * Handle font size slider change
     */
    onFontSizeChange(e, valueDisplay) {
        const value = parseInt(e.target.value);
        valueDisplay.textContent = `${value}px`;
        
        if (this.ui.callbacks.onSettingsChange) {
            this.ui.callbacks.onSettingsChange({ fontSize: value });
        }
    }

    /**
     * Handle rotation slider change
     */
    onRotationChange(e, valueDisplay) {
        const value = parseInt(e.target.value);
        valueDisplay.textContent = `${value}°`;
        
        if (this.ui.callbacks.onSettingsChange) {
            this.ui.callbacks.onSettingsChange({ rotation: value });
        }
    }

    /**
     * Handle color picker change
     */
    onColorChange(e) {
        if (this.ui.callbacks.onSettingsChange) {
            this.ui.callbacks.onSettingsChange({ color: e.target.value });
        }
    }

    /**
     * Handle download button click
     */
    onDownloadClick() {
        if (this.ui.callbacks.onDownload) {
            this.ui.callbacks.onDownload();
        }
    }

    /**
     * Handle reset button click
     */
    onResetClick() {
        if (this.ui.callbacks.onReset) {
            this.ui.callbacks.onReset();
        }
    }

    /**
     * Handle FAQ question click
     */
    onFAQClick(faqItem) {
        const isActive = faqItem.classList.contains(CSS_CLASSES.ACTIVE);
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove(CSS_CLASSES.ACTIVE);
        });
        
        // Toggle current item
        if (!isActive) {
            faqItem.classList.add(CSS_CLASSES.ACTIVE);
        }
    }
}
