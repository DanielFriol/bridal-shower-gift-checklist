/* eslint-disable @typescript-eslint/no-explicit-any */
export interface HttpRequest {
    path: string;
    method: string;
    headers: Record<string, string | undefined>;
    queryStringParameters: Record<string, string | undefined> | null;
    pathParameters: Record<string, string | undefined> | null;
    body: any | null; // Could be a string, object, or null
}

export interface HttpResponse {
    statusCode: number;
    headers?: Record<string, string>;
    body?: any; // Can be a string, object, or other data
    isBase64Encoded?: boolean;
}

export class ResponseHelper {
    static ok(body?: any, headers?: Record<string, string>): HttpResponse {
        return { statusCode: 200, body, headers };
    }

    static created(body?: any, headers?: Record<string, string>): HttpResponse {
        return { statusCode: 201, body, headers };
    }

    static badRequest(body?: any, headers?: Record<string, string>): HttpResponse {
        return { statusCode: 400, body, headers };
    }

    static unauthorized(body?: any, headers?: Record<string, string>): HttpResponse {
        return { statusCode: 401, body, headers };
    }

    static forbidden(body?: any, headers?: Record<string, string>): HttpResponse {
        return { statusCode: 403, body, headers };
    }

    static notFound(body?: any, headers?: Record<string, string>): HttpResponse {
        return { statusCode: 404, body, headers };
    }

    static internalServerError(body?: any, headers?: Record<string, string>): HttpResponse {
        return { statusCode: 500, body, headers };
    }

    static custom(
        statusCode: number,
        body?: any,
        headers?: Record<string, string>,
        isBase64Encoded?: boolean,
    ): HttpResponse {
        return { statusCode, body, headers, isBase64Encoded };
    }
}
