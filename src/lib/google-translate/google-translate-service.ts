/**
 * Google Cloud Translation API Service
 * 
 * Provides translation capabilities using Google's Cloud Translation API
 * with intelligent caching to reduce costs.
 */

import {
    GOOGLE_TRANSLATE_CONFIG,
    GOOGLE_LANGUAGE_CODES,
    type GoogleLanguage
} from './google-translate.config';

// Types
export interface GoogleTranslationResponse {
    translatedText: string;
    detectedSourceLanguage?: string;
    sourceLang: string;
    targetLang: string;
    cached: boolean;
}

export interface GoogleDetectionResponse {
    language: string;
    confidence: number;
}

interface CacheEntry {
    value: string;
    timestamp: number;
    expiresIn: number;
}

/**
 * Translation Cache Manager
 */
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

        this.persistToLocalStorage();
    }

    private persistToLocalStorage(): void {
        if (typeof window === 'undefined') return;

        try {
            const cacheArray = Array.from(this.cache.entries());
            localStorage.setItem('google-translation-cache', JSON.stringify(cacheArray));
        } catch (error) {
            console.warn('Failed to persist translation cache:', error);
        }
    }

    loadFromLocalStorage(): void {
        if (typeof window === 'undefined') return;

        try {
            const cached = localStorage.getItem('google-translation-cache');
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
            localStorage.removeItem('google-translation-cache');
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
 * Google Translate Service
 */
export class GoogleTranslateService {
    private static instance: GoogleTranslateService;
    private apiKey: string;
    private baseUrl: string;

    private constructor() {
        this.apiKey = GOOGLE_TRANSLATE_CONFIG.API_KEY;
        this.baseUrl = GOOGLE_TRANSLATE_CONFIG.BASE_URL;
    }

    static getInstance(): GoogleTranslateService {
        if (!GoogleTranslateService.instance) {
            GoogleTranslateService.instance = new GoogleTranslateService();
        }
        return GoogleTranslateService.instance;
    }

    private isConfigured(): boolean {
        return !!this.apiKey && this.apiKey !== '';
    }

    /**
     * Translate text from source language to target language
     */
    async translateText(
        text: string,
        targetLang: GoogleLanguage,
        sourceLang?: GoogleLanguage
    ): Promise<GoogleTranslationResponse> {
        // Same language check
        if (sourceLang === targetLang) {
            return {
                translatedText: text,
                sourceLang: sourceLang || 'en',
                targetLang,
                cached: false,
            };
        }

        // Check cache first
        const cacheKey = sourceLang || 'auto';
        const cached = translationCache.get(text, cacheKey, targetLang);
        if (cached) {
            return {
                translatedText: cached,
                sourceLang: sourceLang || 'en',
                targetLang,
                cached: true,
            };
        }

        // If API not configured, return original text
        if (!this.isConfigured()) {
            console.warn('Google Translate API key not configured. Returning original text.');
            return {
                translatedText: text,
                sourceLang: sourceLang || 'en',
                targetLang,
                cached: false,
            };
        }

        try {
            const params = new URLSearchParams({
                key: this.apiKey,
                q: text,
                target: GOOGLE_LANGUAGE_CODES[targetLang],
                format: 'text',
            });

            if (sourceLang) {
                params.append('source', GOOGLE_LANGUAGE_CODES[sourceLang]);
            }

            const response = await fetch(`${this.baseUrl}?${params.toString()}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Google Translate API error: ${response.status}`);
            }

            const data = await response.json();
            const translatedText = data.data.translations[0].translatedText;
            const detectedSourceLang = data.data.translations[0].detectedSourceLanguage;

            // Cache the result
            translationCache.set(
                text,
                sourceLang || detectedSourceLang || 'en',
                targetLang,
                translatedText
            );

            return {
                translatedText,
                detectedSourceLanguage: detectedSourceLang,
                sourceLang: sourceLang || detectedSourceLang || 'en',
                targetLang,
                cached: false,
            };
        } catch (error) {
            console.error('Translation failed:', error);
            // Return original text on error
            return {
                translatedText: text,
                sourceLang: sourceLang || 'en',
                targetLang,
                cached: false,
            };
        }
    }

    /**
     * Batch translate multiple texts
     */
    async translateBatch(
        texts: string[],
        targetLang: GoogleLanguage,
        sourceLang?: GoogleLanguage
    ): Promise<string[]> {
        if (!this.isConfigured()) {
            return texts; // Return originals if not configured
        }

        try {
            const params = new URLSearchParams({
                key: this.apiKey,
                target: GOOGLE_LANGUAGE_CODES[targetLang],
                format: 'text',
            });

            if (sourceLang) {
                params.append('source', GOOGLE_LANGUAGE_CODES[sourceLang]);
            }

            // Add all texts as 'q' parameters
            texts.forEach(text => params.append('q', text));

            const response = await fetch(`${this.baseUrl}?${params.toString()}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Batch translation error: ${response.status}`);
            }

            const data = await response.json();
            const translations = data.data.translations.map((t: any) => t.translatedText);

            // Cache each result
            texts.forEach((text, index) => {
                translationCache.set(
                    text,
                    sourceLang || 'en',
                    targetLang,
                    translations[index]
                );
            });

            return translations;
        } catch (error) {
            console.error('Batch translation failed:', error);
            return texts; // Return originals on error
        }
    }

    /**
     * Detect language of given text
     */
    async detectLanguage(text: string): Promise<GoogleDetectionResponse> {
        if (!this.isConfigured()) {
            return { language: 'en', confidence: 0 };
        }

        try {
            const params = new URLSearchParams({
                key: this.apiKey,
                q: text,
            });

            const response = await fetch(
                `${this.baseUrl}${GOOGLE_TRANSLATE_CONFIG.endpoints.DETECT}?${params.toString()}`,
                { method: 'POST' }
            );

            if (!response.ok) {
                throw new Error(`Language detection error: ${response.status}`);
            }

            const data = await response.json();
            const detection = data.data.detections[0][0];

            return {
                language: detection.language,
                confidence: detection.confidence,
            };
        } catch (error) {
            console.error('Language detection failed:', error);
            return { language: 'en', confidence: 0 };
        }
    }

    /**
     * Get list of supported languages
     */
    async getSupportedLanguages(targetLang: GoogleLanguage = 'en'): Promise<any[]> {
        if (!this.isConfigured()) {
            return [];
        }

        try {
            const params = new URLSearchParams({
                key: this.apiKey,
                target: GOOGLE_LANGUAGE_CODES[targetLang],
            });

            const response = await fetch(
                `${this.baseUrl}${GOOGLE_TRANSLATE_CONFIG.endpoints.LANGUAGES}?${params.toString()}`
            );

            if (!response.ok) {
                throw new Error(`Get languages error: ${response.status}`);
            }

            const data = await response.json();
            return data.data.languages;
        } catch (error) {
            console.error('Get languages failed:', error);
            return [];
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
export const googleTranslateService = GoogleTranslateService.getInstance();
