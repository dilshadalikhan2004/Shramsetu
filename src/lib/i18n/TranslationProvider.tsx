"use client";

import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useUserStore } from '@/store/useUserStore';
import { translations } from './translations';

type TranslationKey = string;

interface TranslationContextType {
    t: (key: TranslationKey, params?: Record<string, any>) => string;
    language: string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
    const [mounted, setMounted] = useState(false);
    const [language, setLanguage] = useState<string>('en');

    useEffect(() => {
        setMounted(true);
        // Safe to access store after mount — prefer generalProfile.language, fall back to preferredLanguage
        const storeState = useUserStore.getState();
        const lang = storeState.generalProfile?.language || storeState.preferredLanguage || 'en';
        setLanguage(lang);

        // Subscribe to store changes
        const unsubscribe = useUserStore.subscribe((state) => {
            const l = state.generalProfile?.language || state.preferredLanguage || 'en';
            setLanguage(l);
        });

        return unsubscribe;
    }, []);

    const t = (key: TranslationKey, params?: Record<string, any>): string => {
        if (!mounted) return key; // Return key during SSR

        const keys = key.split('.');
        let value: any = translations[language as keyof typeof translations] || translations.en;

        for (const k of keys) {
            value = value?.[k];
            if (value === undefined) break;
        }

        // Fallback to English
        if (value === undefined) {
            value = translations.en;
            for (const k of keys) {
                value = value?.[k];
                if (value === undefined) break;
            }
        }

        let res = value || key;
        if (params && typeof res === 'string') {
            Object.entries(params).forEach(([k, v]) => {
                // Use a global regex to replace all occurrences of {key}
                const regex = new RegExp(`{${k}}`, 'g');
                res = res.replace(regex, String(v));
            });
        }
        return res;
    };

    return (
        <TranslationContext.Provider value={{ t, language }}>
            {children}
        </TranslationContext.Provider>
    );
};

export const useTranslation = () => {
    const context = useContext(TranslationContext);
    if (!context) {
        throw new Error('useTranslation must be used within TranslationProvider');
    }
    return context;
};
