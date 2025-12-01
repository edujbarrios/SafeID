/**
 * SafeID - Application Configuration
 * Central configuration management
 */

export const APP_CONFIG = {
    name: 'SafeID',
    version: '1.0.0',
    author: 'Eduardo J. Barrios'
};

export const DEFAULT_SETTINGS = {
    text: 'CONFIDENTIAL DOCUMENT',
    opacity: 0.3,
    fontSize: 24,
    rotation: -30,
    color: '#ff0000',
    pattern: 'diagonal'
};

export const FILE_CONFIG = {
    maxSize: 10 * 1024 * 1024, // 10MB
    supportedFormats: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
    exportFormat: 'image/png',
    exportQuality: 0.95
};

export const UI_CONFIG = {
    animationDuration: 300,
    scrollBehavior: 'smooth',
    debounceDelay: 150
};
