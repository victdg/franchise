import { Branch } from "../model/Branch";

export interface BranchPersistencePort {
  create(branch: Branch): Promise<Branch>;
}
