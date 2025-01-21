import { parseDynamoDBToGift } from '../shared/gift.model';
import { GetChecklistRepository } from './get-checklist.repository';

export class GetChecklistUsecase {
    constructor(private repository: GetChecklistRepository) {}
    async handle() {
        const gifts = await this.repository.getAllGifts();
        return gifts?.map((gift) => parseDynamoDBToGift(gift));
    }
}
