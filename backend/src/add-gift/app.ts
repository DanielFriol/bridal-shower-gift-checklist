import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { createAddGiftController } from './add-gift.factory';
import { createApiGatewayResponse, parseApiGatewayEvent } from '../shared/api-gateway-event-parser';

const controller = createAddGiftController();

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const httpRequest = parseApiGatewayEvent(event);
    const httpResponse = await controller.handle(httpRequest);
    return createApiGatewayResponse(httpResponse);
};
