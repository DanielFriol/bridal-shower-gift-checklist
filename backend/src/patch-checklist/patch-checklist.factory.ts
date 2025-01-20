import { PatchChecklistController } from './patch-checklist.controller';
import { PatchChecklistRepository } from './patch-checklist.repository';
import { PatchChecklistUsecase } from './patch-checklist.usecase';

export function createPatchChecklistController(): PatchChecklistController {
    const patchChecklistRepository = new PatchChecklistRepository();
    const patchChecklistUsecase = new PatchChecklistUsecase(patchChecklistRepository);
    return new PatchChecklistController(patchChecklistUsecase);
}
