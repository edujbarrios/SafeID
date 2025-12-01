/**
 * SafeID - Application Constants
 * Immutable constants and enumerations
 */

export const ELEMENT_IDS = {
    UPLOAD_AREA: 'uploadArea',
    FILE_INPUT: 'fileInput',
    SELECT_FILE_BTN: 'selectFileBtn',
    PROCESSING_AREA: 'processingArea',
    PREVIEW_CANVAS: 'previewCanvas',
    WATERMARK_TEXT: 'watermarkText',
    OPACITY: 'opacity',
    OPACITY_VALUE: 'opacityValue',
    FONT_SIZE: 'fontSize',
    FONT_SIZE_VALUE: 'fontSizeValue',
    ROTATION: 'rotation',
    ROTATION_VALUE: 'rotationValue',
    COLOR: 'color',
    DOWNLOAD_BTN: 'downloadBtn',
    RESET_BTN: 'resetBtn'
};

export const CSS_CLASSES = {
    HIDDEN: 'hidden',
    ACTIVE: 'active',
    DRAG_OVER: 'drag-over',
    LOADING: 'loading'
};

export const EVENTS = {
    FILE_SELECT: 'onFileSelect',
    SETTINGS_CHANGE: 'onSettingsChange',
    DOWNLOAD: 'onDownload',
    RESET: 'onReset'
};

export const ERROR_MESSAGES = {
    INVALID_FILE_TYPE: 'Please select a valid image file (JPG, PNG, or WEBP)',
    FILE_TOO_LARGE: 'File size must be less than 10MB',
    LOAD_FAILED: 'Failed to load image. Please try another file.',
    READ_FAILED: 'Failed to read file. Please try again.',
    NO_IMAGE: 'No image to download',
    DOWNLOAD_FAILED: 'Failed to download image. Please try again.',
    EXPORT_FAILED: 'Failed to create image blob'
};

export const SUCCESS_MESSAGES = {
    DOWNLOAD_SUCCESS: 'Image downloaded successfully!'
};

export const WATERMARK_PATTERNS = {
    DIAGONAL: 'diagonal',
    GRID: 'grid',
    SINGLE: 'single'
};
