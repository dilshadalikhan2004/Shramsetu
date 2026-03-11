"use client";

import { useState, useCallback } from 'react';
import { googleTranslateService, type GoogleTranslationResponse } from './google-translate-service';
import type { GoogleLanguage } from './google-translate.config';
import { useUserStore } from '@/store/useUserStore';

/**
 * Hook for translating dynamic content using Google Translate API
 * 
 * Example usage:
 * ```tsx
 * const { translate, isLoading } = useGoogleTranslate();
 * const jobTitle = await translate("Construction Worker");
 * ```
 */
export function useGoogleTranslate() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const language = useUserStore(state => state.generalProfile?.language || 'en');

    const translate = useCallback(
        async (text: string, sourceLang?: GoogleLanguage): Promise<string> => {
            if (!text || language === sourceLang) return text;

            setIsLoading(true);
            setError(null);

            try {
                const result = await googleTranslateService.translateText(
                    text,
                    language as GoogleLanguage,
                    sourceLang
                );
                return result.translatedText;
            } catch (err) {
                const errorMsg = err instanceof Error ? err.message : 'Translation failed';
                setError(errorMsg);
                console.error('Translation error:', err);
                return text; // Return original on error
            } finally {
                setIsLoading(false);
            }
        },
        [language]
    );

    const translateBatch = useCallback(
        async (texts: string[], sourceLang?: GoogleLanguage): Promise<string[]> => {
            if (language === sourceLang) return texts;

            setIsLoading(true);
            setError(null);

            try {
                const results = await googleTranslateService.translateBatch(
                    texts,
                    language as GoogleLanguage,
                    sourceLang
                );
                return results;
            } catch (err) {
                const errorMsg = err instanceof Error ? err.message : 'Batch translation failed';
                setError(errorMsg);
                console.error('Batch translation error:', err);
                return texts; // Return originals on error
            } finally {
                setIsLoading(false);
            }
        },
        [language]
    );

    const detectLanguage = useCallback(async (text: string) => {
        setIsLoading(true);
        setError(null);

        try {
            const result = await googleTranslateService.detectLanguage(text);
            return result;
        } catch (err) {
            const errorMsg = err instanceof Error ? err.message : 'Language detection failed';
            setError(errorMsg);
            console.error('Detection error:', err);
            return { language: 'en', confidence: 0 };
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        translate,
        translateBatch,
        detectLanguage,
        isLoading,
        error,
        currentLanguage: language,
    };
}

/**
 * Hook to get cache statistics
 */
export function useGoogleTranslateCache() {
    const [stats, setStats] = useState({ size: 0, entries: [] as string[] });

    const refreshStats = useCallback(() => {
        const cacheStats = googleTranslateService.getCacheStats();
        setStats({
            size: cacheStats.size,
            entries: cacheStats.entries.map(([key]) => key)
        });
    }, []);

    const clearCache = useCallback(() => {
        googleTranslateService.clearCache();
        refreshStats();
    }, [refreshStats]);

    return {
        stats,
        refreshStats,
        clearCache,
    };
}
