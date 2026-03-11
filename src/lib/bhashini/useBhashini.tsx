"use client";

import { useState, useCallback, useEffect } from 'react';
import { bhashiniService, type TranslationResponse } from './bhashini-service';
import type { BhashiniLanguage } from '../bhashini.config';
import { useUserStore } from '@/store/useUserStore';

/**
 * Hook for translating dynamic content using Bhashini API
 * 
 * Example usage:
 * ```tsx
 * const { translate, isLoading } = useBhashiniTranslate();
 * const jobTitle = await translate("Construction Worker");
 * ```
 */
export function useBhashiniTranslate() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const language = useUserStore(state => state.generalProfile?.language || 'en');

    const translate = useCallback(
        async (text: string, sourceLang: BhashiniLanguage = 'en'): Promise<string> => {
            if (!text || language === sourceLang) return text;

            setIsLoading(true);
            setError(null);

            try {
                const result = await bhashiniService.translateText(
                    text,
                    language as BhashiniLanguage,
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
        async (texts: string[], sourceLang: BhashiniLanguage = 'en'): Promise<string[]> => {
            if (language === sourceLang) return texts;

            setIsLoading(true);
            setError(null);

            try {
                const results = await bhashiniService.translateBatch(
                    texts,
                    language as BhashiniLanguage,
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

    return {
        translate,
        translateBatch,
        isLoading,
        error,
        currentLanguage: language,
    };
}

/**
 * Hook for text-to-speech functionality
 * 
 * Example usage:
 * ```tsx
 * const { speak, isPlaying } = useTextToSpeech();
 * speak("Hello, how are you?", "hi");
 * ```
 */
export function useTextToSpeech() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

    const speak = useCallback(async (text: string, lang: BhashiniLanguage) => {
        setIsPlaying(true);
        setError(null);

        try {
            const result = await bhashiniService.textToSpeech(text, lang);

            // Create and play audio
            const audio = new Audio(result.audioUrl);
            setAudioElement(audio);

            audio.onended = () => setIsPlaying(false);
            audio.onerror = () => {
                setError('Failed to play audio');
                setIsPlaying(false);
            };

            await audio.play();
        } catch (err) {
            const errorMsg = err instanceof Error ? err.message : 'Text-to-speech failed';
            setError(errorMsg);
            setIsPlaying(false);
        }
    }, []);

    const stop = useCallback(() => {
        if (audioElement) {
            audioElement.pause();
            audioElement.currentTime = 0;
            setIsPlaying(false);
        }
    }, [audioElement]);

    useEffect(() => {
        // Cleanup on unmount
        return () => {
            if (audioElement) {
                audioElement.pause();
            }
        };
    }, [audioElement]);

    return {
        speak,
        stop,
        isPlaying,
        error,
    };
}

/**
 * Hook for speech-to-text functionality
 * 
 * Example usage:
 * ```tsx
 * const { startRecording, stopRecording, isRecording, transcript } = useSpeechToText();
 * ```
 */
export function useSpeechToText(lang: BhashiniLanguage = 'hi') {
    const [isRecording, setIsRecording] = useState(false);
    const [transcript, setTranscript] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);

    const startRecording = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const recorder = new MediaRecorder(stream);
            const chunks: Blob[] = [];

            recorder.ondataavailable = (e) => {
                chunks.push(e.data);
            };

            recorder.onstop = async () => {
                const audioBlob = new Blob(chunks, { type: 'audio/webm' });

                try {
                    const result = await bhashiniService.speechToText(audioBlob, lang);
                    setTranscript(result.transcribedText);
                } catch (err) {
                    const errorMsg = err instanceof Error ? err.message : 'Speech recognition failed';
                    setError(errorMsg);
                }

                // Stop all tracks
                stream.getTracks().forEach(track => track.stop());
            };

            recorder.start();
            setMediaRecorder(recorder);
            setIsRecording(true);
            setError(null);
        } catch (err) {
            const errorMsg = err instanceof Error ? err.message : 'Microphone access denied';
            setError(errorMsg);
        }
    }, [lang]);

    const stopRecording = useCallback(() => {
        if (mediaRecorder && isRecording) {
            mediaRecorder.stop();
            setIsRecording(false);
        }
    }, [mediaRecorder, isRecording]);

    return {
        startRecording,
        stopRecording,
        isRecording,
        transcript,
        error,
        clearTranscript: () => setTranscript(''),
    };
}

/**
 * Hook to get cache statistics
 */
export function useBhashiniCache() {
    const [stats, setStats] = useState({ size: 0, entries: [] as string[] });

    const refreshStats = useCallback(() => {
        const cacheStats = bhashiniService.getCacheStats();
        setStats({
            size: cacheStats.size,
            entries: cacheStats.entries.map(([key]) => key)
        });
    }, []);

    const clearCache = useCallback(() => {
        bhashiniService.clearCache();
        refreshStats();
    }, [refreshStats]);

    useEffect(() => {
        refreshStats();
    }, [refreshStats]);

    return {
        stats,
        refreshStats,
        clearCache,
    };
}
