import { NextResponse } from "next/server";

type ApiResponseOptions<T> = {
  data?: T;
  message?: string;
  error?: string;
  status?: number;
};

/**
 * Standardized API response helper
 * All API routes should use this for consistent response format:
 * { success: true/false, data: {}, message: "", error: "" }
 */
export function apiResponse<T = unknown>({
  data,
  message = "",
  error,
  status = 200,
}: ApiResponseOptions<T>) {
  const success = !error && status >= 200 && status < 400;

  return NextResponse.json(
    {
      success,
      data: data ?? null,
      message,
      error: error ?? null,
    },
    { status }
  );
}

/** Shortcut for success response */
export function apiSuccess<T>(data: T, message = "Success") {
  return apiResponse({ data, message, status: 200 });
}

/** Shortcut for error response */
export function apiError(error: string, status = 500) {
  return apiResponse({ error, status });
}

/** Shortcut for 401 */
export function apiUnauthorized(message = "Unauthorized") {
  return apiResponse({ error: message, status: 401 });
}

/** Shortcut for 400 */
export function apiBadRequest(message = "Bad request") {
  return apiResponse({ error: message, status: 400 });
}

/** Shortcut for 404 */
export function apiNotFound(message = "Not found") {
  return apiResponse({ error: message, status: 404 });
}
