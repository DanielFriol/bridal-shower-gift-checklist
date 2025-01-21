import { Request, Response } from 'express';
import { HttpRequest, HttpResponse } from './http';

export function parseHttpRequest(req: Request): HttpRequest {
    return {
        path: req.path,
        method: req.method,
        headers: req.headers as Record<string, string | undefined>,
        queryStringParameters: req.query as Record<string, string | undefined> | null,
        body: req.body || null,
        pathParameters: req.params as Record<string, string | undefined> | null,
    };
}

export function parseHttpResponse(res: Response, httpResponse: HttpResponse): void {
    res.status(httpResponse.statusCode);

    if (httpResponse.headers) {
        for (const [key, value] of Object.entries(httpResponse.headers)) {
            if (value !== undefined) {
                res.setHeader(key, value);
            }
        }
    }

    if (httpResponse.isBase64Encoded) {
        res.send(Buffer.from(httpResponse.body, 'base64'));
    } else {
        res.send(httpResponse.body);
    }
}
