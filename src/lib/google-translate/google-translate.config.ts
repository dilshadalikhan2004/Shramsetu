/**
 * Google Cloud Translation API Configuration
 * 
 * Google Cloud Translation provides:
 * - 100+ languages (including all Indian languages)
 * - High-quality neural machine translation
 * - Auto language detection
 * - Batch translation support
 * 
 * Setup: https://cloud.google.com/translate/docs/setup
 * Pricing: $20 per 1M characters
 */

export const GOOGLE_TRANSLATE_CONFIG = {
    // Get your API key from: https://console.cloud.google.com/apis/credentials
    API_KEY: process.env.NEXT_PUBLIC_GOOGLE_TRANSLATE_API_KEY || '',
    BASE_URL: 'https://translation.googleapis.com/language/translate/v2',

    // Endpoints
    endpoints: {
        TRANSLATE: '',  // POST to BASE_URL
        DETECT: '/detect',
        LANGUAGES: '/languages',
    }
};

// Language code mapping for Google Translate
export const GOOGLE_LANGUAGE_CODES = {
    // Indian Languages
    'en': 'en',      // English
    'hi': 'hi',      // Hindi
    'ta': 'ta',      // Tamil
    'te': 'te',      // Telugu
    'kn': 'kn',      // Kannada
    'mr': 'mr',      // Marathi
    'gu': 'gu',      // Gujarati
    'bn': 'bn',      // Bengali
    'ml': 'ml',      // Malayalam
    'pa': 'pa',      // Punjabi
    'or': 'or',      // Odia
    'as': 'as',      // Assamese
    'ur': 'ur',      // Urdu
    'ne': 'ne',      // Nepali
    'sd': 'sd',      // Sindhi
    'sa': 'sa',      // Sanskrit

    // Popular International Languages
    'es': 'es',      // Spanish
    'fr': 'fr',      // French
    'de': 'de',      // German
    'zh': 'zh-CN',   // Chinese (Simplified)
    'ar': 'ar',      // Arabic
    'ja': 'ja',      // Japanese
    'ko': 'ko',      // Korean
    'pt': 'pt',      // Portuguese
    'ru': 'ru',      // Russian
    'it': 'it',      // Italian
} as const;

// All supported languages (100+)
export const ALL_GOOGLE_LANGUAGES = {
    ...GOOGLE_LANGUAGE_CODES,
    // Add more as needed from: https://cloud.google.com/translate/docs/languages
};

export type GoogleLanguage = keyof typeof GOOGLE_LANGUAGE_CODES;

/**
 * Popular language display names
 */
export const LANGUAGE_NAMES: Record<GoogleLanguage, { native: string; english: string }> = {
    'en': { native: 'English', english: 'English' },
    'hi': { native: 'हिन्दी', english: 'Hindi' },
    'ta': { native: 'தமிழ்', english: 'Tamil' },
    'te': { native: 'తెలుగు', english: 'Telugu' },
    'kn': { native: 'ಕನ್ನಡ', english: 'Kannada' },
    'mr': { native: 'मराठी', english: 'Marathi' },
    'gu': { native: 'ગુજરાતી', english: 'Gujarati' },
    'bn': { native: 'বাংলা', english: 'Bengali' },
    'ml': { native: 'മലയാളം', english: 'Malayalam' },
    'pa': { native: 'ਪੰਜਾਬੀ', english: 'Punjabi' },
    'or': { native: 'ଓଡ଼ିଆ', english: 'Odia' },
    'as': { native: 'অসমীয়া', english: 'Assamese' },
    'ur': { native: 'اردو', english: 'Urdu' },
    'ne': { native: 'नेपाली', english: 'Nepali' },
    'sd': { native: 'سنڌي', english: 'Sindhi' },
    'sa': { native: 'संस्कृतम्', english: 'Sanskrit' },
    'es': { native: 'Español', english: 'Spanish' },
    'fr': { native: 'Français', english: 'French' },
    'de': { native: 'Deutsch', english: 'German' },
    'zh': { native: '中文', english: 'Chinese' },
    'ar': { native: 'العربية', english: 'Arabic' },
    'ja': { native: '日本語', english: 'Japanese' },
    'ko': { native: '한국어', english: 'Korean' },
    'pt': { native: 'Português', english: 'Portuguese' },
    'ru': { native: 'Русский', english: 'Russian' },
    'it': { native: 'Italiano', english: 'Italian' },
};
