import { Branch } from "../model/Branch";
import { UseCaseResponse } from "../model/UseCaseResponse";

export interface BranchServicePort {
  create(branch: Branch): Promise<UseCaseResponse>;
}
