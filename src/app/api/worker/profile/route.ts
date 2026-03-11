import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyToken } from '@/lib/auth-utils';
import { safeJsonParse } from '@/lib/utils/json';
import { apiSuccess, apiError, apiUnauthorized, apiNotFound } from '@/lib/api-response';

/**
 * GET /api/worker/profile
 * Get worker profile
 */
export async function GET(request: NextRequest) {
    try {
        const user = await verifyToken(request);
        if (!user) {
            return apiUnauthorized();
        }

        const workerProfile = await prisma.workerProfile.findUnique({
            where: { userId: user.userId },
        });

        if (!workerProfile) {
            return apiNotFound('Worker profile not found');
        }

        return apiSuccess({
            ...workerProfile,
            skills: safeJsonParse(workerProfile.skills, []),
            portfolioImages: safeJsonParse(workerProfile.portfolioImages, []),
            certifications: safeJsonParse(workerProfile.certifications, []),
        });
    } catch (error) {
        console.error('Get worker profile error:', error);
        return apiError('Failed to fetch profile');
    }
}

/**
 * PUT /api/worker/profile
 * Update worker profile
 */
export async function PUT(request: NextRequest) {
    try {
        const user = await verifyToken(request);
        if (!user) {
            return apiUnauthorized();
        }

        const {
            skills,
            experienceYears,
            dailyRate,
            serviceRadiusKm,
            portfolioImages,
            availability,
            bio,
            certifications,
        } = await request.json();

        // Upsert worker profile
        const workerProfile = await prisma.workerProfile.upsert({
            where: { userId: user.userId },
            update: {
                ...(skills && { skills: JSON.stringify(skills) }),
                ...(experienceYears !== undefined && { experienceYears }),
                ...(dailyRate !== undefined && { dailyRate }),
                ...(serviceRadiusKm !== undefined && { serviceRadiusKm }),
                ...(portfolioImages && { portfolioImages: JSON.stringify(portfolioImages) }),
                ...(availability !== undefined && { availability }),
                ...(bio && { bio }),
                ...(certifications && { certifications: JSON.stringify(certifications) }),
            },
            create: {
                userId: user.userId,
                skills: JSON.stringify(skills || []),
                experienceYears: experienceYears || 0,
                dailyRate: dailyRate || 500,
                serviceRadiusKm: serviceRadiusKm || 5,
                portfolioImages: JSON.stringify(portfolioImages || []),
                availability: availability !== undefined ? availability : true,
                bio,
                certifications: JSON.stringify(certifications || []),
            },
        });

        return apiSuccess({
            profile: {
                ...workerProfile,
                skills: safeJsonParse(workerProfile.skills, []),
                portfolioImages: safeJsonParse(workerProfile.portfolioImages, []),
                certifications: safeJsonParse(workerProfile.certifications, []),
            },
        }, 'Profile updated');
    } catch (error) {
        console.error('Update worker profile error:', error);
        return apiError('Failed to update profile');
    }
}

/**
 * POST /api/worker/profile
 * Create worker profile
 */
export async function POST(request: NextRequest) {
    return PUT(request); // Use upsert logic
}
