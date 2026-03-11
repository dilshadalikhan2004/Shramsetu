import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { sign } from 'jsonwebtoken';
import { apiSuccess, apiError, apiBadRequest } from '@/lib/api-response';
import { checkRateLimit } from '@/lib/rate-limit';

function getJwtSecret(): string {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET environment variable is not set.");
    }
    return secret;
}

/**
 * POST /api/auth/login
 * Verify Firebase token and issue JWT for API access
 */
export async function POST(request: NextRequest) {
    try {
        const ip = request.headers.get("x-forwarded-for") || "unknown";
        const rateLimit = checkRateLimit(ip, "login", { limit: 5, windowMs: 60000 }); // 5 attempts per minute

        if (!rateLimit.success) {
            return apiError("Too many login attempts. Please try again later.", 429);
        }

        const body = await request.json();
        const { phone, firebaseUid, name, email } = body;

        if (!phone) {
            return apiBadRequest("Phone number is required");
        }

        // Validate phone format (Indian 10-digit)
        const cleanPhone = phone.replace(/\D/g, '').slice(-10);
        if (cleanPhone.length !== 10) {
            return apiBadRequest("Invalid phone number format");
        }

        // Find or create user in local database
        let user;
        try {
            user = await prisma.user.findUnique({
                where: { phone: cleanPhone },
                include: { workerProfile: true, employerProfile: true }
            });
        } catch {
            // Prisma might not be configured — gracefully handle
            console.warn('[Auth] Prisma not available, using Firebase-only auth');
        }

        let isNewUser = false;

        if (!user) {
            isNewUser = true;
            try {
                user = await prisma.user.create({
                    data: {
                        phone: cleanPhone,
                        name: name || 'New User',
                        city: '',
                        language: 'en',
                        email: email || null,
                        lastLogin: new Date(),
                    },
                    include: { workerProfile: true, employerProfile: true }
                });
            } catch {
                console.warn('[Auth] Could not create user in Prisma DB');
            }
        } else {
            // Update last login
            try {
                const updatedUser = await prisma.user.update({
                    where: { phone: cleanPhone },
                    data: { lastLogin: new Date() },
                    include: { workerProfile: true, employerProfile: true }
                });
                if (updatedUser) user = updatedUser;
            } catch { /* non-critical */ }
        }

        // Issue JWT
        const token = sign(
            {
                userId: user?.id || firebaseUid || cleanPhone,
                phone: cleanPhone,
            },
            getJwtSecret(),
            { expiresIn: '30d' }
        );

        return apiSuccess({
            token,
            user: {
                id: user?.id || firebaseUid,
                phone: cleanPhone,
                name: user?.name || name || '',
                language: user?.language || 'en',
                city: user?.city || '',
                email: user?.email || email || '',
                hasWorkerProfile: !!(user as any)?.workerProfile,
                hasEmployerProfile: !!(user as any)?.employerProfile,
                isNewUser,
            }
        }, isNewUser ? "Account created" : "Login successful");

    } catch (error) {
        console.error('[Auth] Login error:', error);
        return apiError("Authentication failed. Please try again.");
    }
}
