(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Downloads/Shramsetu-Dillu-shramsetu/src/components/theme-provider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeProvider",
    ()=>ThemeProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/node_modules/next-themes/dist/index.mjs [app-client] (ecmascript)");
"use client";
;
;
function ThemeProvider({ children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThemeProvider"], {
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/components/theme-provider.tsx",
        lineNumber: 8,
        columnNumber: 12
    }, this);
}
_c = ThemeProvider;
var _c;
__turbopack_context__.k.register(_c, "ThemeProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/Shramsetu-Dillu-shramsetu/src/store/useUserStore.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useUserStore",
    ()=>useUserStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$zustand$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/node_modules/zustand/esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/node_modules/zustand/esm/middleware.mjs [app-client] (ecmascript)");
;
;
const useUserStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$zustand$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["create"])()((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["persist"])((set, get)=>({
        mode: 'worker',
        isAuthenticated: false,
        languageSelected: false,
        preferredLanguage: 'hi',
        generalProfile: null,
        workerProfile: null,
        employerProfile: null,
        setMode: (mode)=>set({
                mode
            }),
        setAuthenticated: (status)=>set({
                isAuthenticated: status
            }),
        setLanguageSelected: (status)=>set({
                languageSelected: status
            }),
        login: (phone, token, userData)=>{
            if (token) {
                localStorage.setItem('token', token);
                if (typeof document !== 'undefined') {
                    const isProd = ("TURBOPACK compile-time value", "development") === 'production';
                    document.cookie = `auth_token=${token}; path=/; max-age=31536000; SameSite=Strict${("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : ''}`;
                }
            }
            if (userData) {
                set({
                    isAuthenticated: true,
                    generalProfile: userData.generalProfile || {
                        id: userData.id,
                        phone: userData.phone,
                        name: userData.name || '',
                        city: userData.city || '',
                        language: userData.language || get().preferredLanguage,
                        kycStatus: userData.kycStatus || 'none'
                    },
                    workerProfile: userData.workerProfile ? JSON.parse(JSON.stringify(userData.workerProfile)) : null,
                    employerProfile: userData.employerProfile || null,
                    languageSelected: !!userData.language || get().languageSelected,
                    preferredLanguage: userData.language || get().preferredLanguage
                });
                return;
            }
            // Minimal login
            const currentLanguage = get().preferredLanguage;
            const currentLangSelected = get().languageSelected;
            set({
                isAuthenticated: true,
                languageSelected: currentLangSelected,
                generalProfile: {
                    id: phone,
                    name: "",
                    phone: phone,
                    city: "",
                    language: currentLanguage,
                    kycStatus: 'none'
                },
                workerProfile: null,
                employerProfile: null
            });
        },
        logout: ()=>{
            localStorage.removeItem('token');
            if (typeof document !== 'undefined') {
                const isProd = ("TURBOPACK compile-time value", "development") === 'production';
                document.cookie = `auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict${("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : ''}`;
            }
            set({
                isAuthenticated: false,
                generalProfile: null,
                workerProfile: null,
                employerProfile: null
            });
        },
        updateGeneralProfile: (data)=>set((state)=>({
                    generalProfile: state.generalProfile ? {
                        ...state.generalProfile,
                        ...data
                    } : null
                })),
        updateWorkerProfile: (data)=>set((state)=>({
                    workerProfile: state.workerProfile ? {
                        ...state.workerProfile,
                        ...data
                    } : {
                        skills: [],
                        experienceYears: 0,
                        dailyRate: 500,
                        serviceRadiusKm: 5,
                        portfolioImages: [],
                        availability: true,
                        rating: 0,
                        ratingCount: 0,
                        ...data
                    }
                })),
        updateEmployerProfile: (data)=>set((state)=>({
                    employerProfile: state.employerProfile ? {
                        ...state.employerProfile,
                        ...data
                    } : {
                        categories: [],
                        hiringHistoryCount: 0,
                        rating: 0,
                        ...data
                    }
                })),
        setLanguage: (language)=>set((state)=>({
                    preferredLanguage: language,
                    generalProfile: state.generalProfile ? {
                        ...state.generalProfile,
                        language
                    } : null,
                    languageSelected: true
                })),
        isProfileReady: ()=>{
            const state = get();
            if (!state.isAuthenticated || !state.generalProfile) return false;
            if (state.mode === 'worker') {
                return !!state.workerProfile;
            } else {
                return !!state.employerProfile;
            }
        },
        isLanguageSelected: ()=>{
            const state = get();
            return state.languageSelected;
        }
    }), {
    name: 'shramsetu-storage-v2'
}));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/Shramsetu-Dillu-shramsetu/src/lib/i18n/translations.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Translation files for English, Hindi, and Odia
__turbopack_context__.s([
    "translations",
    ()=>translations
]);
const translations = {
    en: {
        // Common
        common: {
            back: 'Back',
            next: 'Next',
            save: 'Save',
            cancel: 'Cancel',
            done: 'Done',
            edit: 'Edit',
            delete: 'Delete',
            yes: 'Yes',
            no: 'No',
            loading: 'Loading...',
            error: 'Error',
            success: 'Success',
            home: 'Home',
            applications: 'Applications',
            teams: 'Teams',
            earnings: 'Earnings',
            messages: 'Messages',
            worker: 'Worker',
            employer: 'Employer',
            search: 'Search jobs, companies...',
            viewAll: 'All',
            unread: 'Unread',
            promotional: 'Offers',
            urgent: 'Urgent',
            apply: 'Apply Now',
            applied: 'Applied',
            verified: 'Verified',
            new: 'New',
            export: 'Export',
            justNow: 'Just now',
            workerInitial: 'W',
            newMember: 'New Member',
            categories: {
                plumber: 'Plumber',
                electrician: 'Electrician',
                mason: 'Mason',
                welder: 'Welder',
                painter: 'Painter',
                carpenter: 'Carpenter',
                labor: 'Labor'
            },
            company: 'Company',
            date: 'Date',
            status: 'Status',
            amount: 'Amount',
            status_labels: {
                paid: 'Paid',
                pending: 'Pending',
                failed: 'Failed',
                open: 'Open',
                closed: 'Closed',
                accepted: 'Accepted',
                completed: 'Completed',
                rejected: 'Rejected',
                in_progress: 'In Progress'
            },
            step: 'Step',
            topMatch: 'Top Match',
            matchPercentage: '{percentage}% Match',
            posted: 'Posted {time}',
            analytics: 'Analytics',
            details: 'Details',
            requirements: 'Requirements',
            review: 'Review'
        },
        // Authentication
        auth: {
            phoneTitle: 'Enter your mobile number',
            phoneSubtitle: 'We\'ll send you a 6-digit OTP to verify',
            phonePlaceholder: '98765 43210',
            sendOtp: 'Send OTP',
            sendingOtp: 'Sending OTP...',
            otpTitle: 'Enter OTP',
            otpSubtitle: 'Sent to +91 ',
            resendIn: 'Resend OTP in ',
            resendOtp: 'Resend OTP',
            verifyContinue: 'Verify & Continue →',
            verifying: 'Verifying...',
            changeNumber: '← Change number'
        },
        // Splash Screen
        splash: {
            tagline: 'Get Work. Get Paid.',
            poweredBy: 'Powered by TrustBridge Verification'
        },
        // Language Selection
        language: {
            title: 'Choose Your Language',
            subtitle: 'Select your preferred language',
            voiceHint: 'Voice support coming soon with Bhashini',
            changeAnytime: 'You can change language anytime from settings',
            translationNote: 'UI translation coming soon. Currently saves your language preference.',
            popular: 'Popular',
            viewAll: 'View all 22+ languages →'
        },
        // Settings
        settings: {
            title: 'Settings',
            profile: 'My Profile',
            language: 'Language',
            notifications: 'Notifications',
            privacy: 'Privacy & Security',
            export: 'Export My Data',
            exportDesc: 'Download profile as JSON',
            dataInfo: 'Your Data is Saved Locally',
            dataDesc: 'All your profile information is automatically saved in your browser local storage. You can export it anytime using the button above.',
            storageKey: 'Storage Key: shramsetu-storage-v2',
            logout: 'Logout',
            logoutConfirm: 'Are you sure you want to log out of your account?',
            deleteAccount: 'Delete Account',
            version: 'ShramSetu v1.0.0 (Pilot Build)',
            editProfile: 'Edit Profile',
            name: 'Name',
            email: 'Email (Optional)',
            city: 'City',
            saveChanges: 'Save Changes',
            notificationSettings: 'Notification Settings',
            enableNotifications: 'Enable Notifications',
            jobMatches: 'Job Matches',
            jobAlerts: 'Job Alerts',
            newMessages: 'New Messages',
            paymentUpdates: 'Payment Updates',
            paymentSub: 'Salary credited and pending alerts',
            on: 'On',
            off: 'Off',
            appearance: 'Appearance',
            darkMode: 'Dark Mode',
            darkModeSub: 'Switch to dark theme',
            support: 'Support',
            supportSub: 'FAQs, raise a ticket',
            dangerZone: 'Danger Zone',
            aadhaarStatus: 'Status: Verified',
            mobileChange: 'Change Mobile Number',
            welcomeBrowse: 'Browse Jobs →',
            unreadCount: 'Unread notifications',
            allCaughtUp: 'You\'re all caught up!',
            markAllRead: 'Mark all as read',
            noNotifications: 'No notifications',
            allRead: 'You\'ve read all your notifications!',
            nothingToShow: 'Nothing to show in this category.',
            subscription: 'Subscription',
            manageSubscription: 'Manage Subscription',
            premiumPlan: 'Premium Plan',
            freePlan: 'Free Plan (Basic)',
            upgradeToPremium: 'Upgrade to Premium Plan',
            bulkHiring: 'Bulk Hiring',
            enterprisePlan: 'Enterprise (Bulk Hiring)',
            bulkHiringSub: 'Unlimited hiring for large projects'
        },
        // Worker Profile
        worker: {
            setupTitle: 'Setup Profile',
            setupSubtitle: 'Help employers find you',
            myProfile: 'My Profile',
            profileDesc: 'Your professional identity visible to employers',
            dailyRate: 'Daily Rate',
            experience: 'Experience',
            rating: 'Rating',
            serviceRadius: 'Service Radius',
            radius: 'Radius',
            skillSet: 'Skill Set',
            portfolio: 'Portfolio',
            noImages: 'No portfolio photos yet',
            addPhotos: '+ Add Photos',
            addPhoto: 'Add Photo',
            editDetails: 'Edit Work Details',
            yearsExp: 'Years of Experience',
            workDetails: 'Work Details',
            skills: 'Skills',
            addSkillPlaceholder: 'Add a new skill...',
            minimumRate: 'Daily Minimum Rate (₹)',
            workRadius: 'Work Radius (km)',
            completeSetup: 'Complete Setup',
            aboutMe: 'About Me',
            bioPlaceholder: 'Tell employers about yourself...',
            noBio: 'No bio added yet. Tap Edit Profile to tell employers about yourself.',
            jobsDone: 'Jobs Done',
            jobsCompleted: 'Jobs Completed',
            monthlyEarnings: 'Earnings (This Month)',
            successRate: 'Success Rate',
            employerReviews: 'Employer Reviews',
            noReviews: 'No reviews yet. Complete jobs to receive employer reviews.',
            reviewsAppear: 'Reviews will appear here from employers you\'ve worked with.',
            changeBanner: 'Change Banner',
            defaultWorkerTitle: 'Worker',
            jobTitleExperiencePlaceholder: 'Job title · Experience',
            // Setup
            profileTitle: 'Set Up Your Profile',
            steps: {
                profile: 'Profile',
                skills: 'Skills'
            },
            fullName: 'Full Name',
            fullNamePlaceholder: 'e.g. Ramesh Kumar',
            cityArea: 'City / Area',
            cityPlaceholder: 'Search your city...',
            primarySkill: 'Primary Skill',
            saveContinue: 'Save & Continue →',
            selectSkillsTitle: 'Select Your Skills',
            selectSkillsSub: 'Pick all skills that apply to you.',
            completeProfile: 'Complete Profile →',
            // Earnings
            totalEarned: 'Total Earned',
            pendingPayment: 'Pending Payment',
            paidOut: 'Paid Out',
            fromAllJobs: 'From all jobs',
            noEarningsYet: 'No earnings yet',
            awaitingPayment: 'Awaiting payment',
            noPending: 'No pending',
            successfullyPaid: 'Successfully paid',
            totalJobs: 'Total jobs',
            paymentHistory: 'Payment History',
            noPaymentsYet: 'No payments yet',
            noPaymentsSub: 'When you complete jobs, your payment history will appear here.'
        },
        // Employer Setup
        employer: {
            setupTitle: 'Set Up Company',
            companyDetailsTitle: 'Company Details',
            companyNameLabel: 'Company Name',
            companyNamePlaceholder: 'e.g. Tata Projects Ltd',
            hiringSectorsTitle: 'Hiring Sectors',
            hiringSectorsSubtitle: 'Select the sectors you hire for.',
            completeSetup: 'Complete Setup',
            myJobs: 'My Jobs',
            candidates: 'Candidates',
            hiringHistory: 'Hiring History',
            myJobListings: 'My Job Listings',
            postNewJob: 'Post New Job',
            applicationSummary: '{pending} pending · {hired} hired · {rejected} rejected',
            activeHiresSummary: '{count} active hires across {jobsCount} jobs',
            completedWorkRecordsSummary: '{count} completed work records',
            activeListingsSummary: '{count} active listings',
            active: 'Active',
            pending: 'Pending',
            hired: 'Hired',
            rejected: 'Rejected',
            noApplications: 'No applications',
            noApplicationsDesc: 'No applications match this filter.',
            inviteToApply: 'Invite to Apply',
            suggestedMatches: 'Suggested Matches',
            suggestedMatchesDesc: 'Workers in your area matching "{category}"',
            autoMatchActive: 'AUTO-MATCH ACTIVE',
            currentApplicants: 'Current Applicants ({count})',
            noActiveApplicants: 'No active applicants for this job.',
            awaitingEntryCode: 'Awaiting Entry Code',
            enterEntryCodePrompt: 'Enter worker\'s unique 4-digit Entry Code to verify arrival:',
            verifySuccess: 'Work Verification Successful!',
            invalidCode: 'Invalid Code. Please ask the worker for the correct code.',
            verifyAndComplete: 'Verify & Complete',
            acceptAndHire: 'Accept & Hire',
            hiringSuccess: 'Hiring {name} successful!',
            rejectedCandidate: 'Rejected Candidate',
            noActiveCandidates: 'No active candidates',
            postJobToReceiveAppsDesc: 'Post a job to start receiving applications.',
            appliedFor: 'Applied for',
            hiredSuccessfully: 'Hired successfully!',
            noHistoryYet: 'No history yet',
            completedHiresDesc: 'Completed hires will appear here as a record.',
            worker: 'Worker',
            job: 'Job',
            wage: 'Wage',
            duration: 'Duration',
            status: 'Status',
            done: 'Done',
            manage: 'Manage',
            viewMatchingWorkers: 'View Matching Workers',
            activeCandidatesCount: '{count} Active',
            filledCount: '{filled}/{total} Filled',
            dashboard: 'Dashboard',
            welcomeBack: 'Welcome back',
            activeJobs: 'Active Jobs',
            totalApplicants: 'Total Applicants',
            hiresMade: 'Hires Made',
            recentApplications: 'Recent Applications',
            noApplicationsYet: 'No applications yet',
            handshakeRequired: 'Handshake Req.',
            workerVerified: 'Worker Verified!',
            codeMismatch: 'Code Mismatch!',
            createJobPosting: 'Create Job Posting',
            reachWorkersInstantly: 'Reach thousands of skilled workers instantly.',
            jobDetailsStep: 'Step 1: Job Details',
            provideBasicInfo: 'Provide basic information about the role.',
            urgentHiring: 'Urgent Hiring',
            urgentBadgeDesc: 'This job is marked as urgent — workers will see a priority badge.',
            jobTitle: 'Job Title',
            jobTitlePlaceholder: 'e.g. Senior Mason, Construction Supervisor',
            category: 'Category',
            jobDescription: 'Job Description',
            descriptionPlaceholder: 'Describe the role, daily tasks, and expectations...',
            requiredSkills: 'Required Skills',
            addSkill: '+ Add Skill',
            nextRequirements: 'Next: Requirements →',
            requirementsStep: 'Step 2: Requirements',
            setPayPerks: 'Set pay, perks and experience level.',
            dailyRate: 'Daily Rate (₹)',
            perks: 'Perks',
            experienceLevel: 'Experience Level',
            nextReview: 'Next: Review →',
            reviewStep: 'Step 3: Review & Post',
            confirmDetails: 'Confirm your job details before publishing.',
            postJob: 'Post Job',
            postJobSuccess: 'Job Posted Successfully!',
            workersNotified: 'Workers are being notified right now.',
            viewMyJobs: 'View My Jobs',
            perks_list: {
                food: '🍱 Free Food',
                transport: '🚌 Transport',
                safety: '🦺 Safety Equipment',
                accommodation: '🏠 Accommodation'
            },
            exp_labels: {
                fresher: 'Fresher',
                '1-3': '1-3 years',
                '3+': '3+ years'
            },
            categories: {
                construction: 'Construction',
                plumbing: 'Plumbing',
                electrical: 'Electrical',
                logistics: 'Logistics',
                agriculture: 'Agriculture',
                manufacturing: 'Manufacturing'
            }
        },
        // Sidebar
        sidebar: {
            welcome: 'Welcome',
            myProfile: 'My Profile',
            settings: 'Settings',
            help: 'Help & Support',
            contact: 'Contact Us',
            preferences: 'Preferences',
            darkMode: 'Dark Mode',
            logout: 'Logout'
        },
        // Help Section
        help: {
            title: 'Help & Support',
            subtitle: 'We\'re here to help. Raise a ticket or browse FAQs.',
            raiseTicket: 'Raise a Ticket',
            myTickets: 'My Tickets',
            faqs: 'FAQs',
            subject: 'Subject',
            selectSubject: 'Select subject...',
            description: 'Description',
            descPlaceholder: 'Describe your issue in detail...',
            submitTicket: 'Submit Ticket',
            submitted: 'Ticket Submitted!',
            respondTime: 'We\'ll respond within 24 hours.',
            submitAnother: 'Submit Another',
            noTickets: 'No tickets raised yet.',
            subjects: {
                paymentnotreceived: 'Payment not received',
                jobnotshown: 'Job not shown',
                accountissue: 'Account issue',
                aadhaarverification: 'Aadhaar verification',
                appbug: 'App bug',
                other: 'Other'
            },
            faqs_list: [
                {
                    q: 'How do I withdraw my earnings?',
                    a: 'Go to the Earnings page and link your bank account or UPI ID to withdraw funds.'
                },
                {
                    q: 'Can I cancel a job application?',
                    a: 'Yes, you can cancel any pending application from the Applications tab before it\'s accepted.'
                },
                {
                    q: 'Can I change my daily rate?',
                    a: 'Yes, go to Profile → Edit and update your daily rate.'
                }
            ]
        },
        // Home Section
        home: {
            findJob: 'Find your next job',
            searchPlaceholder: 'Search jobs, locations...',
            hotJobs: 'Hot Jobs',
            recentJobs: 'Recent Jobs',
            recommended: 'Recommended',
            viewAll: 'View All',
            salary: 'Salary',
            posted: 'Posted',
            applySuccess: 'Applied successfully!',
            alreadyApplied: 'Already applied for this job',
            loginToApply: 'Please log in to apply',
            defaultBio: 'I am interested in this job and confident in my skills.',
            newApplicationTitle: 'New Application!',
            newApplicationBody: 'has applied for your',
            availableJobs: 'Available Jobs',
            noJobs: 'No jobs available',
            noCategoryJobs: 'No',
            tryDifferentCategory: 'Try a different category.',
            noJobsSub: 'No jobs posted yet. Check back soon!',
            viewAllCategories: 'View All Categories'
        },
        // Applications Section
        applications: {
            title: 'My Applications',
            total: 'TOTAL',
            topMatch: 'TOP MATCH',
            arrivalCode: 'Arrival Entry Code (OTP)',
            arrivalCodeSub: 'Share this with the employer when you reach the site.',
            noApplications: 'No',
            emptyPendingSub: 'Apply to jobs from the home screen to see them here.',
            noInStatus: 'No jobs in',
            statusYet: 'status yet.'
        },
        // Teams Section
        teams: {
            title: 'Teams',
            members: 'Members',
            rating: 'Rating',
            jobsDone: 'Jobs Done',
            discoverSquads: 'Discover Squads',
            noTeamsYet: 'No teams yet',
            beFirstSquad: 'Teams will appear here when workers create them. Be the first to start a squad!',
            join: 'Join',
            leave: 'Leave',
            loginFirst: 'Please log in first',
            leftTeam: 'Left the team',
            joinedTeam: 'Joined team!',
            failedToJoin: 'Failed to join'
        },
        // Chat Section
        chat: {
            title: 'Messages',
            searchPlaceholder: 'Search conversations...',
            online: 'Online',
            offline: 'Offline',
            today: 'Today',
            messagePlaceholder: 'Type a message...',
            selectConvo: 'Select a conversation',
            assistant_welcome: 'Hi! I am ShramSetu AI. How can I help you today? 😊'
        },
        // Role Selection
        role: {
            title: 'Who are you?',
            subtitle: 'Choose your account type to get started.',
            workerTitle: 'I am a Worker',
            workerSub: 'Find verified daily wage jobs near you',
            employerTitle: 'I am an Employer',
            employerSub: 'Post jobs and hire verified labor',
            secure: '100% SECURE & VERIFIED',
            next: 'Next Step',
            haveAccount: 'Already have an account?',
            signIn: 'Sign In'
        }
    },
    hi: {
        // Common
        common: {
            back: 'वापस',
            next: 'आगे',
            save: 'सहेजें',
            cancel: 'रद्द करें',
            done: 'हो गया',
            edit: 'संपादित करें',
            delete: 'हटाएं',
            yes: 'हां',
            no: 'नहीं',
            loading: 'लोड हो रहा है...',
            error: 'त्रुटि',
            success: 'सफल',
            home: 'होम',
            applications: 'आवेदन',
            teams: 'टीम्स',
            earnings: 'कमाई',
            messages: 'संदेश',
            worker: 'कार्यकर्ता',
            employer: 'नियोक्ता',
            search: 'नौकरियां, कंपनियां खोजें...',
            viewAll: 'सभी',
            unread: 'अपठित',
            promotional: 'ऑफर',
            urgent: 'ज़रूरी',
            apply: 'अभी आवेदन करें',
            applied: 'आवेदन किया',
            verified: 'सत्यापित',
            new: 'नया',
            export: 'निर्यात करें',
            justNow: 'अभी-अभी',
            workerInitial: 'W',
            newMember: 'नया सदस्य',
            categories: {
                plumber: 'प्लंबर',
                electrician: 'इलेक्ट्रीशियन',
                mason: 'राजमिस्त्री',
                welder: 'वेल्डर',
                painter: 'पेंटर',
                carpenter: 'बढ़ई',
                labor: 'मज़दूर'
            },
            company: 'कंपनी',
            date: 'तारीख',
            status: 'स्थिति',
            amount: 'राशि',
            status_labels: {
                paid: 'भुगतान किया गया',
                pending: 'लंबित',
                failed: 'विफल',
                open: 'खुला है',
                closed: 'बंद',
                accepted: 'स्वीकार कर लिया',
                completed: 'पूरा हुआ',
                rejected: 'अस्वीकार कर दिया',
                in_progress: 'प्रगति में'
            },
            step: 'चरण',
            topMatch: 'टॉप मैच',
            matchPercentage: '{percentage}% मिलान',
            posted: '{time} को पोस्ट किया गया',
            analytics: 'एनालिटिक्स',
            details: 'विवरण',
            requirements: 'आवश्यकताएं',
            review: 'समीक्षा'
        },
        // Authentication
        auth: {
            phoneTitle: 'अपना मोबाइल नंबर दर्ज करें',
            phoneSubtitle: 'हम आपको सत्यापित करने के लिए 6-अंकीय OTP भेजेंगे',
            phonePlaceholder: '98765 43210',
            sendOtp: 'OTP भेजें',
            sendingOtp: 'OTP भेज रहे हैं...',
            otpTitle: 'OTP दर्ज करें',
            otpSubtitle: '+91 पर भेजा गया ',
            resendIn: 'OTP पुनः भेजें ',
            resendOtp: 'OTP पुनः भेजें',
            verifyContinue: 'सत्यापित करें और जारी रखें →',
            verifying: 'सत्यापित किया जा रहा है...',
            changeNumber: '← नंबर बदलें'
        },
        // Splash Screen
        splash: {
            tagline: 'काम मिलेगा। पैसा मिलेगा।',
            poweredBy: 'TrustBridge सत्यापन द्वारा संचालित'
        },
        // Language Selection
        language: {
            title: 'अपनी भाषा चुनें',
            subtitle: 'अपनी पसंदीदा भाषा चुनें',
            voiceHint: 'भाषिणी के साथ वॉइस सपोर्ट जल्द आ रहा है',
            changeAnytime: 'आप सेटिंग्स से कभी भी भाषा बदल सकते हैं',
            translationNote: 'UI अनुवाद जल्द आ रहा है। वर्तमान में आपकी भाषा प्राथमिकता सहेजता है।',
            popular: 'लोकप्रिय',
            viewAll: 'सभी 22+ भाषाएं देखें →'
        },
        // Role Selection
        role: {
            title: 'आप कौन हैं?',
            subtitle: 'शुरू करने के लिए अपने खाते का प्रकार चुनें।',
            workerTitle: 'मैं एक कार्यकर्ता हूँ',
            workerSub: 'अपने आस-पास सत्यााााााापित दैनिक वेतन वाली नौकरियाँ खोजें',
            employerTitle: 'मैं एक नियोक्ता हूँ',
            employerSub: 'नौकरियाँ पोस्ट करें और सत्यापित श्रम को नियुक्त करें',
            secure: '100% सुुुुुुुरक्षित और सत्यापित',
            next: 'अगला कदम',
            haveAccount: 'क्या आपके पास पहले से एक खाता है?',
            signIn: 'साइन इन करें'
        },
        // Settings
        settings: {
            title: 'सेटिंग्स',
            profile: 'मेरी प्रोफ़ाइल',
            language: 'भाषा',
            notifications: 'सूचनाएं',
            privacy: 'गोपनीयता और सुरक्षा',
            export: 'मेरा डेटा निर्यात करें',
            exportDesc: 'JSON के रूप में प्रोफ़ाइल डाउनलोड करें',
            dataInfo: 'आपका डेटा स्थानीय रूप से सहेजा गया है',
            dataDesc: 'आपकी सभी प्रोफ़ाइल जानकारी स्वचालित रूप से आपके ब्राउज़र के स्थानीय स्टोरेज में सहेजी जाती है। आप ऊपर दिए गए बटन का उपयोग करके इसे कभी भी निर्यात कर सकते हैं।',
            storageKey: 'स्टोरेज कुंजी: shramsetu-storage-v2',
            logout: 'लॉगआउट',
            logoutConfirm: 'क्या आप वाकई अपने खाते से लॉग आउट करना चाहते हैं?',
            deleteAccount: 'खाता हटाएं',
            version: 'श्रमसेतु v1.0.0 (पायलट बिल्ड)',
            editProfile: 'प्रोफ़ाइल संपादित करें',
            name: 'नाम',
            email: 'ईमेल (वैकल्पिक)',
            city: 'शहर',
            saveChanges: 'परिवर्तन सहेजें',
            notificationSettings: 'सूचना सेटिंग्स',
            enableNotifications: ' सूचनाएं सक्षम करें',
            jobMatches: 'नौकरी मिलान',
            jobAlerts: 'नौकरी अलर्ट',
            newMessages: 'नए संदेश',
            paymentUpdates: 'भुगतान अपडेट',
            paymentSub: 'वेतन जमा और लंबित अलर्ट',
            on: 'चालू',
            off: 'बंद',
            appearance: 'दिखावट',
            darkMode: 'डार्क मोड',
            darkModeSub: 'डार्क थीम पर स्विच करें',
            support: 'सहायता और सहयोग',
            supportSub: 'अक्सर पूछे जाने वाले प्रश्न, टिकट उठाएं',
            dangerZone: 'डेंजर ज़ोन',
            aadhaarStatus: 'स्थिति: सत्यापित',
            mobileChange: 'मोबाइल नंबर बदलें',
            welcomeBrowse: 'नौकरियां देखें →',
            unreadCount: 'अपठित सूचनाएं',
            allCaughtUp: 'आप पूरी तरह से अपडेट हैं!',
            markAllRead: 'सभी को पढ़ा हुआ मानें',
            noNotifications: 'कोई सूचना नहीं',
            allRead: 'आपने अपनी सभी सूचनाएं पढ़ ली हैं!',
            nothingToShow: 'इस श्रेणी में दिखाने के लिए कुछ नहीं है।',
            subscription: 'सब्सक्रिप्शन',
            manageSubscription: 'सब्सक्रिप्शन प्रबंधित करें',
            premiumPlan: 'प्रीमियम प्लान',
            freePlan: 'फ्री प्लान (बेसिक)',
            upgradeToPremium: 'प्रीमियम प्लान में अपग्रेड करें',
            bulkHiring: 'बल्क हायरिंग',
            enterprisePlan: 'एंटरप्राइज़ (बल्क हायरिंग)',
            bulkHiringSub: 'बड़ी परियोजनाओं के लिए असीमित भर्ती'
        },
        // Worker Profile
        worker: {
            setupTitle: 'प्रोफ़ाइल सेटअप करें',
            setupSubtitle: 'नियोक्ताओं को आपको खोजने में मदद करें',
            myProfile: 'मेरी प्रोफाइल',
            profileDesc: 'आपकी पेशेवर पहचान नियोक्ताओं को दिखाई देती है',
            dailyRate: 'दैनिक दर',
            experience: 'अनुभव',
            rating: 'रेटिंग',
            serviceRadius: 'सेवा त्रिज्या',
            radius: 'त्रिज्या',
            skillSet: 'कौशल सेट',
            portfolio: 'पोर्टफोलियो',
            noImages: 'अभी तक कोई पोर्टफोलियो फोटो नहीं है',
            addPhotos: '+ फोटो जोड़ें',
            addPhoto: 'फोटो जोड़ें',
            editDetails: 'कार्य विवरण संपादित करें',
            yearsExp: 'वर्षों का अनुभव',
            workDetails: 'कार्य विवरण',
            skills: 'कौशल',
            addSkillPlaceholder: 'नया कौशल जोड़ें...',
            minimumRate: 'दैनिक न्यूनतम दर (₹)',
            workRadius: 'कार्य त्रिज्या (किमी)',
            completeSetup: 'सेटअप पूरा करें',
            aboutMe: 'मेरे बारे में',
            bioPlaceholder: 'नियोक्ताओं को अपने बारे में बताएं...',
            noBio: 'अभी तक कोई बायो नहीं जोड़ा गया। नियोक्ताओं को अपने बारे में बताने के लिए प्रोफ़ाइल संपादित करें पर टैप करें।',
            jobsDone: 'किए गए कार्य',
            jobsCompleted: 'कार्य पूर्ण',
            monthlyEarnings: 'कमाई (इस महीने)',
            successRate: 'सफलता दर',
            employerReviews: 'नियोक्ता समीक्षाएं',
            noReviews: 'अभी तक कोई समीक्षा नहीं है। नियोक्ता समीक्षा प्राप्त करने के लिए कार्य पूरे करें।',
            reviewsAppear: 'आपके द्वारा काम किए गए नियोक्ताओं की समीक्षा यहां दिखाई देगी।',
            changeBanner: 'बैनर बदलें',
            defaultWorkerTitle: 'कार्यकर्ता',
            jobTitleExperiencePlaceholder: 'नौकरी का शीर्षक · अनुभव',
            // Setup
            profileTitle: 'अपनी प्रोफ़ाइल सेटअप करें',
            steps: {
                profile: 'प्रोफ़ाइल',
                skills: 'कौशल'
            },
            fullName: 'पूरा नाम',
            fullNamePlaceholder: 'जैसे रमेश कुमार',
            cityArea: 'शहर / क्षेत्र',
            cityPlaceholder: 'अपने शहर की खोज करें...',
            primarySkill: 'प्राथमिक कौशल',
            saveContinue: 'सहेजें और जारी रखें →',
            selectSkillsTitle: 'अपने कौशल चुनें',
            selectSkillsSub: 'उन सभी कौशलों को चुनें जो आप पर लागू होते हैं।',
            completeProfile: 'प्रोफ़ाइल पूरी करें →',
            // Earnings
            totalEarned: 'कुल कमाई',
            pendingPayment: 'लंबित भुगतान',
            paidOut: 'भुगतान किया गया',
            fromAllJobs: 'सभी कार्यों से',
            noEarningsYet: 'अभी तक कोई कमाई नहीं',
            awaitingPayment: 'भुगतान की प्रतीक्षा है',
            noPending: 'कोई लंबित नहीं',
            successfullyPaid: 'सफलतापूर्वक भुगतान किया गया',
            totalJobs: 'कुल कार्य',
            paymentHistory: 'भुगतान इतिहास',
            noPaymentsYet: 'अभी तक कोई भुगतान नहीं',
            noPaymentsSub: 'जब आप कार्य पूरे करते हैं, तो आपका भुगतान इतिहास यहां दिखाई देगा।'
        },
        // Employer Setup
        employer: {
            setupTitle: 'कंपनी सेटअप करें',
            companyDetailsTitle: 'कंपनी का विवरण',
            companyNameLabel: 'कंपनी का नाम',
            companyNamePlaceholder: 'जैसे टाटा प्रोजेक्ट्स लिमिटेड',
            hiringSectorsTitle: 'भर्ती क्षेत्र',
            hiringSectorsSubtitle: 'उन क्षेत्रों का चयन करें जिनके लिए आप भर्ती करते हैं।',
            completeSetup: 'सेटअप पूरा करें',
            myJobs: 'मेरी नौकरियां',
            candidates: 'उम्मीदवार',
            hiringHistory: 'भर्ती इतिहास',
            myJobListings: 'मेरी नौकरी लिस्टिंग',
            postNewJob: 'नई नौकरी पोस्ट करें',
            applicationSummary: '{pending} लंबित · {hired} भर्ती · {rejected} अस्वीकृत',
            activeHiresSummary: '{jobsCount} नौकरियों में {count} सक्रिय नियुक्तियाँ',
            completedWorkRecordsSummary: '{count} पूर्ण कार्य रिकॉर्ड',
            activeListingsSummary: '{count} सक्रिय लिस्टिंग',
            active: 'सक्रिय',
            pending: 'लंबित',
            hired: 'भर्ती किया गया',
            rejected: 'अस्वीकृत',
            noApplications: 'कोई आवेदन नहीं',
            noApplicationsDesc: 'कोई भी आवेदन इस फिल्टर से मेल नहीं खाता।',
            inviteToApply: 'आवेदन के लिए आमंत्रित करें',
            suggestedMatches: 'सुझाए गए मिलान',
            suggestedMatchesDesc: 'आपके क्षेत्र में "{category}" से मेल खाने वाले कार्यकर्ता',
            autoMatchActive: 'ऑटो-मैच सक्रिय',
            currentApplicants: 'वर्तमान आवेदक ({count})',
            noActiveApplicants: 'इस नौकरी के लिए कोई सक्रिय आवेदक नहीं है।',
            awaitingEntryCode: 'प्रवेश कोड की प्रतीक्षा है',
            enterEntryCodePrompt: 'आगमन को सत्यापित करने के लिए कार्यकर्ता का अद्वितीय 4-अंकीय प्रवेश कोड दर्ज करें:',
            verifySuccess: 'कार्य सत्यापन सफल!',
            invalidCode: 'अमान्य कोड। कृपया कार्यकर्ता से सही कोड मांगें।',
            verifyAndComplete: 'सत्यापित करें और पूरा करें',
            acceptAndHire: 'स्वीकार करें और नियुक्त करें',
            hiringSuccess: '{name} की नियुक्ति सफल रही!',
            rejectedCandidate: 'अस्वीकृत उम्मीदवार',
            noActiveCandidates: 'कोई सक्रिय उम्मीदवार नहीं',
            postJobToReceiveAppsDesc: 'आवेदन प्राप्त करने के लिए नौकरी पोस्ट करें।',
            appliedFor: 'के लिए आवेदन किया',
            hiredSuccessfully: 'सफलतापूर्वक नियुक्त किया गया!',
            noHistoryYet: 'अभी तक कोई इतिहास नहीं',
            completedHiresDesc: 'पूर्ण नियुक्तियाँ यहाँ एक रिकॉर्ड के रूप में दिखाई देंगी।',
            worker: 'कार्यकर्ता',
            job: 'नौकरी',
            wage: 'वेतन',
            duration: 'अवधि',
            status: 'स्थिति',
            done: 'हो गया',
            manage: 'प्रबंधित करें',
            viewMatchingWorkers: 'मिलान करने वाले कार्यकर्ताओं को देखें',
            activeCandidatesCount: '{count} सक्रिय',
            filledCount: '{filled}/{total} भरे हुए',
            dashboard: 'डैशबोर्ड',
            welcomeBack: 'वापस स्वागत है',
            activeJobs: 'सक्रिय नौकरियां',
            totalApplicants: 'कुल आवेदक',
            hiresMade: 'की गई नियुक्तियाँ',
            recentApplications: 'हाल के आवेदन',
            noApplicationsYet: 'अभी तक कोई आवेदन नहीं',
            handshakeRequired: 'हैंडशेक आवश्यक',
            workerVerified: 'कार्यकर्ता सत्यापित!',
            codeMismatch: 'कोड बेमेल!',
            createJobPosting: 'नौकरी लिस्टिंग बनाएं',
            reachWorkersInstantly: 'हजारों कुशल श्रमिकों तक तुरंत पहुंचें।',
            jobDetailsStep: 'चरण 1: नौकरी का विवरण',
            provideBasicInfo: 'भूमिका के बारे में बुनियादी जानकारी प्रदान करें।',
            urgentHiring: 'तत्काल भर्ती',
            urgentBadgeDesc: 'इस नौकरी को तत्काल के रूप में चिह्नित किया गया है - श्रमिकों को एक प्राथमिकता बैज दिखाई देगा।',
            jobTitle: 'नौकरी का शीर्षक',
            jobTitlePlaceholder: 'जैसे सीनियर मेसन, कंस्ट्रक्शन सुपरवाइजर',
            category: 'श्रेणी',
            jobDescription: 'नौकरी का विवरण',
            descriptionPlaceholder: 'भूमिका, दैनिक कार्यों और अपेक्षाओं का वर्णन करें...',
            requiredSkills: 'आवश्यक कौशल',
            addSkill: '+ कौशल जोड़ें',
            nextRequirements: 'अगला: आवश्यकताएं →',
            requirementsStep: 'चरण 2: आवश्यकताएं',
            setPayPerks: 'वेतन, भत्ते और अनुभव स्तर निर्धारित करें।',
            dailyRate: 'दैनिक दर (₹)',
            perks: 'भत्ते',
            experienceLevel: 'अनुभव स्तर',
            nextReview: 'अगला: समीक्षा →',
            reviewStep: 'चरण 3: समीक्षा और पोस्ट',
            confirmDetails: 'प्रकाशित करने से पहले अपनी नौकरी के विवरण की पुष्टि करें।',
            postJob: 'नौकरी पोस्ट करें',
            postJobSuccess: 'नौकरी सफलतापूर्वक पोस्ट की गई!',
            workersNotified: 'श्रमिकों को अभी सूचित किया जा रहा है।',
            viewMyJobs: 'मेरी नौकरियां देखें',
            perks_list: {
                food: '🍱 मुफ्त भोजन',
                transport: '🚌 परिवहन',
                safety: '🦺 सुरक्षा उपकरण',
                accommodation: '🏠 आवास'
            },
            exp_labels: {
                fresher: 'फ्रेशर',
                '1-3': '1-3 साल',
                '3+': '3+ साल'
            },
            categories: {
                construction: 'निर्माण',
                plumbing: 'प्लंबिंग',
                electrical: 'इलेक्ट्रिकल',
                logistics: 'लॉजिस्टिक्स',
                agriculture: 'कृषि',
                manufacturing: 'विनिर्माण'
            }
        },
        // Sidebar
        sidebar: {
            welcome: 'स्वागत है',
            myProfile: 'मेरी प्रोफ़ाइल',
            settings: 'सेटिंग्स',
            help: 'सहायता और सहयोग',
            contact: 'हमसे संपर्क करें',
            preferences: 'प्राथमिकताएं',
            darkMode: 'डार्क मोड',
            logout: 'लॉगआउट'
        },
        // Help Section
        help: {
            title: 'सहायता और सहयोग',
            subtitle: "हम यहाँ मदद के लिए हैं। टिकट उठाएं या अक्सर पूछे जाने वाले प्रश्न देखें।",
            raiseTicket: 'टिकट उठाएं',
            myTickets: 'मेरे टिकट',
            faqs: 'अक्सर पूछे जाने वाले प्रश्न',
            subject: 'विषय',
            selectSubject: 'विषय चुनें...',
            description: 'विवरण',
            descPlaceholder: 'अपनी समस्या का विस्तार से वर्णन करें...',
            submitTicket: 'टिकट जमा करें',
            submitted: 'टिकट जमा हो गया!',
            respondTime: 'हम 24 घंटे के भीतर जवाब देंगे।',
            submitAnother: 'एक और जमा करें',
            noTickets: 'अभी तक कोई टिकट नहीं उठाया गया।',
            subjects: {
                paymentnotreceived: 'भुगतान प्राप्त नहीं हुआ',
                jobnotshown: 'नौकरी नहीं दिख रही',
                accountissue: 'खाता संबंधी समस्या',
                aadhaarverification: 'आधार सत्यापन',
                appbug: 'ऐप बग',
                other: 'अन्य'
            },
            faqs_list: [
                {
                    q: 'मैं अपनी कमाई कैसे निकालूँ?',
                    a: 'कमाई पृष्ठ पर जाएँ और धन निकालने के लिए अपना बैंक खाता या UPI ID लिंक करें।'
                },
                {
                    q: 'क्या मैं नौकरी आवेदन रद्द कर सकता हूँ?',
                    a: 'हाँ, आप किसी भी लंबित आवेदन को स्वीकार होने से पहले आवेदन टैब से रद्द कर सकते हैं।'
                },
                {
                    q: 'क्या मैं अपनी दैनिक दर बदल सकता हूँ?',
                    a: 'हाँ, प्रोफ़ाइल → संपादित करें पर जाएँ और अपनी दैनिक दर अपडेट करें।'
                }
            ]
        },
        // Home Section
        home: {
            findJob: 'अपनी अगली नौकरी खोजें',
            searchPlaceholder: 'नौकरियां, स्थान खोजें...',
            hotJobs: 'लोकप्रिय नौकरियां',
            recentJobs: 'हालिया नौकरियां',
            recommended: 'अनुशंसित',
            viewAll: 'सभी देखें',
            salary: 'वेतन',
            posted: 'डाला गया',
            applySuccess: 'सफलतापूर्वक आवेदन किया गया!',
            alreadyApplied: 'इस नौकरी के लिए पहले ही आवेदन किया जा चुका है',
            loginToApply: 'आवेदन करने के लिए कृपया लॉगिन करें',
            defaultBio: 'मैं इस नौकरी में रुचि रखता हूँ और अपने कौशल पर विश्वास रखता हूँ।',
            newApplicationTitle: 'नया आवेदन!',
            newApplicationBody: 'ने आपके लिए आवेदन किया है',
            availableJobs: 'उपलब्ध नौकरियां',
            noJobs: 'कोई नौकरी उपलब्ध नहीं है',
            noCategoryJobs: 'कोई',
            tryDifferentCategory: 'कोई अन्य श्रेणी आज़माएं।',
            noJobsSub: 'अभी तक कोई नौकरी पोस्ट नहीं की गई है। जल्द ही वापस देखें!',
            viewAllCategories: 'सभी श्रेणियां देखें'
        },
        // Applications Section
        applications: {
            title: 'मेरे आवेदन',
            total: 'कुल',
            topMatch: 'सर्वश्रेष्ठ मिलान',
            arrivalCode: 'आगमन प्रवेश कोड (OTP)',
            arrivalCodeSub: 'साइट पर पहुँचने पर नियोक्ता के साथ इसे साझा करें।',
            noApplications: 'कोई',
            emptyPendingSub: 'उन्हें यहाँ देखने के लिए होम स्क्रीन से नौकरियों के लिए आवेदन करें।',
            noInStatus: 'में कोई नौकरी नहीं',
            statusYet: 'स्थिति अभी तक।'
        },
        // Teams Section
        teams: {
            title: 'टीमें',
            members: 'सदस्य',
            rating: 'रेटिंग',
            jobsDone: 'कार्य पूरा हुआ',
            discoverSquads: 'दस्तों की खोज करें',
            noTeamsYet: 'अभी कोई टीम नहीं',
            beFirstSquad: 'जब कार्यकर्ता उन्हें बनाएंगे तो टीमें यहाँ दिखाई देंगी। पहली टीम शुरू करने वाले बनें!',
            join: 'शामिल हों',
            leave: 'छोड़ें',
            loginFirst: 'कृपया पहले लॉगिन करें',
            leftTeam: 'टीम छोड़ दी',
            joinedTeam: 'टीम में शामिल हो गए!',
            failedToJoin: 'शामिल होने में विफल'
        },
        // Chat Section
        chat: {
            title: 'संदेश',
            searchPlaceholder: 'बातचीत खोजें...',
            online: 'ऑनलाइन',
            offline: 'ऑफलाइन',
            today: 'आज',
            messagePlaceholder: 'सुुुुंदेश लिखें...',
            selectConvo: 'एक बातचीत चुनें',
            assistant_welcome: 'नमस्ते! मैं ShramSetu AI हूँ। आज मैं आपकी क्या मदद कर सकता हूँ? 😊'
        }
    },
    or: {
        // Common
        common: {
            back: 'ଫେରନ୍ତୁ',
            next: 'ପରବର୍ତ୍ତୀ',
            save: 'ସେଭ୍ କରନ୍ତୁ',
            cancel: 'ବାତିଲ୍ କରନ୍ତୁ',
            done: 'ସମ୍ପନ୍ନ ହେଲା',
            edit: 'ସମ୍ପାଦନ କରନ୍ତୁ',
            delete: 'ଡିଲିଟ୍ କରନ୍ତୁ',
            yes: 'ହଁ',
            no: 'ନା',
            loading: 'ଲୋଡ୍ ହେଉଛି...',
            error: 'ତ୍ରୁଟି',
            success: 'ସଫଳ',
            home: 'ମୂଳପୃଷ୍ଠା',
            applications: 'ଆବେଦନ',
            teams: 'ଟିମ୍',
            earnings: 'ରୋଜଗାର',
            messages: 'ମେସେଜ୍‌',
            worker: 'ଶ୍ରମିକ',
            employer: 'ନିଯୁକ୍ତିଦାତା',
            search: 'ଚାକିରି, କମ୍ପାନୀ ଖୋଜନ୍ତୁ...',
            viewAll: 'ସମସ୍ତ',
            unread: 'ଅପଠିତ',
            promotional: 'ଅଫର',
            urgent: 'ଜରୁରୀ',
            apply: 'ଏବେ ଆବେଦନ କରନ୍ତୁ',
            applied: 'ଆବେଦନ କରାଯାଇଛି',
            verified: 'ଯାଞ୍ଚ ହୋଇଛି',
            new: 'ନୂଆ',
            export: 'ଏକ୍ସପୋର୍ଟ',
            justNow: 'ଏବେ',
            workerInitial: 'W',
            newMember: 'ନୂଆ ସଦସ୍ୟ',
            categories: {
                plumber: 'ପ୍ଲମ୍ବର',
                electrician: 'ଇଲେକ୍ଟ୍ରିସିଆନ୍',
                mason: 'ରାଜମିସ୍ତ୍ରୀ',
                welder: 'ୱେଲଡର',
                painter: 'ପେଣ୍ଟର',
                carpenter: 'ବଢ଼େଇ',
                labor: 'ଶ୍ରମିକ'
            },
            company: 'କମ୍ପାନୀ',
            date: 'ତାରିଖ',
            status: 'ସ୍ଥିତି',
            amount: 'ପରିମାଣ',
            status_labels: {
                paid: 'ଦେୟ ସମ୍ପନ୍ନ',
                pending: 'ବିଚାରାଧୀନ',
                failed: 'ବିଫଳ',
                open: 'ଖୋଲା ଅଛି',
                closed: 'ବନ୍ଦ',
                accepted: 'ଗ୍ରହଣ କରାଯାଇଛି',
                completed: 'ସମ୍ପନ୍ନ',
                rejected: 'ପ୍ରତ୍ୟାଖ୍ୟାତ',
                active: 'ସକ୍ରିୟ',
                in_progress: 'ଚାଲୁଅଛି'
            },
            step: 'ପଦକ୍ଷେପ',
            topMatch: 'ସର୍ବୋତ୍ତମ ମେଳ',
            matchPercentage: '{percentage}% ମେଳ',
            posted: '{time} ପୂର୍ବରୁ ପୋଷ୍ଟ କରାଯାଇଛି',
            analytics: 'ବିଶ୍ଳେଷଣ',
            details: 'ବିବରଣୀ',
            requirements: 'ଆବଶ୍ୟକତା',
            review: 'ସମୀକ୍ଷା',
            errorDescription: 'କ୍ଷମା କରିବେ, କିଛି ସମସ୍ୟା ହେଲା। ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ।',
            internet_error: 'ନେଟୱାର୍କ ତ୍ରୁଟି। ଦୟାକରି ଇଣ୍ଟରନେଟ୍ ଯାଞ୍ଚ କରନ୍ତୁ।'
        },
        // Authentication
        auth: {
            phoneTitle: 'ଆପଣଙ୍କର ମୋବାଇଲ୍ ନମ୍ବର ପ୍ରବେଶ କରନ୍ତୁ',
            phoneSubtitle: 'ଆମେ ଯାଞ୍ଚ ପାଇଁ ୬-ଅଙ୍କ ବିଶିଷ୍ଟ OTP ପଠାଇବୁ',
            phonePlaceholder: '98765 43210',
            sendOtp: 'OTP ପଠାନ୍ତୁ',
            sendingOtp: 'OTP ପଠାଯାଉଛି...',
            otpTitle: 'OTP ପ୍ରବେଶ କରନ୍ତୁ',
            otpSubtitle: '+91 କୁ ପଠାଯାଇଛି ',
            resendIn: 'OTP ପୁଣି ପଠାନ୍ତୁ ',
            resendOtp: 'OTP ପୁଣି ପଠାନ୍ତୁ',
            verifyContinue: 'ଯାଞ୍ଚ କରନ୍ତୁ ଏବଂ ଜାରି ରଖନ୍ତୁ →',
            verifying: 'ଯାଞ୍ଚ ହେଉଛି...',
            changeNumber: '← ନମ୍ବର ବଦଳାନ୍ତୁ',
            errorInvalidPhone: 'ଅବୈଧ ଫୋନ୍ ନମ୍ବର। ଦୟାକରି ଯାଞ୍ଚ କରି ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ।',
            errorTooManyRequests: 'ଅତ୍ୟଧିକ OTP ଚେଷ୍ଟା। ଦୟାକରି କିଛି ସମୟ ଅପେକ୍ଷା କରନ୍ତୁ।',
            errorQuotaExceeded: 'SMS କୋଟା ଶେଷ ହୋଇଛି। ଦୟାକରି ପରେ ଚେଷ୍ଟା କରନ୍ତୁ।',
            errorSendFailed: 'OTP ପଠାଇବାରେ ବିଫଳ। ଦୟାକରି ଇଣ୍ଟରନେଟ୍ ଯାଞ୍ଚ କରନ୍ତୁ।',
            errorOtpExpired: 'OTP ସମୟ ସୀମା ଶେଷ ହୋଇଛି। ନୂଆ OTP ପାଇଁ ଅନୁରୋଧ କରନ୍ତୁ।',
            errorIncorrectOtp: 'ଭୁଲ OTP। ଦୟାକରି ଯାଞ୍ଚ କରି ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ।',
            errorVerifyFailed: 'ଯାଞ୍ଚ ବିଫଳ। ଦୟାକରି ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ।'
        },
        // Splash Screen
        splash: {
            tagline: 'କାମ ମିଳିବ। ଟଙ୍କା ମିଳିବ।',
            poweredBy: 'TrustBridge ଯାଞ୍ଚ ଦ୍ୱାରା ପରିଚାଳିତ'
        },
        // Language Selection
        language: {
            title: 'ଆପଣଙ୍କର ଭାଷା ବାଛନ୍ତୁ',
            subtitle: 'ଆପଣଙ୍କର ପସନ୍ଦର ଭାଷା ବାଛନ୍ତୁ',
            voiceHint: 'ଭାସିନୀ ସହିତ ଭଏସ୍ ସମର୍ଥନ ଶୀଘ୍ର ଆସୁଛି',
            changeAnytime: 'ଆପଣ ସେଟିଂସରୁ ଯେକୌଣସି ସମୟରେ ଭାଷା ପରିବର୍ତ୍ତନ କରିପାରିବେ',
            translationNote: 'UI ଅନୁବାଦ ଶୀଘ୍ର ଆସୁଛି। ବର୍ତ୍ତମାନ ଆପଣଙ୍କର ଭାଷା ପସନ୍ଦ ସେଭ୍ କରେ।',
            popular: 'ଲୋକପ୍ରିୟ',
            viewAll: 'ସମସ୍ତ 22+ ଭାଷା ଦେଖନ୍ତୁ →'
        },
        // Role Selection
        role: {
            title: 'ଆପଣ କିଏ?',
            subtitle: 'ଆରମ୍ଭ କରିବା ପାଇଁ ଆପଣଙ୍କର ଆକାଉଣ୍ଟ୍ ପ୍ରକାର ବାଛନ୍ତୁ।',
            workerTitle: 'ମୁଁ ଜଣେ ଶ୍ରମିକ',
            workerSub: 'ଆପଣଙ୍କ ପାଖରେ ଥିବା ଯାଞ୍ଚ ହୋଇଥିବା ଦୈନିକ ମଜୁରୀ କାମ ଖୋଜନ୍ତୁ',
            employerTitle: 'ମୁଁ ଜଣେ ନିଯୁକ୍ତିଦାତା',
            employerSub: 'ଚାକିରି ପୋଷ୍ଟ କରନ୍ତୁ ଏବଂ ଯାଞ୍ଚ ହୋଇଥିବା ଶ୍ରମିକଙ୍କୁ ନିଯୁକ୍ତି ଦିଅନ୍ତୁ',
            secure: '୧୦୦% ସୁରକ୍ଷିତ ଏବଂ ଯାଞ୍ଚ ହୋଇଛି',
            next: 'ପରବର୍ତ୍ତୀ ପଦକ୍ଷେପ',
            haveAccount: 'ଆପଣଙ୍କର ପୂର୍ବରୁ ଆକାଉଣ୍ଟ୍ ଅଛି କି?',
            signIn: 'ସାଇନ୍ ଇନ୍ କରନ୍ତୁ'
        },
        // Settings
        settings: {
            title: 'ସେଟିଂସ',
            profile: 'ମୋ ପ୍ରୋଫାଇଲ୍',
            language: 'ଭାଷା',
            account: 'ଖାତା',
            kycVerification: 'KYC ଯାଞ୍ଚ',
            notifications: 'ବିଜ୍ଞପ୍ତିଗୁଡ଼ିକ',
            privacy: 'ଗୋପନୀୟତା ଏବଂ ସୁରକ୍ଷା',
            export: 'ମୋ ଡାଟା ଏକ୍ସପୋର୍ଟ କରନ୍ତୁ',
            exportDesc: 'JSON ଭାବରେ ପ୍ରୋଫାଇଲ୍ ଡାଉନଲୋଡ୍ କରନ୍ତୁ',
            dataInfo: 'ଆପଣଙ୍କର ଡାଟା ଲୋକାଲ୍‌ରେ ସେଭ୍ ହୋଇଛି',
            dataDesc: 'ଆପଣଙ୍କର ସମସ୍ତ ପ୍ରୋଫାଇଲ୍ ସୂଚନା ଆପଣଙ୍କର ବ୍ରାଉଜର୍‌ର ଲୋକାଲ୍ ଷ୍ଟୋରେଜ୍‌ରେ ସ୍ୱୟଂଚାଳିତ ଭାବରେ ସେଭ୍ ହୁଏ। ଆପଣ ଉପରୋକ୍ତ ବଟନ୍ ବ୍ୟବହାର କରି ଏହାକୁ ଯେକୌଣସି ସମୟରେ ଏକ୍ସପୋର୍ଟ କରିପାରିବେ।',
            storageKey: 'ଷ୍ଟୋରେଜ୍ କି: shramsetu-storage-v2',
            logout: 'ଲଗଆଉଟ୍',
            logoutConfirm: 'ଆପଣ ନିଶ୍ଚିତ କି ଆପଣ ଲଗଆଉଟ୍ କରିବାକୁ ଚାହୁଁଛନ୍ତି?',
            deleteAccount: 'ଆକାଉଣ୍ଟ୍ ଡିଲିଟ୍ କରନ୍ତୁ',
            deleteConfirm: 'ଏହି କାର୍ଯ୍ୟ ସ୍ଥାୟୀ ଏବଂ ଏହାକୁ ଅଣଦେଖା କରାଯାଇପାରିବ ନାହିଁ। ଆପଣଙ୍କର ସମସ୍ତ ଡାଟା, ଚାକିରି ଏବଂ ଚାଟ୍ ଇତିହାସ ଡିଲିଟ୍ ହୋଇଯିବ।',
            version: 'ଶ୍ରମସେତୁ v2.0.0',
            editProfile: 'ପ୍ରୋଫାଇଲ୍ ସମ୍ପାଦନ କରନ୍ତୁ',
            name: 'ନାମ',
            email: 'ଇମେଲ୍ (ବୈକଳ୍ପିକ)',
            city: 'ସହର',
            saveChanges: 'ପରିବର୍ତ୍ତନଗୁଡିକ ସେଭ୍ କରନ୍ତୁ',
            notificationSettings: 'ବିଜ୍ଞପ୍ତି ସେଟିଂସ',
            enableNotifications: 'ବିଜ୍ଞପ୍ତିଗୁଡିକ ସକ୍ଷମ କରନ୍ତୁ',
            jobMatches: 'ଚାକିରି ମେଳ',
            jobMatchesSub: 'ମେଳ ଖାଉଥିବା ଚାକିରି ବିଷୟରେ ଜାଣନ୍ତୁ',
            jobAlerts: 'ଚାକିରି ଆଲର୍ଟ',
            newMessages: 'ନୂଆ ମେସେଜ୍‌',
            newMessagesSub: 'ନୂଆ ବାର୍ତ୍ତା ପାଇଁ ଆଲର୍ଟ',
            paymentUpdates: 'ଦେୟ ଅପଡେଟ୍',
            paymentSub: 'ଦରମା ଜମା ଏବଂ ବିଚାରାଧୀନ ଆଲର୍ଟ',
            on: 'ଅନ୍',
            off: 'ଅଫ୍',
            appearance: 'ଦୃଶ୍ୟ',
            darkMode: 'ଡାର୍କ ମୋଡ୍',
            darkModeSub: 'ଡାର୍କ ଥିମ୍ ବ୍ୟବହାର କରନ୍ତୁ',
            support: 'ସାହାଯ୍ୟ',
            supportSub: 'FAQs, ଟିକେଟ୍ ଦାଖଲ କରନ୍ତୁ',
            dangerZone: 'ବିପଦ କ୍ଷେତ୍ର',
            aadhaarStatus: 'ସ୍ଥିତି: ଯାଞ୍ଚ ହୋଇଛି',
            mobileChange: 'ମୋବାଇଲ୍ ନମ୍ବର ବଦଳାନ୍ତୁ',
            welcomeBrowse: 'ଚାକିରି ଖୋଜନ୍ତୁ →',
            unreadCount: 'ଅପଠିତ ବିଜ୍ଞପ୍ତି',
            allCaughtUp: 'ସବୁ ଠିକ୍ ଅଛି!',
            markAllRead: 'ସବୁ ପଢ଼ା ସରିଛି କରନ୍ତୁ',
            noNotifications: 'କୌଣସି ବିଜ୍ଞପ୍ତି ନାହିଁ',
            allRead: 'ଆପଣ ସମସ୍ତ ବିଜ୍ଞପ୍ତି ପଢ଼ି ସାରିଛନ୍ତି!',
            nothingToShow: 'ଏହି ବିଭାଗରେ ଦେଖାଇବା ପାଇଁ କିଛି ନାହିଁ।',
            subscription: 'ସବସ୍କ୍ରିପସନ୍',
            manageSubscription: 'ସବସ୍କ୍ରିପସନ୍ ପରିଚାଳନା କରନ୍ତୁ',
            premiumPlan: 'ପ୍ରିମିୟମ୍ ପ୍ଲାନ୍',
            freePlan: 'ମାଗଣା ପ୍ଲାନ୍',
            upgradeToPremium: 'ପ୍ରିମିୟମ୍ ପ୍ଲାନ୍‌କୁ ଅପଗ୍ରେଡ୍ କରନ୍ତୁ',
            bulkHiring: 'ବଲ୍କ ହାୟରିଂ',
            enterprisePlan: 'ଏଣ୍ଟରପ୍ରାଇଜ୍ (ବଲ୍କ ହାୟରିଂ)',
            bulkHiringSub: 'ବଡ଼ ପ୍ରକଳ୍ପ ପାଇଁ ଅସୀମିତ ନିଯୁକ୍ତି'
        },
        // Worker Profile
        worker: {
            setupTitle: 'ପ୍ରୋଫାଇଲ୍ ସେଟଅପ୍ କରନ୍ତୁ',
            setupSubtitle: 'ନିଯୁକ୍ତିଦାତାମାନଙ୍କୁ ଆପଣଙ୍କୁ ଖୋଜିବାରେ ସାହାଯ୍ୟ କରନ୍ତୁ',
            myProfile: 'ମୋ ପ୍ରୋଫାଇଲ୍',
            profileDesc: 'ଆପଣଙ୍କର ପେସାଦାର ପରିଚୟ ନିଯୁକ୍ତିଦାତାମାନଙ୍କୁ ଦୃଶ୍ୟମାନ',
            dailyRate: 'ଦୈନିକ ହାର',
            experience: 'ଅଭିଜ୍ଞତା',
            rating: 'ରେଟିଂ',
            serviceRadius: 'ସେବା ବ୍ୟାସାର୍ଦ୍ଧ',
            radius: 'ବ୍ୟାସାର୍ଦ୍ଧ',
            skillSet: 'ଦକ୍ଷତା ସେଟ୍',
            portfolio: 'ପୋର୍ଟଫୋଲିଓ',
            noImages: 'ଏପର୍ଯ୍ୟନ୍ତ କୌଣସି ଫଟୋ ନାହିଁ',
            addPhotos: '+ ଫଟୋ ଯୋଡନ୍ତୁ',
            addPhoto: 'ଫଟୋ ଯୋଡନ୍ତୁ',
            editDetails: 'କାର୍ଯ୍ୟ ବିବରଣୀ ସମ୍ପାଦନ କରନ୍ତୁ',
            yearsExp: 'ଅଭିଜ୍ଞତା ବର୍ଷ',
            workDetails: 'କାର୍ଯ୍ୟ ବିବରଣୀ',
            skills: 'ଦକ୍ଷତା',
            addSkillPlaceholder: 'ନୂଆ ଦକ୍ଷତା ଯୋଡନ୍ତୁ...',
            minimumRate: 'ଦୈନିକ ସର୍ବନିମ୍ନ ହାର (₹)',
            workRadius: 'କାର୍ଯ୍ୟ ବ୍ୟାସାର୍ଦ୍ଧ (କିମି)',
            completeSetup: 'ସେଟଅପ୍ ସମ୍ପୂର୍ଣ୍ଣ କରନ୍ତୁ',
            aboutMe: 'ମୋ ବିଷୟରେ',
            bioPlaceholder: 'ନିଯୁକ୍ତିଦାତାମାନଙ୍କୁ ଆପଣଙ୍କ ବିଷୟରେ କୁହନ୍ତୁ...',
            noBio: 'ଏପର୍ଯ୍ୟନ୍ତ କୌଣସି ବାୟୋ ଯୋଡା ଯାଇ ନାହିଁ।',
            jobsDone: 'କାମ ସମ୍ପନ୍ନ',
            jobsCompleted: 'ସମ୍ପୂର୍ଣ୍ଣ କାମ',
            monthlyEarnings: 'ରୋଜଗାର (ଏହି ମାସ)',
            successRate: 'ସଫଳତା ହାର',
            employerReviews: 'ନିଯୁକ୍ତିଦାତା ସମୀକ୍ଷା',
            noReviews: 'ଏପର୍ଯ୍ୟନ୍ତ କୌଣସି ସମୀକ୍ଷା ନାହିଁ।',
            reviewsAppear: 'ଆପଣ କାର୍ଯ୍ୟ କରିଥିବା ନିଯୁକ୍ତିଦାତାଙ୍କ ସମୀକ୍ଷା ଏଠାରେ ଦେଖାଯିବ।',
            changeBanner: 'ବ୍ୟାନର ବଦଳାନ୍ତୁ',
            defaultWorkerTitle: 'ଶ୍ରମିକ',
            jobTitleExperiencePlaceholder: 'ଚାକିରି ଶିରୋନାମା · ଅଭିଜ୍ଞତା',
            // Setup
            profileTitle: 'ଆପଣଙ୍କର ପ୍ରୋଫାଇଲ୍ ସେଟ୍ ଅପ୍ କରନ୍ତୁ',
            steps: {
                profile: 'ପ୍ରୋଫାଇଲ୍',
                skills: 'ଦକ୍ଷତା'
            },
            fullName: 'ପୁରା ନାମ',
            fullNamePlaceholder: 'ଉଦାହରଣ: ରମେଶ କୁମାର',
            cityArea: 'ସହର / ଅଞ୍ଚଳ',
            cityPlaceholder: 'ଆପଣଙ୍କ ସହର ଖୋଜନ୍ତୁ...',
            primarySkill: 'ପ୍ରାଥମିକ ଦକ୍ଷତା',
            saveContinue: 'ସେଭ୍ କରନ୍ତୁ ଏବଂ ଜାରି ରଖନ୍ତୁ →',
            selectSkillsTitle: 'ଆପଣଙ୍କର ଦକ୍ଷତା ବାଛନ୍ତୁ',
            selectSkillsSub: 'ଆପଣଙ୍କ ପାଇଁ ପ୍ରଯୁଜ୍ୟ ସମସ୍ତ ଦକ୍ଷତା ବାଛନ୍ତୁ।',
            completeProfile: 'ପ୍ରୋଫାଇଲ୍ ସମ୍ପୂର୍ଣ୍ଣ କରନ୍ତୁ →',
            // Earnings
            totalEarned: 'ସମୁଦାୟ ରୋଜଗାର',
            pendingPayment: 'ବିଚାରାଧୀନ ଦେୟ',
            paidOut: 'ଦେୟ ପ୍ରଦାନ',
            fromAllJobs: 'ସମସ୍ତ କାମରୁ',
            noEarningsYet: 'ଏପର୍ଯ୍ୟନ୍ତ କୌଣସି ରୋଜଗାର ନାହିଁ',
            awaitingPayment: 'ଦେୟ ପାଇଁ ଅପେକ୍ଷା',
            noPending: 'କିଛି ବିଚାରାଧୀନ ନାହିଁ',
            successfullyPaid: 'ସଫଳତାର ସହିତ ଦେୟ ପ୍ରଦାନ କରାଗଲା',
            totalJobs: 'ସମୁଦାୟ କାମ',
            paymentHistory: 'ଦେୟ ଇତିହାସ',
            noPaymentsYet: 'ଏପର୍ଯ୍ୟନ୍ତ କୌଣସି ଦେୟ ନାହିଁ',
            noPaymentsSub: 'ଆପଣ କାମ ସମ୍ପୂର୍ଣ୍ଣ କଲେ, ଆପଣଙ୍କର ଦେୟ ଇତିହାସ ଏଠାରେ ଦେଖାଯିବ।'
        },
        // Employer Setup
        employer: {
            setupTitle: 'କମ୍ପାନୀ ସେଟଅପ୍ କରନ୍ତୁ',
            companyDetailsTitle: 'କମ୍ପାନୀ ବିବରଣୀ',
            companyNameLabel: 'କମ୍ପାନୀ ନାମ',
            companyNamePlaceholder: 'ଉଦାହରଣ: ଟାଟା ପ୍ରୋଜେକ୍ଟସ୍ ଲିମିଟେଡ୍',
            hiringSectorsTitle: 'ନିଯୁକ୍ତି କ୍ଷେତ୍ର',
            hiringSectorsSubtitle: 'ଆପଣ ନିଯୁକ୍ତି କରୁଥିବା କ୍ଷେତ୍ରଗୁଡିକ ବାଛନ୍ତୁ।',
            completeSetup: 'ସେଟଅପ୍ ସଫଳ',
            myJobs: 'ମୋର ଚାକିରି',
            candidates: 'ପ୍ରାର୍ଥୀ',
            hiringHistory: 'ନିଯୁକ୍ତି ଇତିହାସ',
            myJobListings: 'ମୋର ଚାକିରି ଲିଷ୍ଟ୍',
            postNewJob: 'ନୂଆ ଚାକିରି ପୋଷ୍ଟ କରନ୍ତୁ',
            applicationSummary: '{pending} ବିଚାରାଧୀନ · {hired} ନିଯୁକ୍ତ · {rejected} ପ୍ରତ୍ୟାଖ୍ୟାତ',
            activeHiresSummary: '{jobsCount} ଟି ଚାକିରି ମଧ୍ୟରେ {count} ଟି ସକ୍ରିୟ ନିଯୁକ୍ତି',
            completedWorkRecordsSummary: '{count} ଟି ସମ୍ପୂର୍ଣ୍ଣ କାର୍ଯ୍ୟ ରେକର୍ଡ',
            activeListingsSummary: '{count} ଟି ସକ୍ରିୟ ଲିଷ୍ଟ୍',
            active: 'ସକ୍ରିୟ',
            pending: 'ବିଚାରାଧୀନ',
            hired: 'ନିଯୁକ୍ତ',
            rejected: 'ପ୍ରତ୍ୟାଖ୍ୟାତ',
            noApplications: 'କୌଣସି ଆବେଦନ ନାହିଁ',
            noApplicationsDesc: 'ଏହି ଫିଲ୍ଟର୍ ସହିତ କୌଣସି ଆବେଦନ ମେଳ ଖାଉ ନାହିଁ।',
            inviteToApply: 'ଆବେଦନ ପାଇଁ ନିମନ୍ତ୍ରଣ କରନ୍ତୁ',
            suggestedMatches: 'ପରାମର୍ଶିତ ମେଳ',
            suggestedMatchesDesc: 'ଆପଣଙ୍କ ଅଞ୍ଚଳରେ "{category}" ସହିତ ମେଳ ଖାଉଥିବା ଶ୍ରମିକ',
            autoMatchActive: 'ଅଟୋ-ମେଳ ସକ୍ରିୟ',
            currentApplicants: 'ସାମ୍ପ୍ରତିକ ଆବେଦନକାରୀ ({count})',
            noActiveApplicants: 'ଏହି ଚାକିରି ପାଇଁ କୌଣସି ସକ୍ରିୟ ଆବେଦନକାରୀ ନାହାଁନ୍ତି।',
            awaitingEntryCode: 'ପ୍ରବେଶ କୋଡ୍‌କୁ ଅପେକ୍ଷା',
            enterEntryCodePrompt: 'ଆଗମନ ଯାଞ୍ଚ କରିବା ପାଇଁ ଶ୍ରମିକଙ୍କ ୪-ଅଙ୍କ ବିଶିଷ୍ଟ ପ୍ରବେଶ କୋଡ୍ ପ୍ରବେଶ କରନ୍ତୁ:',
            verifySuccess: 'କାର୍ଯ୍ୟ ଯାଞ୍ଚ ସଫଳ ହେଲା!',
            invalidCode: 'ଅବୈଧ କୋଡ୍। ଦୟାକରି ଶ୍ରମିକଙ୍କୁ ସଠିକ୍ କୋଡ୍ ମାଗନ୍ତୁ।',
            verifyAndComplete: 'ଯାଞ୍ଚ ଏବଂ ସମ୍ପୂର୍ଣ୍ଣ କରନ୍ତୁ',
            acceptAndHire: 'ଗ୍ରହଣ ଏବଂ ନିଯୁକ୍ତି କରନ୍ତୁ',
            hiringSuccess: '{name} ଙ୍କ ନିଯୁକ୍ତି ସଫଳ ହେଲା!',
            rejectedCandidate: 'ପ୍ରତ୍ୟାଖ୍ୟାତ ପ୍ରାର୍ଥୀ',
            noActiveCandidates: 'କୌଣସି ସକ୍ରିୟ ପ୍ରାର୍ଥୀ ନାହାଁନ୍ତି',
            postJobToReceiveAppsDesc: 'ଆବେଦନ ଗ୍ରହଣ କରିବା ଆରମ୍ଭ କରିବାକୁ ଏକ ଚାକିରି ପୋଷ୍ଟ କରନ୍ତୁ।',
            appliedFor: 'ପାଇଁ ଆବେଦନ କରାଯାଇଛି',
            hiredSuccessfully: 'ସଫଳତାର ସହିତ ନିଯୁକ୍ତ!',
            noHistoryYet: 'ଏପର୍ଯ୍ୟନ୍ତ କୌଣସି ଇତିହାସ ନାହିଁ',
            completedHiresDesc: 'ସମ୍ପୂର୍ଣ୍ଣ ନିଯୁକ୍ତିଗୁଡିକ ଏଠାରେ ଏକ ରେକର୍ଡ ଭାବରେ ଦେଖାଯିବ।',
            worker: 'ଶ୍ରମିକ',
            job: 'ଚାକିରି',
            wage: 'ମଜୁରୀ',
            duration: 'ସମୟସୀମା',
            status: 'ସ୍ଥିତି',
            done: 'ସମ୍ପନ୍ନ',
            manage: 'ପରିଚାଳନା କରନ୍ତୁ',
            viewMatchingWorkers: 'ମେଳ ଖାଉଥିବା ଶ୍ରମିକମାନଙ୍କୁ ଦେଖନ୍ତୁ',
            activeCandidatesCount: '{count} ସକ୍ରିୟ',
            filledCount: '{filled}/{total} ପୂରଣ ହୋଇଛି',
            dashboard: 'ଡ୍ୟାଶବୋର୍ଡ',
            welcomeBack: 'ଫେରିବାକୁ ସ୍ୱାଗତ',
            activeJobs: 'ସକ୍ରିୟ ଚାକିରି',
            totalApplicants: 'ସମୁଦାୟ ଆବେଦନକାରୀ',
            hiresMade: 'ନିଯୁକ୍ତି କରାଯାଇଛି',
            recentApplications: 'ନିକଟ ଅତୀତର ଆବେଦନ',
            noApplicationsYet: 'ଏପର୍ଯ୍ୟନ୍ତ କୌଣସି ଆବେଦନ ନାହିଁ',
            handshakeRequired: 'ହ୍ୟାଣ୍ଡସେକ୍ ଆବଶ୍ୟକ',
            workerVerified: 'ଶ୍ରମିକ ଯାଞ୍ଚ ହୋଇଛି!',
            codeMismatch: 'କୋଡ୍ ମେଳ ଖାଉ ନାହିଁ!',
            createJobPosting: 'ଚାକିରି ପୋଷ୍ଟିଂ ସୃଷ୍ଟି କରନ୍ତୁ',
            reachWorkersInstantly: 'ହଜାର ହଜାର ଦକ୍ଷ ଶ୍ରମିକଙ୍କ ପାଖରେ ତୁରନ୍ତ ପହଞ୍ଚନ୍ତୁ।',
            jobDetailsStep: 'ପଦକ୍ଷେପ ୧: ଚାକିରି ବିବରଣୀ',
            provideBasicInfo: 'ଭୂମିକା ବିଷୟରେ ମୌଳିକ ସୂଚନା ପ୍ରଦାନ କରନ୍ତୁ।',
            urgentHiring: 'ଜରୁରୀ ନିଯୁକ୍ତି',
            urgentBadgeDesc: 'ଏହି ଚାକିରିଟି ଜରୁରୀ ଭାବରେ ଚିହ୍ନିତ ହୋଇଛି - ଶ୍ରମିକମାନେ ଏକ ପ୍ରାଥମିକତା ବ୍ୟାଜ୍ ଦେଖିବେ।',
            jobTitle: 'ଚାକିରି ଶିରୋନାମା',
            jobTitlePlaceholder: 'ଉଦାହରଣ: ସିନିୟର ମେସନ୍, ନିର୍ମାଣ ସୁପରଭାଇଜର',
            category: 'ବର୍ଗ',
            jobDescription: 'ଚାକିରି ବିବରଣୀ',
            descriptionPlaceholder: 'ଭୂମିକା, ଦୈନିକ କାର୍ଯ୍ୟ ଏବଂ ଆଶା ବର୍ଣ୍ଣନା କରନ୍ତୁ...',
            requiredSkills: 'ଆବଶ୍ୟକ ଦକ୍ଷତା',
            addSkill: '+ ଦକ୍ଷତା ଯୋଡନ୍ତୁ',
            nextRequirements: 'ପରବର୍ତ୍ତୀ: ଆବଶ୍ୟକତା →',
            requirementsStep: 'ପଦକ୍ଷେପ ୨: ଆବଶ୍ୟକତା',
            setPayPerks: 'ଦେୟ, ଭତ୍ତା ଏବଂ ଅଭିଜ୍ଞତା ସ୍ତର ସେଟ୍ କରନ୍ତୁ।',
            dailyRate: 'ଦୈନିକ ହାର (₹)',
            perks: 'ଭତ୍ତା',
            experienceLevel: 'ଅଭିଜ୍ଞତା ସ୍ତର',
            nextReview: 'ପରବର୍ତ୍ତୀ: ସମୀକ୍ଷା →',
            reviewStep: 'ପଦକ୍ଷେପ ୩: ସମୀକ୍ଷା ଏବଂ ପୋଷ୍ଟ',
            confirmDetails: 'ପ୍ରକାଶ କରିବା ପୂର୍ବରୁ ଆପଣଙ୍କର ଚାକିରି ବିବରଣୀ ନିଶ୍ଚିତ କରନ୍ତୁ।',
            postJob: 'ଚାକିରି ପୋଷ୍ଟ କରନ୍ତୁ',
            postJobSuccess: 'ଚାକିରି ସଫଳତାର ସହିତ ପୋଷ୍ଟ ହୋଇଛି!',
            workersNotified: 'ଶ୍ରମିକମାନଙ୍କୁ ବର୍ତ୍ତମାନ ସୂଚନା ଦିଆଯାଉଛି।',
            viewMyJobs: 'ମୋର ଚାକିରି ଦେଖନ୍ତୁ',
            perks_list: {
                food: '🍱 ମାଗଣା ଖାଦ୍ୟ',
                transport: '🚌 ପରିବହନ',
                safety: '🦺 ସୁରକ୍ଷା ଉପକରଣ',
                accommodation: '🏠 ରହିବା ସୁବିଧା'
            },
            exp_labels: {
                fresher: 'ନୂଆ (Fresher)',
                '1-3': '୧-୩ ବର୍ଷ',
                '3+': '୩ ବର୍ଷରୁ ଅଧିକ'
            },
            categories: {
                construction: 'ନିର୍ମାଣ (Construction)',
                plumbing: 'ପ୍ଲମ୍ବିଂ',
                electrical: 'ଇଲେକ୍ଟ୍ରିକାଲ୍',
                logistics: 'ଲଜିଷ୍ଟିକ୍ସ',
                agriculture: 'କୃଷି',
                manufacturing: 'ଉତ୍ପାଦନ'
            }
        },
        // Sidebar
        sidebar: {
            welcome: 'ସ୍ୱାଗତ',
            myProfile: 'ମୋ ପ୍ରୋଫାଇଲ୍',
            settings: 'ସେଟିଂସ',
            help: 'ସାହାଯ୍ୟ ଏବଂ ସମର୍ଥନ',
            contact: 'ଆମ ସହିତ ଯୋଗାଯୋଗ କରନ୍ତୁ',
            preferences: 'ପସନ୍ଦଗୁଡିକ',
            darkMode: 'ଡାର୍କ ମୋଡ୍',
            logout: 'ଲଗଆଉଟ୍'
        },
        // Help Section
        help: {
            title: 'ସାହାଯ୍ୟ ଏବଂ ସମର୍ଥନ',
            subtitle: 'ଆମେ ସାହାଯ୍ୟ ପାଇଁ ଅଛୁ। ଟିକେଟ୍ ଦାଖଲ କରନ୍ତୁ କିମ୍ବା FAQs ଦେଖନ୍ତୁ।',
            raiseTicket: 'ଟିକେଟ୍ ଦାଖଲ କରନ୍ତୁ',
            myTickets: 'ମୋର ଟିକେଟ୍',
            faqs: 'FAQs',
            subject: 'ବିଷୟ',
            selectSubject: 'ବିଷୟ ବାଛନ୍ତୁ...',
            description: 'ବିବରଣୀ',
            descPlaceholder: 'ଆପଣଙ୍କ ସମସ୍ୟା ବିଷୟରେ ଜଣାନ୍ତୁ...',
            submitTicket: 'ଟିକେଟ୍ ଦାଖଲ କରନ୍ତୁ',
            submitted: 'ଟିକେଟ୍ ଦାଖଲ ହୋଇଛି!',
            respondTime: 'ଆମେ ୨୪ ଘଣ୍ଟା ମଧ୍ୟରେ ଉତ୍ତର ଦେବୁ।',
            submitAnother: 'ଅନ୍ୟ ଏକ ଦାଖଲ କରନ୍ତୁ',
            noTickets: 'ଏପର୍ଯ୍ୟନ୍ତ କୌଣସି ଟିକେଟ୍ ନାହିଁ।',
            subjects: {
                paymentnotreceived: 'ଟଙ୍କା ମିଳିନାହିଁ',
                jobnotshown: 'ଚାକିରି ଦେଖାଯାଉନାହିଁ',
                accountissue: 'ଆକାଉଣ୍ଟ୍ ସମସ୍ୟା',
                aadhaarverification: 'ଆଧାର ଯାଞ୍ଚ',
                appbug: 'ଆପ୍ ରେ ସମସ୍ୟା',
                other: 'ଅନ୍ୟାନ୍ୟ'
            },
            faqs_list: [
                {
                    q: 'ମୁଁ ମୋର ରୋଜଗାର କିପରି ବାହାର କରିବି?',
                    a: 'ରୋଜଗାର ପୃଷ୍ଠାକୁ ଯାଆନ୍ତୁ ଏବଂ ଟଙ୍କା ବାହାର କରିବା ପାଇଁ ଆପଣଙ୍କର ବ୍ୟାଙ୍କ ଆକାଉଣ୍ଟ୍ କିମ୍ବା UPI ID ଲିଙ୍କ୍ କରନ୍ତୁ ।'
                },
                {
                    q: 'କଣ ମୁଁ ଚାକିରି ଆବେଦନ ବାତିଲ କରିପାରିବି?',
                    a: 'ହଁ, ଆପଣ କୌଣସି ପେଣ୍ଡିଂ ଆବେଦନକୁ ଗ୍ରହଣ ହେବା ପୂର୍ବରୁ ବାତିଲ କରିପାରିବେ ।'
                },
                {
                    q: 'ମୁଁ କଣ ମୋର ଦୈନିକ ହାର ବଦଳାଇ ପାରିବି?',
                    a: 'ହଁ, ପ୍ରୋଫାଇଲ୍ → ସମ୍ପାଦନ କରନ୍ତୁ କୁ ଯାଆନ୍ତୁ ଏବଂ ଆପଣଙ୍କର ଦୈନିକ ହାର ଅପଡେଟ୍ କରନ୍ତୁ ।'
                }
            ]
        },
        // Home Section
        home: {
            findJob: 'ଆପଣଙ୍କର ପରବର୍ତ୍ତୀ ଚାକିରି ଖୋଜନ୍ତୁ',
            searchPlaceholder: 'ଚାକିରି, ସ୍ଥାନ ଖୋଜନ୍ତୁ...',
            hotJobs: 'ଲୋକପ୍ରିୟ ଚାକିରି',
            recentJobs: 'ନିକଟ ଅତୀତର ଚାକିରି',
            recommended: 'ସୁପାରିଶ କରାଯାଇଛି',
            viewAll: 'ସବୁ ଦେଖନ୍ତୁ',
            salary: 'ଦରମା',
            posted: 'ପୋଷ୍ଟ ହୋଇଛି',
            applySuccess: 'ସଫଳତାର ସହିତ ଆବେଦନ କରାଗଲା!',
            alreadyApplied: 'ଏହି ଚାକିରି ପାଇଁ ପୂର୍ବରୁ ଆବେଦନ କରାଯାଇଛି',
            loginToApply: 'ଆବେଦନ କରିବା ପାଇଁ ଦୟାକରି ଲଗଇନ୍ କରନ୍ତୁ',
            defaultBio: 'ମୁଁ ଏହି ଚାକିରିରେ ଆଗ୍ରହୀ ଏବଂ ମୋର ଦକ୍ଷତା ଉପରେ ମୋର ବିଶ୍ୱาସ ଅଛି ।',
            newApplicationTitle: 'ନୂଆ ଆବେଦନ!',
            newApplicationBody: 'ଆପଣଙ୍କ ଚାକିରି ପାଇଁ ଆବେଦନ କରିଛନ୍ତି',
            availableJobs: 'ଉପଲବ୍ଧ ଚାକିରି',
            noJobs: 'କୌଣସି ଚାକିରି ଉପଲବ୍ଧ ନାହିଁ',
            noCategoryJobs: 'କୌଣସି',
            tryDifferentCategory: 'ଅନ୍ୟ ଏକ ବିଭାଗ ଚେଷ୍ଟା କରନ୍ତୁ।',
            noJobsSub: 'ଏପର୍ଯ୍ୟନ୍ତ କୌଣସି ଚାକିରି ପୋଷ୍ଟ ହୋଇନାହିଁ। ଶୀଘ୍ର ଦେଖନ୍ତୁ!',
            viewAllCategories: 'ସମସ୍ତ ବିଭାଗ ଦେଖନ୍ତୁ'
        },
        // Applications Section
        applications: {
            title: 'ମୋର ଆବେଦନ',
            total: 'ସମୁଦାୟ',
            topMatch: 'ସର୍ବୋତ୍ତମ ମେଳ',
            arrivalCode: 'ଆଗମନ ପ୍ରବେଶ କୋଡ୍ (OTP)',
            arrivalCodeSub: 'ସାଇଟରେ ପହଞ୍ଚିବା ପରେ ଏହାକୁ ନିଯୁକ୍ତିଦାତାଙ୍କ ସହ ସେୟାର କରନ୍ତୁ।',
            noApplications: 'କିଛି ନାହିଁ',
            emptyPendingSub: 'ଚାକିରି ପାଇଁ ଆବେଦନ କରନ୍ତୁ ଯାହାଫଳରେ ଆପଣ ଏଠାରେ ଦେଖିପାରିବେ ।',
            noInStatus: 'ରେ କୌଣସି ଚାକିରି ନାହିଁ',
            statusYet: 'ସ୍ଥିତି ଏପର୍ଯ୍ୟନ୍ତ।'
        },
        // Teams Section
        teams: {
            title: 'ଟିମ୍',
            members: 'ସେଦସ୍ୟ',
            rating: 'ରେଟିଂ',
            jobsDone: 'କାମ ସମ୍ପନ୍ନ',
            discoverSquads: 'ଟିମ୍ ଖୋଜନ୍ତୁ',
            noTeamsYet: 'ଏପର୍ଯ୍ୟନ୍ତ କୌଣସି ଟିମ୍ ନାହିଁ',
            beFirstSquad: 'ଶ୍ରମିକମାନେ ଟିମ୍ ଗଠନ କଲେ ଏଠାରେ ଦେଖାଯିବ। ପ୍ରଥମେ ଟିମ୍ ଗଠନ କରନ୍ତୁ!',
            join: 'ଶାମିଲ ହୁଅନ୍ତୁ',
            leave: 'ଛାଡ଼ନ୍ତୁ',
            loginFirst: 'ଦୟାକରି ପ୍ରଥମେ ଲଗଇନ୍ କରନ୍ତୁ',
            leftTeam: 'ଟିମ୍ ଛାଡ଼ିଲେ',
            joinedTeam: 'ଟିମ୍‌ରେ ସାମିଲ ହେଲେ!',
            failedToJoin: 'ସାମିଲ ହେବାରେ ବିଫଳ'
        },
        // Chat Section
        chat: {
            title: 'ମେସେଜ୍‌',
            searchPlaceholder: 'ଖୋଜନ୍ତୁ...',
            online: 'ଅନଲାଇନ୍',
            offline: 'ଅଫଲାଇନ୍',
            today: 'ଆଜି',
            messagePlaceholder: 'ଟାଇପ୍ କରନ୍ତୁ...',
            selectConvo: 'ଏକ ବାର୍ତ୍ତାଳାପ ବାଛନ୍ତୁ',
            assistant_welcome: 'ନମସ୍କାର! ମୁଁ ShramSetu AI। ମୁଁ ଆପଣଙ୍କୁ କିପରି ସାହାଯ୍ୟ କରିପାରିବି? 😊'
        }
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/Shramsetu-Dillu-shramsetu/src/lib/i18n/TranslationProvider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TranslationProvider",
    ()=>TranslationProvider,
    "useTranslation",
    ()=>useTranslation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$src$2f$store$2f$useUserStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/src/store/useUserStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$src$2f$lib$2f$i18n$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/src/lib/i18n/translations.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
const TranslationContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const TranslationProvider = ({ children })=>{
    _s();
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [language, setLanguage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('en');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TranslationProvider.useEffect": ()=>{
            setMounted(true);
            // Safe to access store after mount — prefer generalProfile.language, fall back to preferredLanguage
            const storeState = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$src$2f$store$2f$useUserStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUserStore"].getState();
            const lang = storeState.generalProfile?.language || storeState.preferredLanguage || 'en';
            setLanguage(lang);
            // Subscribe to store changes
            const unsubscribe = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$src$2f$store$2f$useUserStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUserStore"].subscribe({
                "TranslationProvider.useEffect.unsubscribe": (state)=>{
                    const l = state.generalProfile?.language || state.preferredLanguage || 'en';
                    setLanguage(l);
                }
            }["TranslationProvider.useEffect.unsubscribe"]);
            return unsubscribe;
        }
    }["TranslationProvider.useEffect"], []);
    const t = (key, params)=>{
        if (!mounted) return key; // Return key during SSR
        const keys = key.split('.');
        let value = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$src$2f$lib$2f$i18n$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["translations"][language] || __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$src$2f$lib$2f$i18n$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["translations"].en;
        for (const k of keys){
            value = value?.[k];
            if (value === undefined) break;
        }
        // Fallback to English
        if (value === undefined) {
            value = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$src$2f$lib$2f$i18n$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["translations"].en;
            for (const k of keys){
                value = value?.[k];
                if (value === undefined) break;
            }
        }
        let res = value || key;
        if (params && typeof res === 'string') {
            Object.entries(params).forEach(([k, v])=>{
                // Use a global regex to replace all occurrences of {key}
                const regex = new RegExp(`{${k}}`, 'g');
                res = res.replace(regex, String(v));
            });
        }
        return res;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TranslationContext.Provider, {
        value: {
            t,
            language
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/lib/i18n/TranslationProvider.tsx",
        lineNumber: 68,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_s(TranslationProvider, "TZtImHT7z/D6yl1PRRDkeMdPyVw=");
_c = TranslationProvider;
const useTranslation = ()=>{
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(TranslationContext);
    if (!context) {
        throw new Error('useTranslation must be used within TranslationProvider');
    }
    return context;
};
_s1(useTranslation, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "TranslationProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/Shramsetu-Dillu-shramsetu/src/components/ErrorBoundary.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ErrorBoundary",
    ()=>ErrorBoundary
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
"use client";
;
;
class ErrorBoundary extends __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Component"] {
    constructor(props){
        super(props);
        this.state = {
            hasError: false,
            error: null
        };
    }
    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            error
        };
    }
    componentDidCatch(error, errorInfo) {
        console.error("[ErrorBoundary] Uncaught error:", error, errorInfo);
    }
    render() {
        if (this.state.hasError) {
            if (this.props.fallback) return this.props.fallback;
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "min-h-screen flex items-center justify-center bg-slate-50 p-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-md w-full bg-white rounded-2xl shadow-lg border border-slate-100 p-8 text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-8 h-8 text-red-500",
                                fill: "none",
                                viewBox: "0 0 24 24",
                                stroke: "currentColor",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/components/ErrorBoundary.tsx",
                                    lineNumber: 38,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/components/ErrorBoundary.tsx",
                                lineNumber: 37,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/components/ErrorBoundary.tsx",
                            lineNumber: 36,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "font-outfit text-xl font-bold text-slate-900 mb-2",
                            children: "Something went wrong"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/components/ErrorBoundary.tsx",
                            lineNumber: 41,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-slate-500 mb-6",
                            children: "An unexpected error occurred. Please try refreshing the page."
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/components/ErrorBoundary.tsx",
                            lineNumber: 42,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>{
                                this.setState({
                                    hasError: false,
                                    error: null
                                });
                                window.location.reload();
                            },
                            className: "w-full h-12 rounded-xl font-semibold text-white transition-all active:scale-95",
                            style: {
                                background: "#e85d26"
                            },
                            children: "Refresh Page"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/components/ErrorBoundary.tsx",
                            lineNumber: 45,
                            columnNumber: 13
                        }, this),
                        ("TURBOPACK compile-time value", "development") === "development" && this.state.error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("details", {
                            className: "mt-4 text-left",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("summary", {
                                    className: "text-xs text-slate-400 cursor-pointer",
                                    children: "Error Details"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/components/ErrorBoundary.tsx",
                                    lineNumber: 57,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                    className: "mt-2 p-3 bg-slate-50 rounded-lg text-xs text-red-600 overflow-auto max-h-40",
                                    children: [
                                        this.state.error.message,
                                        "\n",
                                        this.state.error.stack
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/components/ErrorBoundary.tsx",
                                    lineNumber: 58,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/components/ErrorBoundary.tsx",
                            lineNumber: 56,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/components/ErrorBoundary.tsx",
                    lineNumber: 35,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/components/ErrorBoundary.tsx",
                lineNumber: 34,
                columnNumber: 9
            }, this);
        }
        return this.props.children;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/Shramsetu-Dillu-shramsetu/src/components/ToastProvider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ToastProvider",
    ()=>ToastProvider,
    "useToast",
    ()=>useToast
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-client] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/node_modules/lucide-react/dist/esm/icons/info.js [app-client] (ecmascript) <export default as Info>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
"use client";
;
;
;
const ToastContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
function useToast() {
    _s();
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(ToastContext);
    if (!ctx) throw new Error("useToast must be used within ToastProvider");
    return ctx;
}
_s(useToast, "/dMy7t63NXD4eYACoT93CePwGrg=");
const ICONS = {
    success: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"],
    error: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"],
    info: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"]
};
const COLORS = {
    success: {
        bg: "bg-green-50",
        border: "border-green-200",
        icon: "text-green-500",
        title: "text-green-900"
    },
    error: {
        bg: "bg-red-50",
        border: "border-red-200",
        icon: "text-red-500",
        title: "text-red-900"
    },
    info: {
        bg: "bg-blue-50",
        border: "border-blue-200",
        icon: "text-blue-500",
        title: "text-blue-900"
    }
};
function ToastItem({ toast, onRemove }) {
    _s1();
    const Icon = ICONS[toast.type];
    const colors = COLORS[toast.type];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ToastItem.useEffect": ()=>{
            const timer = setTimeout({
                "ToastItem.useEffect.timer": ()=>onRemove(toast.id)
            }["ToastItem.useEffect.timer"], toast.duration || 4000);
            return ({
                "ToastItem.useEffect": ()=>clearTimeout(timer)
            })["ToastItem.useEffect"];
        }
    }["ToastItem.useEffect"], [
        toast.id,
        toast.duration,
        onRemove
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0,
            y: -20,
            scale: 0.95
        },
        animate: {
            opacity: 1,
            y: 0,
            scale: 1
        },
        exit: {
            opacity: 0,
            y: -20,
            scale: 0.95
        },
        className: `flex items-start gap-3 p-4 rounded-xl border shadow-lg ${colors.bg} ${colors.border} max-w-sm w-full`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                className: `w-5 h-5 shrink-0 mt-0.5 ${colors.icon}`
            }, void 0, false, {
                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/components/ToastProvider.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 min-w-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: `text-sm font-semibold ${colors.title}`,
                        children: toast.title
                    }, void 0, false, {
                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/components/ToastProvider.tsx",
                        lineNumber: 62,
                        columnNumber: 9
                    }, this),
                    toast.message && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-slate-500 mt-0.5",
                        children: toast.message
                    }, void 0, false, {
                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/components/ToastProvider.tsx",
                        lineNumber: 63,
                        columnNumber: 27
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/components/ToastProvider.tsx",
                lineNumber: 61,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>onRemove(toast.id),
                className: "shrink-0 text-slate-400 hover:text-slate-600",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                    className: "w-4 h-4"
                }, void 0, false, {
                    fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/components/ToastProvider.tsx",
                    lineNumber: 66,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/components/ToastProvider.tsx",
                lineNumber: 65,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/components/ToastProvider.tsx",
        lineNumber: 54,
        columnNumber: 5
    }, this);
}
_s1(ToastItem, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = ToastItem;
function ToastProvider({ children }) {
    _s2();
    const [toasts, setToasts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const removeToast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ToastProvider.useCallback[removeToast]": (id)=>{
            setToasts({
                "ToastProvider.useCallback[removeToast]": (prev)=>prev.filter({
                        "ToastProvider.useCallback[removeToast]": (t)=>t.id !== id
                    }["ToastProvider.useCallback[removeToast]"])
            }["ToastProvider.useCallback[removeToast]"]);
        }
    }["ToastProvider.useCallback[removeToast]"], []);
    const showToast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ToastProvider.useCallback[showToast]": (toast)=>{
            const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`;
            setToasts({
                "ToastProvider.useCallback[showToast]": (prev)=>[
                        ...prev.slice(-4),
                        {
                            ...toast,
                            id
                        }
                    ]
            }["ToastProvider.useCallback[showToast]"]); // max 5 toasts
        }
    }["ToastProvider.useCallback[showToast]"], []);
    const success = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ToastProvider.useCallback[success]": (title, message)=>showToast({
                type: "success",
                title,
                message
            })
    }["ToastProvider.useCallback[success]"], [
        showToast
    ]);
    const error = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ToastProvider.useCallback[error]": (title, message)=>showToast({
                type: "error",
                title,
                message
            })
    }["ToastProvider.useCallback[error]"], [
        showToast
    ]);
    const info = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ToastProvider.useCallback[info]": (title, message)=>showToast({
                type: "info",
                title,
                message
            })
    }["ToastProvider.useCallback[info]"], [
        showToast
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ToastContext.Provider, {
        value: {
            showToast,
            success,
            error,
            info
        },
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed top-4 right-4 z-[9999] flex flex-col gap-2 items-end pointer-events-none",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                    children: toasts.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "pointer-events-auto",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ToastItem, {
                                toast: t,
                                onRemove: removeToast
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/components/ToastProvider.tsx",
                                lineNumber: 95,
                                columnNumber: 15
                            }, this)
                        }, t.id, false, {
                            fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/components/ToastProvider.tsx",
                            lineNumber: 94,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/components/ToastProvider.tsx",
                    lineNumber: 92,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/components/ToastProvider.tsx",
                lineNumber: 91,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/components/ToastProvider.tsx",
        lineNumber: 89,
        columnNumber: 5
    }, this);
}
_s2(ToastProvider, "U2EzgOymaExbrsCT1q9DxC3b9Cs=");
_c1 = ToastProvider;
var _c, _c1;
__turbopack_context__.k.register(_c, "ToastItem");
__turbopack_context__.k.register(_c1, "ToastProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Downloads_Shramsetu-Dillu-shramsetu_src_559bf009._.js.map