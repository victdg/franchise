import { Branch } from "../../../domain/model/Branch";
import { BranchModel } from "./BranchModel";

export class BranchAdapterMapper {
  toDomain(branchDbmodel: BranchModel): Branch {
    const branch = new Branch();
    branch.setId(branchDbmodel.id);
    branch.setName(branchDbmodel.name);
    branch.setFranchiseId(branchDbmodel.franchiseId);
    return branch;
  }
}
