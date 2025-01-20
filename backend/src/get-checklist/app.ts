/* eslint-disable @typescript-eslint/no-unused-vars */
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { createApiGatewayResponse } from '../shared/api-gateway-event-parser';
import { makeGetChecklistController } from './get-checklist.factory';

const controller = makeGetChecklistController();

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const httpResponse = await controller.handle();
    return createApiGatewayResponse(httpResponse);
};
