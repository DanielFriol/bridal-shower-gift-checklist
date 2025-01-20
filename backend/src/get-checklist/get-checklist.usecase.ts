import { GetChecklistRepository } from './get-checklist.repository';
import { parseDynamoDBToGift } from './gift.model';

export class GetChecklistUsecase {
    constructor(private repository: GetChecklistRepository) {}
    async handle() {
        const gifts = await this.repository.getAllGifts();
        return gifts?.map((gift) => parseDynamoDBToGift(gift));
    }
}
