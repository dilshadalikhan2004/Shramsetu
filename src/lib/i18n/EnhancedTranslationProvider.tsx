"use client";

import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useUserStore } from '@/store/useUserStore';
import { translations } from './translations';
import { bhashiniService } from '../bhashini/bhashini-service';
import type { BhashiniLanguage } from '../bhashini.config';

type TranslationKey = string;

interface TranslationContextType {
    t: (key: TranslationKey, useBhashini?: boolean) => string;
    tAsync: (key: TranslationKey) => Promise<string>;
    language: string;
    isReady: boolean;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

/**
 * Enhanced Translation Provider with Hybrid Static + Bhashini Support
 * 
 * Features:
 * - Static translations (fast, free, curated) for UI elements
 * - Bhashini API (dynamic, 22+ languages) for user-generated content
 * - Intelligent caching to reduce API calls
 * - Automatic fallback to English if translation missing
 * 
 * Usage:
 * - t('settings.title') → Static translation from translations.ts
 * - t('dynamic.content', true) → Bhashini API translation
 * - tAsync('dynamic.content') → Async Bhashini translation for dynamic content
 */
export const EnhancedTranslationProvider = ({ children }: { children: ReactNode }) => {
    const [mounted, setMounted] = useState(false);
    const [language, setLanguage] = useState<string>('en');

    useEffect(() => {
        setMounted(true);
        // Safe to access store after mount
        const lang = useUserStore.getState().generalProfile?.language || 'en';
        setLanguage(lang);

        // Subscribe to store changes
        const unsubscribe = useUserStore.subscribe((state) => {
            setLanguage(state.generalProfile?.language || 'en');
        });

        return unsubscribe;
    }, []);

    /**
     * Main translation function
     * @param key - Translation key or plain text to translate
     * @param useBhashini - Force use of Bhashini API (for dynamic content)
     */
    const t = (key: TranslationKey, useBhashini = false): string => {
        if (!mounted) return key; // Return key during SSR

        // If forcing Bhashini, return key and let tAsync handle it
        if (useBhashini) {
            return key;
        }

        // Try static translations first
        const keys = key.split('.');
        let value: any = translations[language as keyof typeof translations] || translations.en;

        for (const k of keys) {
            value = value?.[k];
            if (value === undefined) break;
        }

        // Fallback to English if not found
        if (value === undefined) {
            value = translations.en;
            for (const k of keys) {
                value = value?.[k];
                if (value === undefined) break;
            }
        }

        return value || key;
    };

    /**
     * Async translation using Bhashini API
     * Use this for dynamic user-generated content
     */
    const tAsync = async (textOrKey: TranslationKey): Promise<string> => {
        if (!mounted) return textOrKey;

        // First check if it's a static translation key
        const staticTranslation = t(textOrKey);

        // If we're already in English or the static translation exists, return it
        if (language === 'en' || (staticTranslation !== textOrKey)) {
            return staticTranslation;
        }

        // Otherwise, use Bhashini for dynamic translation
        try {
            const result = await bhashiniService.translateText(
                textOrKey,
                language as BhashiniLanguage,
                'en'
            );
            return result.translatedText;
        } catch (error) {
            console.error('Bhashini translation failed:', error);
            return textOrKey; // Fallback to original text
        }
    };

    return (
        <TranslationContext.Provider value={{ t, tAsync, language, isReady: mounted }}>
            {children}
        </TranslationContext.Provider>
    );
};

export const useTranslation = () => {
    const context = useContext(TranslationContext);
    if (!context) {
        throw new Error('useTranslation must be used within EnhancedTranslationProvider');
    }
    return context;
};

/**
 * Hook for translating dynamic content (convenience wrapper)
 */
export const useDynamicTranslation = () => {
    const { tAsync, language } = useTranslation();
    const [translations, setTranslations] = useState<Map<string, string>>(new Map());
    const [loading, setLoading] = useState(false);

    const translateDynamic = async (text: string): Promise<string> => {
        // Check cache
        const cached = translations.get(text);
        if (cached) return cached;

        setLoading(true);
        try {
            const translated = await tAsync(text);
            setTranslations(prev => new Map(prev).set(text, translated));
            return translated;
        } finally {
            setLoading(false);
        }
    };

    return {
        translateDynamic,
        loading,
        language,
    };
};
