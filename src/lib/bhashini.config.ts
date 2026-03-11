/**
 * Bhashini API Configuration
 * 
 * Bhashini is India's national language translation API providing:
 * - Speech-to-Text (STT) for 22+ Indian languages
 * - Text-to-Speech (TTS) with regional accents
 * - Real-time translation
 * - OCR for Indian ID cards
 * 
 * Registration: https://bhashini.gov.in/udbhav
 * Free tier: 10K users for pilot programs
 */

export const BHASHINI_CONFIG = {
    // TODO: Register at https://bhashini.gov.in/udbhav and add your API key
    API_KEY: process.env.NEXT_PUBLIC_BHASHINI_API_KEY || '',
    BASE_URL: process.env.NEXT_PUBLIC_BHASHINI_BASE_URL || 'https://api.bhashini.ai/v1',

    endpoints: {
        // Speech to Text - for voice job search
        STT: '/audio/transcriptions',

        // Text to Speech - for reading job descriptions aloud
        TTS: '/audio/speech',

        // Translation - for worker-employer chat
        TRANSLATE: '/text/translation',

        // Language detection
        DETECT: '/text/detect',

        // OCR - for e-Shram card, Aadhaar
        OCR: '/image/ocr'
    }
};

// Language code mapping (ISO 639 to Bhashini IDs)
export const LANGUAGE_CODES = {
    'en': 'en-IN',
    'hi': 'hi-IN',
    'ta': 'ta-IN',
    'te': 'te-IN',
    'kn': 'kn-IN',
    'mr': 'mr-IN',
    'gu': 'gu-IN',
    'bn': 'bn-IN',
    'ml': 'ml-IN',
    'pa': 'pa-IN',
    'or': 'or-IN',
    'as': 'as-IN',
    'ur': 'ur-IN',
    'ks': 'ks-IN',
    'kok': 'kok-IN',
    'mni': 'mni-IN',
    'ne': 'ne-IN',
    'brx': 'brx-IN',
    'doi': 'doi-IN',
    'mai': 'mai-IN',
    'sat': 'sat-IN',
    'sd': 'sd-IN',
} as const;

// Voice models for TTS (region-specific)
export const TTS_VOICES = {
    'hi': 'hi-IN-ShrutiNeural', // Hindi female
    'en': 'en-IN-NeerjaNeural', // English Indian female
    // Add more as needed
} as const;

/**
 * Future helper functions (to be implemented):
 * 
 * - transcribeAudio(audioBlob, sourceLang): Speech to text
 * - synthesizeSpeech(text, targetLang): Text to speech
 * - translateText(text, sourceLang, targetLang): Translation
 * - detectLanguage(text): Auto-detect language
 * - extractTextFromImage(image): OCR
 */

export type BhashiniLanguage = keyof typeof LANGUAGE_CODES;
