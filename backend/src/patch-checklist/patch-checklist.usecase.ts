import { PatchChecklistRepository } from './patch-checklist.repository';

export class PatchChecklistUsecase {
    constructor(private repository: PatchChecklistRepository) {}

    async handle(giftId: string, person: string) {
        return await this.repository.handle(giftId, person);
    }
}
