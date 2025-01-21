import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { createApiGatewayResponse, parseApiGatewayEvent } from '../shared/api-gateway-event-parser';
import { makePatchChecklistController } from './patch-checklist.factory';

const controller = makePatchChecklistController();

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const httpRequest = parseApiGatewayEvent(event);
    const httpResponse = await controller.handle(httpRequest);
    return createApiGatewayResponse(httpResponse);
};
