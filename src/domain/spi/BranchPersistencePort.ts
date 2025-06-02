import { Branch } from "../model/Branch";

export interface BranchPersistencePort {
  create(branch: Branch): Promise<Branch>;
  findById(id: string): Promise<Branch | null>;
}
