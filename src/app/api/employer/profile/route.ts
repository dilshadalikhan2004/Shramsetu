import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyToken } from '@/lib/auth-utils';
import { safeJsonParse } from '@/lib/utils/json';
import { apiSuccess, apiError, apiUnauthorized, apiNotFound } from '@/lib/api-response';

/**
 * GET /api/employer/profile
 * Get employer profile
 */
export async function GET(request: NextRequest) {
    try {
        const user = await verifyToken(request);
        if (!user) {
            return apiUnauthorized();
        }

        const employerProfile = await prisma.employerProfile.findUnique({
            where: { userId: user.userId },
        });

        if (!employerProfile) {
            return apiNotFound('Employer profile not found');
        }

        return apiSuccess({
            ...employerProfile,
            categories: safeJsonParse(employerProfile.categories, []),
        });
    } catch (error) {
        console.error('Get employer profile error:', error);
        return apiError('Failed to fetch profile');
    }
}

/**
 * PUT /api/employer/profile
 * Update employer profile
 */
export async function PUT(request: NextRequest) {
    try {
        const user = await verifyToken(request);
        if (!user) {
            return apiUnauthorized();
        }

        const {
            companyName,
            categories,
            gstNumber,
        } = await request.json();

        // Upsert employer profile
        const employerProfile = await prisma.employerProfile.upsert({
            where: { userId: user.userId },
            update: {
                ...(companyName && { companyName }),
                ...(categories && { categories: JSON.stringify(categories) }),
                ...(gstNumber && { gstNumber }),
            },
            create: {
                userId: user.userId,
                companyName,
                categories: JSON.stringify(categories || []),
                gstNumber,
            },
        });

        return apiSuccess({
            profile: {
                ...employerProfile,
                categories: safeJsonParse(employerProfile.categories, []),
            },
        }, 'Profile updated');
    } catch (error) {
        console.error('Update employer profile error:', error);
        return apiError('Failed to update profile');
    }
}

/**
 * POST /api/employer/profile
 * Create employer profile
 */
export async function POST(request: NextRequest) {
    return PUT(request); // Use upsert logic
}
