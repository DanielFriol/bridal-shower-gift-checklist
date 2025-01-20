import { HttpRequest, HttpResponse, ResponseHelper } from '../shared/api-gateway-event-parser';
import { PatchChecklistUsecase } from './patch-checklist.usecase';
import { z } from 'zod';

export class PatchChecklistController {
    constructor(private usecase: PatchChecklistUsecase) {}

    async handle(request: HttpRequest): Promise<HttpResponse> {
        try {
            const { body } = request;
            const giftIdFromQuery = request.queryStringParameters?.giftId;

            const { giftId, person } = validation.parse({ giftId: body.giftId, person: giftIdFromQuery });

            const response = await this.usecase.handle(giftId, person);
            return ResponseHelper.ok(response);
        } catch (e) {
            if (e instanceof Error) {
                return ResponseHelper.internalServerError({ message: e.message });
            }
            if (e instanceof z.ZodError) {
                return ResponseHelper.badRequest({ message: e.message, errors: e.errors });
            }
            return ResponseHelper.internalServerError({ message: 'An unknown error occurred' });
        }
    }
}

const validation = z.object({
    giftId: z.string(),
    person: z.string(),
});
