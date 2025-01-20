import { AddGiftController } from './add-gift.controller';
import { AddGiftUsecase } from './add-gift.usecase';
import { AddGiftRepository } from './add-gift.repository';

export function createAddGiftController(): AddGiftController {
    const addGiftRepository = new AddGiftRepository();
    const addGiftUsecase = new AddGiftUsecase(addGiftRepository);
    return new AddGiftController(addGiftUsecase);
}
