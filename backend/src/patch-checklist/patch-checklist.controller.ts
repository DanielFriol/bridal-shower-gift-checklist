import { HttpRequest, HttpResponse, ResponseHelper } from '../shared/http';
import { PatchChecklistUsecase } from './patch-checklist.usecase';
import { z, ZodError } from 'zod';

export class PatchChecklistController {
    constructor(private usecase: PatchChecklistUsecase) {}

    async handle(request: HttpRequest): Promise<HttpResponse> {
        try {
            const { body } = request;
            const giftIdFromQuery = request.pathParameters?.giftId;

            const { giftId, person } = validation.parse({ giftId: giftIdFromQuery, person: body.person });

            const response = await this.usecase.handle(giftId, person);
            return ResponseHelper.ok(response);
        } catch (e) {
            if (e instanceof ZodError) {
                return ResponseHelper.badRequest({ message: e.message, errors: e.errors });
            }
            if (e instanceof Error) {
                return ResponseHelper.internalServerError({ message: e.message });
            }
            return ResponseHelper.internalServerError({ message: 'An unknown error occurred' });
        }
    }
}

const validation = z.object({
    giftId: z.string(),
    person: z.string().optional(),
});
