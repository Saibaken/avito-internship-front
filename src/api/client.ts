type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";

interface ErrorResponse {
    error: string;
    message: string;
}

export class APIError extends Error {
    error: string;
    message: string;

    constructor(error: string, message: string) {
        super(message);
        this.error = error;
        this.message = message;
    }
}

/** Клиент для работы с бэкендом */
export class APIClient {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl.endsWith("/") ? baseUrl.slice(-1) : baseUrl;
    }

    private async request<T>(
        endpoint: string,
        method: HTTPMethod,
        options: RequestInit = {}
    ): Promise<T> {
        const config: RequestInit = {
            ...options,
            method,
            headers: {
                "Allow-Origin": "*",
                "Content-Type": "application/json",
                Accept: "application/json",
                ...(options.headers || {}),
            },
        };

        if (options.body) {
            config.body = JSON.stringify(options.body);
        }

        const res = await fetch(`${this.baseUrl}${endpoint}`, config);

        if (!res.ok) {
            const error = (await res.json()) as ErrorResponse;
            throw new APIError(error.error, error.message);
        }

        return res.json() as Promise<T>;
    }

    public get<T>(endpoint: string, options?: Omit<RequestInit, "body">) {
        return this.request<T>(endpoint, "GET", options);
    }

    public post<T>(
        endpoint: string,
        body: BodyInit,
        options?: Omit<RequestInit, "body">
    ) {
        return this.request<T>(endpoint, "POST", { body, ...options });
    }

    public put<T>(
        endpoint: string,
        body: BodyInit,
        options?: Omit<RequestInit, "body">
    ) {
        return this.request<T>(endpoint, "PUT", { body, ...options });
    }

    public delete<T>(endpoint: string, options?: Omit<RequestInit, "body">) {
        return this.request<T>(endpoint, "DELETE", options);
    }
}

export const apiClient = new APIClient(import.meta.env.VITE_BACKEND_URL || "/");
