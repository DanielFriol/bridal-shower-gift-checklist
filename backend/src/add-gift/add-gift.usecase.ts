import { randomUUID } from 'crypto';
import { AddGiftRepository } from './add-gift.repository';
import { Gift } from './gift.model';

export class AddGiftUsecase {
    constructor(private repository: AddGiftRepository) {}

    async addGift(title: string) {
        const gift: Gift = {
            id: randomUUID(),
            title,
            reserved: false,
            createdAt: new Date().toISOString(),
        };

        return await this.repository.addGift(gift);
    }
}
