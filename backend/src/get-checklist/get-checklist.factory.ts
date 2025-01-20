import { GetChecklistController } from './get-checklist.controller';
import { GetChecklistUsecase } from './get-checklist.usecase';
import { GetChecklistRepository } from './get-checklist.repository';

export function makeGetChecklistController(): GetChecklistController {
    const checklistRepository = new GetChecklistRepository();
    const getChecklistUsecase = new GetChecklistUsecase(checklistRepository);
    return new GetChecklistController(getChecklistUsecase);
}
