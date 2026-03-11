"use client";

import { useState, useEffect } from 'react';
import { useGoogleTranslate, useGoogleTranslateCache } from '@/lib/google-translate';
import { useTranslation } from '@/lib/i18n/TranslationProvider';
import { Volume2, Languages, Globe } from 'lucide-react';

/**
 * Example 1: Dynamic Job Description Translation
 */
export function JobDescriptionCard({ description }: { description: string }) {
    const [translatedDesc, setTranslatedDesc] = useState(description);
    const { translate, isLoading } = useGoogleTranslate();
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
            </div>
        </div>
    );
}

/**
 * Example 2: Multi-language Chat Message
 */
export function ChatMessage({ message, senderLang }: { message: string; senderLang: string }) {
    const [translatedMessage, setTranslatedMessage] = useState(message);
    const { translate, isLoading } = useGoogleTranslate();
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
 * Example 3: Batch Translation for Job Listings
 */
export function JobListings() {
    const [jobs] = useState([
        { id: 1, title: 'Construction Worker', rate: 500, location: 'Mumbai' },
        { id: 2, title: 'Electrician', rate: 600, location: 'Delhi' },
        { id: 3, title: 'Plumber', rate: 550, location: 'Bangalore' },
        { id: 4, title: 'Carpenter', rate: 580, location: 'Chennai' },
        { id: 5, title: 'Painter', rate: 450, location: 'Pune' },
    ]);
    const [translatedJobs, setTranslatedJobs] = useState(jobs);
    const { translateBatch, isLoading } = useGoogleTranslate();
    const { language } = useTranslation();

    useEffect(() => {
        const translateJobTitles = async () => {
            if (language !== 'en') {
                const titles = jobs.map(j => j.title);
                const locations = jobs.map(j => j.location);

                const [translatedTitles, translatedLocations] = await Promise.all([
                    translateBatch(titles),
                    translateBatch(locations),
                ]);

                const updatedJobs = jobs.map((job, idx) => ({
                    ...job,
                    title: translatedTitles[idx],
                    location: translatedLocations[idx],
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
                    <div key={job.id} className="p-4 border rounded-lg hover:bg-shram-bg dark:hover:bg-gray-800 transition-colors">
                        <div className="flex items-start justify-between">
                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white">{job.title}</h4>
                                <p className="text-sm text-shram-neutral dark:text-gray-400 flex items-center gap-1 mt-1">
                                    <Globe className="w-3 h-3" />
                                    {job.location}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-green-600">₹{job.rate}</p>
                                <p className="text-xs text-shram-neutral">per day</p>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

/**
 * Example 4: Language Detector
 */
export function LanguageDetector() {
    const [text, setText] = useState('');
    const [detectedLang, setDetectedLang] = useState<string | null>(null);
    const [confidence, setConfidence] = useState<number>(0);
    const { detectLanguage, isLoading } = useGoogleTranslate();

    const handleDetect = async () => {
        if (!text) return;
        const result = await detectLanguage(text);
        setDetectedLang(result.language);
        setConfidence(result.confidence);
    };

    return (
        <div className="p-6 border rounded-lg bg-white dark:bg-gray-800 space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
                <Languages className="w-5 h-5" />
                Language Detector
            </h3>

            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                rows={3}
                placeholder="Type or paste text to detect language..."
            />

            <button
                onClick={handleDetect}
                disabled={isLoading || !text}
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors"
            >
                {isLoading ? 'Detecting...' : 'Detect Language'}
            </button>

            {detectedLang && (
                <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-800">
                    <p className="text-sm text-shram-neutral dark:text-gray-400">Detected Language:</p>
                    <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                        {detectedLang.toUpperCase()}
                    </p>
                    <p className="text-sm text-shram-neutral mt-1">
                        Confidence: {(confidence * 100).toFixed(1)}%
                    </p>
                </div>
            )}
        </div>
    );
}

/**
 * Example 5: Cache Statistics Display
 */
export function CacheStatsWidget() {
    const { stats, refreshStats, clearCache } = useGoogleTranslateCache();

    useEffect(() => {
        refreshStats();
    }, [refreshStats]);

    return (
        <div className="p-4 border rounded-lg bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
            <h4 className="font-semibold mb-3">💾 Translation Cache</h4>
            <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <p className="text-xs text-shram-neutral dark:text-gray-400">Cached</p>
                    <p className="text-2xl font-bold text-purple-600">{stats.size}</p>
                </div>
                <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <p className="text-xs text-shram-neutral dark:text-gray-400">Saved $$</p>
                    <p className="text-2xl font-bold text-green-600">
                        ${((stats.size * 0.02) / 1000).toFixed(2)}
                    </p>
                </div>
            </div>
            <div className="flex gap-2 mt-3">
                <button
                    onClick={refreshStats}
                    className="flex-1 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded"
                >
                    Refresh
                </button>
                <button
                    onClick={clearCache}
                    className="flex-1 py-1 text-sm bg-red-600 hover:bg-red-700 text-white rounded"
                >
                    Clear
                </button>
            </div>
        </div>
    );
}
