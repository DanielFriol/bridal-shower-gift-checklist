/* eslint-disable @typescript-eslint/no-explicit-any */
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { HttpRequest, HttpResponse } from './http';

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
