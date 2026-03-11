/**
 * Google Translate Integration - Main Export
 */

// Service
export { googleTranslateService, GoogleTranslateService } from './google-translate-service';
export type { GoogleTranslationResponse, GoogleDetectionResponse } from './google-translate-service';

// Hooks
export { useGoogleTranslate, useGoogleTranslateCache } from './useGoogleTranslate';

// Config
export {
    GOOGLE_TRANSLATE_CONFIG,
    GOOGLE_LANGUAGE_CODES,
    LANGUAGE_NAMES,
    type GoogleLanguage,
} from './google-translate.config';
