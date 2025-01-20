/* eslint-disable @typescript-eslint/no-explicit-any */
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export interface HttpRequest {
    path: string;
    method: string;
    headers: Record<string, string | undefined>;
    queryStringParameters: Record<string, string | undefined> | null;
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

/**
 * Parses an APIGatewayProxyEvent into a simpler HTTP request object.
 *
 * @param event The APIGatewayProxyEvent received from API Gateway.
 * @returns A SimpleHttpRequest object representing the parsed event.
 */
export const parseApiGatewayEvent = (event: APIGatewayProxyEvent): HttpRequest => {
    const { path, httpMethod, headers, queryStringParameters, body, isBase64Encoded } = event;

    let parsedBody: any | null = null;

    if (body) {
        try {
            parsedBody = isBase64Encoded ? JSON.parse(Buffer.from(body, 'base64').toString('utf-8')) : JSON.parse(body);
        } catch (error) {
            // If parsing fails, assume it's a string or other non-JSON content
            parsedBody = isBase64Encoded ? Buffer.from(body, 'base64').toString('utf-8') : body;
        }
    }

    const simpleRequest: HttpRequest = {
        path: path,
        method: httpMethod,
        headers: headers || {},
        queryStringParameters: queryStringParameters || null,
        body: parsedBody,
    };

    return simpleRequest;
};

/**
 * Creates an APIGatewayProxyResult object from a simple HTTP response.
 *
 * @param response The simple HTTP response object.
 * @returns An APIGatewayProxyResult object.
 */
export const createApiGatewayResponse = (response: HttpResponse): APIGatewayProxyResult => {
    const { statusCode, headers, body, isBase64Encoded } = response;

    let stringifiedBody: string | undefined;
    let encoded: boolean = isBase64Encoded || false; // Default to false if not provided

    if (body !== undefined) {
        if (typeof body === 'string') {
            stringifiedBody = body;
        } else if (Buffer.isBuffer(body)) {
            stringifiedBody = body.toString('base64');
            encoded = true;
        } else {
            try {
                stringifiedBody = JSON.stringify(body);
            } catch (error) {
                console.error('Error stringifying response body:', error);
                stringifiedBody = String(body); // Fallback to string representation
            }
        }
    }

    const apiGatewayResponse: APIGatewayProxyResult = {
        statusCode: statusCode,
        body: stringifiedBody || '', // Ensure body is a string
        headers: headers,
        isBase64Encoded: encoded,
    };

    return apiGatewayResponse;
};
