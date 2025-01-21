import { GetChecklistUsecase } from './get-checklist.usecase';
import { HttpResponse, ResponseHelper } from '../shared/http';

export class GetChecklistController {
    constructor(private usecase: GetChecklistUsecase) {}

    async handle(): Promise<HttpResponse> {
        try {
            const checklist = await this.usecase.handle();

            return ResponseHelper.ok(checklist);
        } catch (e) {
            console.log(e);
            if (e instanceof Error) {
                return ResponseHelper.internalServerError({ message: e.message });
            }
            return ResponseHelper.internalServerError({ message: 'An unknown error occurred' });
        }
    }
}
