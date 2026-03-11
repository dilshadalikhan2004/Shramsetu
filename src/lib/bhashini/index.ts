/**
 * Bhashini Integration - Main Export
 * 
 * Import everything you need from here:
 * 
 * ```tsx
 * import {
 *   bhashiniService,
 *   useBhashiniTranslate,
 *   useTextToSpeech,
 *   useSpeechToText,
 *   BHASHINI_CONFIG,
 * } from '@/lib/bhashini';
 * ```
 */

// Service
export { bhashiniService, BhashiniService } from './bhashini-service';
export type { TranslationResponse, TTSResponse, STTResponse } from './bhashini-service';

// Hooks
export {
    useBhashiniTranslate,
    useTextToSpeech,
    useSpeechToText,
    useBhashiniCache,
} from './useBhashini';

// Config
export {
    BHASHINI_CONFIG,
    LANGUAGE_CODES,
    TTS_VOICES,
    type BhashiniLanguage,
} from '../bhashini.config';
