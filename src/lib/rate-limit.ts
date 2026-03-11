// Simple in-memory rate limiter for serverless environments.
// Note: In a real distributed production environment, use Redis for rate limiting.

const rateLimits = new Map<string, { count: number; windowStart: number }>();

export interface RateLimitOptions {
  limit: number;     // max number of requests
  windowMs: number;  // time window in milliseconds
}

export function checkRateLimit(ip: string, action: string, options: RateLimitOptions) {
  const key = `${ip}:${action}`;
  const now = Date.now();
  
  const record = rateLimits.get(key);

  // If no record or window expired, create a new one
  if (!record || now - record.windowStart > options.windowMs) {
    rateLimits.set(key, { count: 1, windowStart: now });
    return { success: true, remaining: options.limit - 1 };
  }

  // If within window, check count
  if (record.count >= options.limit) {
    return { success: false, remaining: 0 };
  }

  // Increment count
  record.count += 1;
  return { success: true, remaining: options.limit - record.count };
}

// Cleanup memory periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimits.entries()) {
    if (now - value.windowStart > 60000) { // 1 min max window typically, or clear old
        rateLimits.delete(key);
    }
  }
}, 60000 * 5); // run every 5 minutes
