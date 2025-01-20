import { HttpRequest, HttpResponse, ResponseHelper } from '../shared/api-gateway-event-parser';
import { AddGiftUsecase } from './add-gift.usecase';
import { z } from 'zod';

export class AddGiftController {
    constructor(private usecase: AddGiftUsecase) {}

    async handle(request: HttpRequest): Promise<HttpResponse> {
        try {
            const { body } = request;
            const { title } = validation.parse(body);
            const response = await this.usecase.addGift(title);
            return ResponseHelper.created(response);
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
    title: z.string(),
});
