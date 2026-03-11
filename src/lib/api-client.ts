/**
 * API Client for making standardized requests to ShramSetu backend endpoints.
 * Handles JSON parsing, error throwing, and standard response formats.
 */

type RequestOptions = Omit<RequestInit, 'body'> & {
    body?: any;
    requireAuth?: boolean;
};

export class ApiError extends Error {
    public status: number;
    public data: any;
    
    constructor(message: string, status: number, data?: any) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.data = data;
    }
}

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { body, headers, requireAuth = true, ...customConfig } = options;

    const config: RequestInit = {
        method: body ? 'POST' : 'GET',
        ...customConfig,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`/api${endpoint}`, config);
        
        // Parse the standard apiResponse format
        const data = await response.json().catch(() => ({}));
        
        if (!response.ok || data.success === false) {
            const errorMessage = data.error || data.message || response.statusText;
            throw new ApiError(errorMessage, response.status, data.data);
        }

        return data.data as T;
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError(error instanceof Error ? error.message : 'Network error', 0);
    }
}

export const apiClient = {
    get: <T>(endpoint: string, options?: Omit<RequestOptions, 'body'>) => 
        request<T>(endpoint, { ...options, method: 'GET' }),
        
    post: <T>(endpoint: string, body: any, options?: RequestOptions) => 
        request<T>(endpoint, { ...options, body, method: 'POST' }),
        
    put: <T>(endpoint: string, body: any, options?: RequestOptions) => 
        request<T>(endpoint, { ...options, body, method: 'PUT' }),
        
    delete: <T>(endpoint: string, options?: RequestOptions) => 
        request<T>(endpoint, { ...options, method: 'DELETE' }),
};
