/**
 * Bhashini API Service
 * 
 * Provides translation, speech-to-text, and text-to-speech capabilities
 * using India's Bhashini API with intelligent caching.
 */

import { BHASHINI_CONFIG, LANGUAGE_CODES, type BhashiniLanguage } from '../bhashini.config';

// Types
export interface TranslationResponse {
    translatedText: string;
    sourceLang: string;
    targetLang: string;
    cached: boolean;
}

export interface TTSResponse {
    audioUrl: string;
    cached: boolean;
}

export interface STTResponse {
    transcribedText: string;
    detectedLang: string;
}

interface CacheEntry {
    value: string;
    timestamp: number;
    expiresIn: number; // milliseconds
}

// Cache management
class TranslationCache {
    private cache: Map<string, CacheEntry> = new Map();
    private readonly DEFAULT_TTL = 7 * 24 * 60 * 60 * 1000; // 7 days

    private getCacheKey(text: string, sourceLang: string, targetLang: string): string {
        return `${sourceLang}:${targetLang}:${text.toLowerCase().trim()}`;
    }

    get(text: string, sourceLang: string, targetLang: string): string | null {
        const key = this.getCacheKey(text, sourceLang, targetLang);
        const entry = this.cache.get(key);

        if (!entry) return null;

        // Check if expired
        if (Date.now() - entry.timestamp > entry.expiresIn) {
            this.cache.delete(key);
            return null;
        }

        return entry.value;
    }

    set(text: string, sourceLang: string, targetLang: string, translatedText: string): void {
        const key = this.getCacheKey(text, sourceLang, targetLang);
        this.cache.set(key, {
            value: translatedText,
            timestamp: Date.now(),
            expiresIn: this.DEFAULT_TTL,
        });

        // Persist to localStorage for cross-session caching
        this.persistToLocalStorage();
    }

    private persistToLocalStorage(): void {
        if (typeof window === 'undefined') return;

        try {
            const cacheArray = Array.from(this.cache.entries());
            localStorage.setItem('bhashini-translation-cache', JSON.stringify(cacheArray));
        } catch (error) {
            console.warn('Failed to persist translation cache:', error);
        }
    }

    loadFromLocalStorage(): void {
        if (typeof window === 'undefined') return;

        try {
            const cached = localStorage.getItem('bhashini-translation-cache');
            if (cached) {
                const cacheArray = JSON.parse(cached) as [string, CacheEntry][];
                this.cache = new Map(cacheArray);

                // Clean expired entries
                const now = Date.now();
                for (const [key, entry] of this.cache.entries()) {
                    if (now - entry.timestamp > entry.expiresIn) {
                        this.cache.delete(key);
                    }
                }
            }
        } catch (error) {
            console.warn('Failed to load translation cache:', error);
        }
    }

    clear(): void {
        this.cache.clear();
        if (typeof window !== 'undefined') {
            localStorage.removeItem('bhashini-translation-cache');
        }
    }

    getStats() {
        return {
            size: this.cache.size,
            entries: Array.from(this.cache.entries()),
        };
    }
}

// Singleton cache instance
const translationCache = new TranslationCache();
if (typeof window !== 'undefined') {
    translationCache.loadFromLocalStorage();
}

/**
 * Bhashini Service Class
 */
export class BhashiniService {
    private static instance: BhashiniService;
    private apiKey: string;
    private baseUrl: string;

    private constructor() {
        this.apiKey = BHASHINI_CONFIG.API_KEY;
        this.baseUrl = BHASHINI_CONFIG.BASE_URL;
    }

    static getInstance(): BhashiniService {
        if (!BhashiniService.instance) {
            BhashiniService.instance = new BhashiniService();
        }
        return BhashiniService.instance;
    }

    private isConfigured(): boolean {
        return !!this.apiKey && this.apiKey !== '';
    }

    /**
     * Translate text from source language to target language
     */
    async translateText(
        text: string,
        targetLang: BhashiniLanguage,
        sourceLang: BhashiniLanguage = 'en'
    ): Promise<TranslationResponse> {
        // Check cache first
        const cached = translationCache.get(text, sourceLang, targetLang);
        if (cached) {
            return {
                translatedText: cached,
                sourceLang,
                targetLang,
                cached: true,
            };
        }

        // If API not configured, return original text
        if (!this.isConfigured()) {
            console.warn('Bhashini API key not configured. Returning original text.');
            return {
                translatedText: text,
                sourceLang,
                targetLang,
                cached: false,
            };
        }

        try {
            const response = await fetch(`${this.baseUrl}${BHASHINI_CONFIG.endpoints.TRANSLATE}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`,
                },
                body: JSON.stringify({
                    text,
                    source_language: LANGUAGE_CODES[sourceLang],
                    target_language: LANGUAGE_CODES[targetLang],
                }),
            });

            if (!response.ok) {
                throw new Error(`Bhashini API error: ${response.status}`);
            }

            const data = await response.json();
            const translatedText = data.translated_text || text;

            // Cache the result
            translationCache.set(text, sourceLang, targetLang, translatedText);

            return {
                translatedText,
                sourceLang,
                targetLang,
                cached: false,
            };
        } catch (error) {
            console.error('Translation failed:', error);
            // Return original text on error
            return {
                translatedText: text,
                sourceLang,
                targetLang,
                cached: false,
            };
        }
    }

    /**
     * Batch translate multiple texts (efficient for lists)
     */
    async translateBatch(
        texts: string[],
        targetLang: BhashiniLanguage,
        sourceLang: BhashiniLanguage = 'en'
    ): Promise<string[]> {
        const results = await Promise.all(
            texts.map(text => this.translateText(text, targetLang, sourceLang))
        );
        return results.map(r => r.translatedText);
    }

    /**
     * Text-to-Speech: Convert text to audio
     */
    async textToSpeech(text: string, lang: BhashiniLanguage): Promise<TTSResponse> {
        if (!this.isConfigured()) {
            throw new Error('Bhashini API key not configured');
        }

        try {
            const response = await fetch(`${this.baseUrl}${BHASHINI_CONFIG.endpoints.TTS}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`,
                },
                body: JSON.stringify({
                    text,
                    language: LANGUAGE_CODES[lang],
                    voice: 'default', // Can be customized per language
                }),
            });

            if (!response.ok) {
                throw new Error(`TTS API error: ${response.status}`);
            }

            const data = await response.json();
            return {
                audioUrl: data.audio_url,
                cached: false,
            };
        } catch (error) {
            console.error('Text-to-Speech failed:', error);
            throw error;
        }
    }

    /**
     * Speech-to-Text: Convert audio to text
     */
    async speechToText(audioBlob: Blob, lang: BhashiniLanguage): Promise<STTResponse> {
        if (!this.isConfigured()) {
            throw new Error('Bhashini API key not configured');
        }

        try {
            const formData = new FormData();
            formData.append('audio', audioBlob);
            formData.append('language', LANGUAGE_CODES[lang]);

            const response = await fetch(`${this.baseUrl}${BHASHINI_CONFIG.endpoints.STT}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`STT API error: ${response.status}`);
            }

            const data = await response.json();
            return {
                transcribedText: data.transcribed_text,
                detectedLang: data.detected_language || lang,
            };
        } catch (error) {
            console.error('Speech-to-Text failed:', error);
            throw error;
        }
    }

    /**
     * Detect language of given text
     */
    async detectLanguage(text: string): Promise<BhashiniLanguage> {
        if (!this.isConfigured()) {
            return 'en'; // Default fallback
        }

        try {
            const response = await fetch(`${this.baseUrl}${BHASHINI_CONFIG.endpoints.DETECT}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`,
                },
                body: JSON.stringify({ text }),
            });

            if (!response.ok) {
                throw new Error(`Language detection error: ${response.status}`);
            }

            const data = await response.json();
            const detectedCode = data.detected_language;

            // Map back to our language codes
            for (const [code, bhashiniCode] of Object.entries(LANGUAGE_CODES)) {
                if (bhashiniCode === detectedCode) {
                    return code as BhashiniLanguage;
                }
            }

            return 'en'; // Fallback
        } catch (error) {
            console.error('Language detection failed:', error);
            return 'en';
        }
    }

    /**
     * Clear translation cache
     */
    clearCache(): void {
        translationCache.clear();
    }

    /**
     * Get cache statistics
     */
    getCacheStats() {
        return translationCache.getStats();
    }
}

// Export singleton instance
export const bhashiniService = BhashiniService.getInstance();
