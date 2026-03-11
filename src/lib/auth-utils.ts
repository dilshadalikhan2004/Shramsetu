import { NextRequest } from 'next/server';
import { verify } from 'jsonwebtoken';

function getJwtSecret(): string {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET environment variable is not set. Add it to .env.local.");
    }
    return secret;
}

export interface JWTPayload {
    userId: string;
    phone: string;
}

/**
 * Verify JWT token from request headers
 */
export async function verifyToken(request: NextRequest): Promise<JWTPayload | null> {
    try {
        const authHeader = request.headers.get('authorization');

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return null;
        }

        const token = authHeader.substring(7); // Remove 'Bearer ' prefix

        const decoded = verify(token, getJwtSecret()) as unknown as JWTPayload;
        return decoded;
    } catch (error) {
        console.error('Token verification error:', error);
        return null;
    }
}

/**
 * Middleware to require authentication
 */
export async function requireAuth(request: NextRequest) {
    const user = await verifyToken(request);

    if (!user) {
        throw new Error('Unauthorized');
    }

    return user;
}
