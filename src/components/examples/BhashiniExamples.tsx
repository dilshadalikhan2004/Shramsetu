"use client";

import { useState, useEffect } from 'react';
import { useBhashiniTranslate, useTextToSpeech, useSpeechToText } from '@/lib/bhashini/useBhashini';
import { useTranslation, useDynamicTranslation } from '@/lib/i18n/EnhancedTranslationProvider';
import { Volume2, Mic } from 'lucide-react';

/**
 * Example 1: Dynamic Job Description Translation
 * Use case: Translate employer-posted job descriptions
 */
export function JobDescriptionCard({ description }: { description: string }) {
    const [translatedDesc, setTranslatedDesc] = useState(description);
    const { translate, isLoading } = useBhashiniTranslate();
    const { speak, isPlaying } = useTextToSpeech();
    const { language } = useTranslation();

    useEffect(() => {
        const translateDescription = async () => {
            if (language !== 'en') {
                const translated = await translate(description);
                setTranslatedDesc(translated);
            } else {
                setTranslatedDesc(description);
            }
        };
        translateDescription();
    }, [description, language, translate]);

    return (
        <div className="p-4 border rounded-lg bg-white dark:bg-gray-800">
            <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                    {isLoading ? (
                        <div className="flex items-center gap-2 text-shram-neutral">
                            <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
                            <span className="text-sm">Translating...</span>
                        </div>
                    ) : (
                        <p className="text-gray-700 dark:text-gray-200">{translatedDesc}</p>
                    )}
                </div>

                {/* Text-to-Speech button */}
                <button
                    onClick={() => speak(translatedDesc, language as any)}
                    disabled={isPlaying}
                    className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 transition-colors"
                    title="Listen to description"
                >
                    <Volume2 className={`w-5 h-5 text-blue-600 dark:text-blue-300 ${isPlaying ? 'animate-pulse' : ''}`} />
                </button>
            </div>
        </div>
    );
}

/**
 * Example 2: Voice Search for Jobs
 * Use case: Workers can speak to search for jobs in their language
 */
export function VoiceJobSearch() {
    const { t, language } = useTranslation();
    const { startRecording, stopRecording, isRecording, transcript, clearTranscript } = useSpeechToText(language as any);
    const [searchResults, setSearchResults] = useState<string[]>([]);

    const handleSearch = () => {
        if (transcript) {
            // Simulate search - in real app, this would search your job database
            setSearchResults([
                `Search results for: "${transcript}"`,
                '• Construction Worker - ₹500/day',
                '• Electrician - ₹600/day',
                '• Plumber - ₹550/day',
            ]);
        }
    };

    useEffect(() => {
        if (transcript && !isRecording) {
            handleSearch();
        }
    }, [transcript, isRecording]);

    return (
        <div className="p-6 border rounded-lg bg-white dark:bg-gray-800 space-y-4">
            <h3 className="text-lg font-semibold">{t('common.voiceSearch', true) || 'Voice Search'}</h3>

            <div className="flex items-center gap-3">
                <button
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`p-4 rounded-full transition-all ${isRecording
                        ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                        : 'bg-blue-500 hover:bg-blue-600'
                        } text-white`}
                >
                    {isRecording ? <Mic className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                </button>

                <div className="flex-1">
                    {isRecording && (
                        <p className="text-sm text-shram-neutral">🎤 Listening...</p>
                    )}
                    {transcript && (
                        <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                            <p className="text-sm font-medium">"{transcript}"</p>
                        </div>
                    )}
                </div>

                {transcript && (
                    <button
                        onClick={clearTranscript}
                        className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg"
                    >
                        Clear
                    </button>
                )}
            </div>

            {searchResults.length > 0 && (
                <div className="space-y-2">
                    {searchResults.map((result, idx) => (
                        <div key={idx} className="p-3 bg-shram-bg dark:bg-gray-700 rounded">
                            {result}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

/**
 * Example 3: Multi-language Chat Message
 * Use case: Worker and employer speak different languages
 */
export function ChatMessage({ message, senderLang }: { message: string; senderLang: string }) {
    const [translatedMessage, setTranslatedMessage] = useState(message);
    const { translate, isLoading } = useBhashiniTranslate();
    const { language } = useTranslation();

    useEffect(() => {
        const translateMessage = async () => {
            if (senderLang !== language) {
                const translated = await translate(message, senderLang as any);
                setTranslatedMessage(translated);
            } else {
                setTranslatedMessage(message);
            }
        };
        translateMessage();
    }, [message, language, senderLang, translate]);

    return (
        <div className="p-3 bg-blue-50 dark:bg-blue-900 rounded-lg">
            {isLoading ? (
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
                    <span className="text-sm">Translating...</span>
                </div>
            ) : (
                <>
                    <p className="text-gray-800 dark:text-gray-100">{translatedMessage}</p>
                    {senderLang !== language && (
                        <p className="text-xs text-shram-neutral mt-1">
                            Translated from {senderLang.toUpperCase()}
                        </p>
                    )}
                </>
            )}
        </div>
    );
}

/**
 * Example 4: Batch Translation for Job Listings
 * Use case: Translate multiple job titles efficiently
 */
export function JobListings() {
    const [jobs, setJobs] = useState([
        { id: 1, title: 'Construction Worker', rate: 500 },
        { id: 2, title: 'Electrician', rate: 600 },
        { id: 3, title: 'Plumber', rate: 550 },
        { id: 4, title: 'Carpenter', rate: 580 },
        { id: 5, title: 'Painter', rate: 450 },
    ]);
    const [translatedJobs, setTranslatedJobs] = useState(jobs);
    const { translateBatch, isLoading } = useBhashiniTranslate();
    const { language } = useTranslation();

    useEffect(() => {
        const translateJobTitles = async () => {
            if (language !== 'en') {
                const titles = jobs.map(j => j.title);
                const translated = await translateBatch(titles);

                const updatedJobs = jobs.map((job, idx) => ({
                    ...job,
                    title: translated[idx],
                }));
                setTranslatedJobs(updatedJobs);
            } else {
                setTranslatedJobs(jobs);
            }
        };
        translateJobTitles();
    }, [language, translateBatch]);

    return (
        <div className="space-y-3">
            {isLoading ? (
                <div className="flex items-center gap-2 text-shram-neutral">
                    <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
                    <span>Loading jobs...</span>
                </div>
            ) : (
                translatedJobs.map(job => (
                    <div key={job.id} className="p-4 border rounded-lg hover:bg-shram-bg dark:hover:bg-gray-800">
                        <h4 className="font-semibold">{job.title}</h4>
                        <p className="text-sm text-shram-neutral">₹{job.rate}/day</p>
                    </div>
                ))
            )}
        </div>
    );
}
